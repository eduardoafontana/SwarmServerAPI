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
        // GET: Visualization
        public ActionResult Index()
        {
            ElementModel model = new ElementModel();
            List<PathNode> pnCollection = new List<PathNode>();

            using (SwarmData context = new SwarmData())
            {
                pnCollection = context.PathNodes.Where(pn => pn.Session.Identifier.ToString() == "5225722C-CFBB-4CAE-B80D-3AF1566C91AA").ToList();
            }

            //load nodes
            foreach(PathNode pn in pnCollection)
            {
                model.ElementCollection.Add(new ElementModel.Element()
                {
                    data = new ElementModel.Data()
                    {
                        id = pn.Hash.ToString(),//would be changed in future
                        internal_id = pn.Id.ToString(),
                    }
                });
            }


            //load edges
            List<ElementModel.Element> edgesCollection = new List<ElementModel.Element>();

            foreach (ElementModel.Element element in model.ElementCollection)
            {
                PathNode pn = pnCollection.FirstOrDefault(p => p.Id.ToString() == element.data.internal_id);

                if (pn.Parent == null)
                    continue;

                edgesCollection.Add(new ElementModel.Element()
                {
                    data = new ElementModel.Data()
                    {
                        id = pn.Parent + "-" + pn.Hash.ToString(),
                        source = pn.Parent,
                        target = pn.Hash
                    }
                });
            }

            //ElementModel model = new ElementModel();
            //model.ElementCollection.Add();
            //model.ElementCollection.Add(new ElementModel.Element() { data = new ElementModel.Data() { id = "b"} });
            //model.ElementCollection.Add(new ElementModel.Element() { data = new ElementModel.Data() { id = "ab", source = "a", target = "b", } });

            model.ElementCollection.AddRange(edgesCollection);

            return View(model);
        }
    }
}