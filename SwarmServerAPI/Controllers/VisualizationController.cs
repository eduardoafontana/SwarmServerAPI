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
                pnCollection = context.PathNodes
                    .Include("Session")
                    .Include("Session.Task")
                    .Include("Session.Task.Project")
                    .Where(pn => pn.Session.Identifier.ToString() == "8640D350-95B3-4C5E-9C70-031AA0BA13CA").ToList();
            }

            //load nodes
            foreach(PathNode pn in pnCollection)
            {
                model.ElementCollection.Add(new ElementModel.Element()
                {
                    data = new ElementModel.Data()
                    {
                        //TODO: partial implementation, review later
                        id = CleanHash(pn.Session.Task.Project.Name, pn.Namespace, pn.Hash.ToString()),//would be changed in future
                        internal_id = pn.Id.ToString()
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
                        //TODO: partial implementation, review later
                        id = pn.Parent + "-" + element.data.id,
                        source = pn.Parent,
                        target = element.data.id
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

        //TODO: partial implementation, review later
        private string CleanHash(string projectName, string @namespace, string hash)
        {
            string cleanProjectName = projectName.Replace(".sln", "");

            if (String.IsNullOrWhiteSpace(@namespace))
                return hash.Replace(cleanProjectName, "").Trim('.');

            return hash.Replace(cleanProjectName, "").Replace(@namespace, "").Trim('.').Trim('.');
        }

        private string GetHashFromProjecAndNamespace(string projectName, string pNamespace, string parent)
        {
            if (parent == null)
                return null;

            if(String.IsNullOrWhiteSpace(pNamespace))
                return String.Format("{0}.{1}", projectName.Replace(".sln", ""), parent);

            return String.Format("{0}.{1}.{2}", projectName.Replace(".sln", ""), pNamespace, parent);
        }
    }
}