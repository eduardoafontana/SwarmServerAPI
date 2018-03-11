using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using ICSharpCode.SharpZipLib.Zip;
using SwarmServerAPI.AppCode.Repository;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class CodeMetricsController : Controller
    {
        // GET: CodeMetrics
        public ActionResult Index()
        {
            ViewBag.Title = "Code Metrics";

            return View();
        }

        [HttpPost]
        public ActionResult Upload()
        {
            UploadFile();

            return RedirectToAction("Index");
        }

        private void UploadFile()
        {
            if (Request.Files.Count <= 0)
                return;

            var file = Request.Files[0];

            if (file == null)
                return;

            if (file.ContentLength <= 0)
                return;

            if (String.IsNullOrWhiteSpace(file.FileName))
                return;

            if (!Path.GetExtension(file.FileName).Equals(".ods"))
                return;

            List<CodeMetric> CodeMetrics = ProcessFile(file.InputStream);

            ProcessSessions(CodeMetrics);
        }

        private void ProcessSessions(List<CodeMetric> codeMetrics)
        {
            using (SwarmData context = new SwarmData())
            {
                List<Session> sessionList = context.Sessions.Where(s=> s.ProjectName.Equals("Contencioso.sln")).ToList();

                foreach (Session session in sessionList)
                {
                    foreach (PathNode node in session.PathNodes)
                    {
                        CodeMetric codeMetric = codeMetrics.FirstOrDefault(x => x.Hash.ToLower().Equals(node.Hash.ToLower()));

                        if (codeMetric != null)
                            node.MethodCodeMetric = codeMetric;
                    }
                }

                context.SaveChanges();
            }
        }

        private List<CodeMetric> ProcessFile(Stream inputStream)
        {
            string contentXml = GetContentXml(inputStream);

            XDocument documentXml = XDocument.Parse(contentXml);

            List<XElement> rows = documentXml.Descendants("{urn:oasis:names:tc:opendocument:xmlns:table:1.0}table-row").Skip(1).ToList();

            List<CodeMetric> CodeMetrics = new List<CodeMetric>();

            for (int i = 0; i < rows.Count - 1; i++)//count - 1 => skip footer
            {
                if (!rows[i].Elements().ToList()[0].Value.Equals("Member"))//scope
                    continue;

                CodeMetrics.Add(new CodeMetric
                {
                    Hash = GetHash(rows[i]),
                    MaintainabilityIndex = rows[i].Elements().ToList()[5].Value,
                    CyclomaticComplexity = rows[i].Elements().ToList()[6].Value,
                    ClassCoupling = rows[i].Elements().ToList()[8].Value,
                    LineOfCode = rows[i].Elements().ToList()[9].Value
                });
            }

            return CodeMetrics;
        }

        private string GetHash(XElement row)
        {
            return String.Format("{0}.{1}.{2}.{3}", "Contencioso", row.Elements().ToList()[2].Value, row.Elements().ToList()[3].Value, CleanMethodName(row.Elements().ToList()[4].Value));
            //project.namespace.type.method
        }

        private string CleanMethodName(string value)
        {
            string[] pieces = value.Split('(');

            if (pieces.Length > 1)
                return pieces[0];

            return value;
        }

        private static string GetContentXml(Stream fileStream)
        {
            var contentXml = "";

            using (var zipInputStream = new ZipInputStream(fileStream))
            {
                ZipEntry contentEntry = null;
                while ((contentEntry = zipInputStream.GetNextEntry()) != null)
                {
                    if (!contentEntry.IsFile)
                        continue;
                    if (contentEntry.Name.ToLower() == "content.xml")
                        break;
                }

                if (contentEntry.Name.ToLower() != "content.xml")
                {
                    throw new Exception("Cannot find content.xml");
                }

                var bytesResult = new byte[] { };
                var bytes = new byte[2000];
                var i = 0;

                while ((i = zipInputStream.Read(bytes, 0, bytes.Length)) != 0)
                {
                    var arrayLength = bytesResult.Length;
                    Array.Resize<byte>(ref bytesResult, arrayLength + i);
                    Array.Copy(bytes, 0, bytesResult, arrayLength, i);
                }

                contentXml = Encoding.UTF8.GetString(bytesResult);
            }
            return contentXml;
        }
    }
}