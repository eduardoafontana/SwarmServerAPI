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
    public class GlobalViewController : Controller
    {
        // GET: CodeMetrics
        public ActionResult Index()
        {
            ViewBag.Title = "Global Views";

            return View();
        }
    }
}