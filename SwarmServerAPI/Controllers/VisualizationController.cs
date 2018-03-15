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
        public ActionResult Index()
        {
            ElementModel model = new ElementModel();
            List<PathNode> pnCollection = new List<PathNode>();

            using (SwarmData context = new SwarmData())
            {
                pnCollection = context.PathNodes
                    .Where(pn => pn.Session.Id.ToString() == "20a33d75-a3db-4602-b356-9b9f551f9fe2").OrderBy(pn => pn.Created).ToList();
            }

            //load nodes
            foreach(PathNode pn in pnCollection)
            {
                model.ElementCollection.Add(new ElementModel.Element()
                {
                    data = new ElementModel.Data()
                    {
                        id = pn.Id.ToString(),
                        parent_id = pn.Parent_Id.ToString()
                    }
                });
            }

            //load edges
            List<ElementModel.Element> edgesCollection = new List<ElementModel.Element>();

            foreach (ElementModel.Element element in model.ElementCollection)
            {
                edgesCollection.Add(new ElementModel.Element()
                {
                    data = new ElementModel.Data()
                    {
                        id = element.data.id + "-" + element.data.id,
                        source = element.data.parent_id,
                        target = element.data.id
                    }
                });
            }

            model.ElementCollection.AddRange(edgesCollection);

            return View(model);
        }
    }
}