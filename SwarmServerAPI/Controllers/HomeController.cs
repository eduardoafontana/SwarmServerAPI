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
            //return View();

            ViewBag.Title = "Swarm Debugger Visualization";

            return RedirectToAction("View3d", "Visualization");
        }
    }
}
