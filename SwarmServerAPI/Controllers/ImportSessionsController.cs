using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SwarmServerAPI.Controllers
{
    public class ImportSessionsController : Controller
    {
        // GET: ImportSessions
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(HttpPostedFileBase[] files)
        {
            if (!ModelState.IsValid)
                return View();

            int fileSuccessfullyUploaded = 0;

            foreach (HttpPostedFileBase file in files)
            {
                if (file == null)
                    continue;

                if (file.ContentLength <= 0)
                    continue;

                if (String.IsNullOrWhiteSpace(file.FileName))
                    continue;

                if (!Path.GetExtension(file.FileName).Equals(".txt"))
                    continue;

                if (file.FileName.Length != 29)
                    continue;

                if (!file.FileName.StartsWith("session-"))
                    continue;

                fileSuccessfullyUploaded++;

                //var InputFileName = Path.GetFileName(file.FileName);
                //var ServerSavePath = Path.Combine(Server.MapPath("~/UploadedFiles/") + InputFileName);
                ////Save file to server folder  
                //file.SaveAs(ServerSavePath);
            }

            //assigning file uploaded status to ViewBag for showing message to user.  
            ViewBag.UploadStatus = fileSuccessfullyUploaded + " files uploaded successfully.";

            return View();
        }
    }
}