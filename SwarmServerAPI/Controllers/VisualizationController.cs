using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SwarmServerAPI.AppCode.Repository;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class VisualizationController : Controller
    {
        public ActionResult View3d()
        {
            ViewBag.Title = "Swarm Debugger Visualization";

            return View();
        }
    }
}