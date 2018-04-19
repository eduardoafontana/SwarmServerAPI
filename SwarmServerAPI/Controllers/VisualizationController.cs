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
        public ActionResult Session(string id)
        {
            ViewBag.Title = "Sessions Page";

            return View();
        }
    }
}