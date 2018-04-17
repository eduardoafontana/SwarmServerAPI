using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SwarmServerAPI.UI.SwarmServerAPI.Views
{
    public class SessionsController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Sessions Page";

            return View();
        }
    }
}