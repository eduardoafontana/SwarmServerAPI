using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SwarmServerAPI.UI.SwarmServerAPI.Models;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class VisualizationController : Controller
    {
        // GET: Visualization
        public ActionResult Index()
        {
            ElementModel model = new ElementModel();
            model.ElementCollection.Add(new ElementModel.Element() { data = new ElementModel.Data() { id = "a"} });
            model.ElementCollection.Add(new ElementModel.Element() { data = new ElementModel.Data() { id = "b"} });
            model.ElementCollection.Add(new ElementModel.Element() { data = new ElementModel.Data() { id = "ab", source = "a", target = "b", } });

            return View(model);
        }
    }
}