using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SwarmServerAPI.Models;

namespace SwarmServerAPI.Controllers
{
    public class ImportSessionsController : Controller
    {
        // GET: ImportSessions
        public ActionResult Index()
        {
            return View(new ImportSessionModel { });
        }

        [HttpPost]
        public ActionResult Index(HttpPostedFileBase[] files)
        {
            if (!ModelState.IsValid)
                return View();

            int filesValid = 0;

            ImportSessionModel importSessionModel = new ImportSessionModel();

            foreach (HttpPostedFileBase file in files)
            {
                ImportSessionItemModel itemSession = new ImportSessionItemModel { };

                if (file == null)
                {
                    itemSession.Status = ImportSessionStatus.Fail;
                    itemSession.Message = "File is null.";
                    importSessionModel.FilesToUpload.Add(itemSession);

                    continue;
                }

                if (String.IsNullOrWhiteSpace(file.FileName))
                {
                    itemSession.Status = ImportSessionStatus.Fail;
                    itemSession.Message = "File name is empty.";
                    importSessionModel.FilesToUpload.Add(itemSession);

                    continue;
                }

                if (file.ContentLength <= 0)
                {
                    itemSession.FileName = Path.GetFileName(file.FileName);
                    itemSession.Status = ImportSessionStatus.Fail;
                    itemSession.Message = "Content is empty.";
                    importSessionModel.FilesToUpload.Add(itemSession);

                    continue;
                }

                if (file.FileName.Length != 29)
                {
                    itemSession.FileName = Path.GetFileName(file.FileName);
                    itemSession.Status = ImportSessionStatus.Fail;
                    itemSession.Message = "File name has not in a correct format - 29 characters.";
                    importSessionModel.FilesToUpload.Add(itemSession);

                    continue;
                }

                if (!file.FileName.StartsWith("session-"))
                {
                    itemSession.FileName = Path.GetFileName(file.FileName);
                    itemSession.Status = ImportSessionStatus.Fail;
                    itemSession.Message = "File name has not in a correct format - start with session-.";
                    importSessionModel.FilesToUpload.Add(itemSession);

                    continue;
                }

                itemSession.FileName = Path.GetFileName(file.FileName);
                itemSession.FileStream = file.InputStream;
                itemSession.Status = ImportSessionStatus.Pending;
                itemSession.Message = "...";
                importSessionModel.FilesToUpload.Add(itemSession);

                filesValid++;
            }

            ImportSessionFilesController apiImportSessionFiles = new ImportSessionFilesController();
            apiImportSessionFiles.ImportFiles(importSessionModel.FilesToUpload);

            ViewBag.FilesValid = filesValid;
            ViewBag.TotalFiles = files.Length;

            return View(importSessionModel);
        }

        //private static bool IsValidJson(string strInput)
        //{
        //    strInput = strInput.Trim();
        //    if ((strInput.StartsWith("{") && strInput.EndsWith("}")) || //For object
        //        (strInput.StartsWith("[") && strInput.EndsWith("]"))) //For array
        //    {
        //        try
        //        {
        //            var obj = JToken.Parse(strInput);
        //            return true;
        //        }
        //        catch (JsonReaderException jex)
        //        {
        //            //Exception in parsing json
        //            Console.WriteLine(jex.Message);
        //            return false;
        //        }
        //        catch (Exception ex) //some other exception
        //        {
        //            Console.WriteLine(ex.ToString());
        //            return false;
        //        }
        //    }
        //    else
        //    {
        //        return false;
        //    }
        //}
    }
}