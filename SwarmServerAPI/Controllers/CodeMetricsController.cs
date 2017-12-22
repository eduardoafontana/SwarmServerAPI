using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SwarmServerAPI.Controllers
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
            if (Request.Files.Count > 0)
            {
                var file = Request.Files[0];

                if (file != null && file.ContentLength > 0)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var path = Path.Combine(Server.MapPath("~/Images/"), fileName);
                    //file.SaveAs(path);
                }
            }

            return RedirectToAction("Index");
        }
    }
}