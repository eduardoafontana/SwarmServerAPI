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
                Guid[] sessionIds = context.Sessions.Where(s => s.ProjectName == "SGE.sln").Select(s => s.Id).ToArray();

                pnCollection = context.PathNodes.Where(pn => sessionIds.Contains(pn.Session.Id)).OrderByDescending(pn => pn.Created).ToList();
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
                        method = pn.Type + " - " + bCollection.Where(b => b.Namespace == pn.Namespace && b.Type == pn.Type).Count().ToString(),
                        nodeinfo = new ElementModel.NodeInfo()
                        {
                            name_space = pn.Namespace,
                            type = pn.Type,
                            method = pn.Method,
                            returntype = pn.ReturnType,
                            origin = pn.Origin,
                            created = pn.Created.ToShortDateString()
                        }
                    }
                });
            }

            return View(model);
        }
    }
}