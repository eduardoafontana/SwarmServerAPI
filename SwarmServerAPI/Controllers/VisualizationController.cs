using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SwarmServerAPI.AppCode.Repository;
using SwarmServerAPI.UI.SwarmServerAPI.Models;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class VisualizationController : Controller
    {
        public ActionResult Session()
        {
            ViewBag.Title = "Sessions Page";

            return View();
        }

        public ActionResult Task()
        {
            ViewBag.Title = "Task Page";

            return View();
        }

        public ActionResult Global()
        {
            ViewBag.Title = "Global Page";

            return View();
        }

        public ActionResult Prototype()
        {
            ViewBag.Title = "Prototype";

            return View();
        }

        public ActionResult View3d()
        {
            ViewBag.Title = "View3d";

            return View();
        }

        public ActionResult View3d2()
        {
            ViewBag.Title = "View3d v2";

            return View();
        }
    }
}