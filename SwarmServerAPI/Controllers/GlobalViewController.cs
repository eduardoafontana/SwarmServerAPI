using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using ICSharpCode.SharpZipLib.Zip;
using SwarmServerAPI.AppCode.Repository;
using SwarmServerAPI.UI.SwarmServerAPI.Models;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class GlobalViewController : Controller
    {
        public ActionResult Index(string id)
        {
            ElementModel model = new ElementModel();
            List<PathNode> pnCollection = new List<PathNode>();
            List<Breakpoint> bCollection = new List<Breakpoint>();

            using (SwarmData context = new SwarmData())
            {
                var sessionFilter = context.Sessions.Where(s => s.Id.ToString() == id).Select(s => new { TaskName = s.TaskName, ProjectName = s.ProjectName }).FirstOrDefault();
                Guid[] sessionIds = context.Sessions.Where(s => s.TaskName == sessionFilter.TaskName && s.ProjectName == sessionFilter.ProjectName).Select(s => s.Id).ToArray();

                pnCollection = context.PathNodes.Where(pn => sessionIds.Contains(pn.Session.Id)).GroupBy(pn => pn.Type).Select(pn => pn.FirstOrDefault()).ToList();
                bCollection = context.Breakpoints.Where(b => sessionIds.Contains(b.Session.Id)).ToList();
            }

            //load nodes
            foreach (PathNode pn in pnCollection)
            {
                model.ElementCollection.Add(new ElementModel.Element()
                {
                    data = new ElementModel.Data()
                    {
                        id = pn.Id.ToString(),
                        parent_id = pn.Parent_Id.ToString(),
                        method = pn.Type + " - " + bCollection.Where(b => b.Type == pn.Type).Count().ToString(),
                        size = generateSize(bCollection.Where(b => b.Type == pn.Type).Count())
                    }
                });
            }

            return View(model);
        }

        private int generateSize(int breakpointsCount)
        {
            return breakpointsCount + 10;
        }
    }
}