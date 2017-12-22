using System;
using System.Collections.Generic;
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
    }
}