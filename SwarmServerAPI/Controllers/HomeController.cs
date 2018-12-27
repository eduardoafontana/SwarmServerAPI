using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //ViewBag.Title = "Home Page";

            //return View();

            ViewBag.Title = "View3d v3";

            return RedirectToAction("View3d3", "Visualization");
        }
    }
}
