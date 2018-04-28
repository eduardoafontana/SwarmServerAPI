using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwarmServerAPI.AppCode.Repository;
using SwarmServerAPI.AppCore.Domain;
using SwarmServerAPI.AppCore.Service.DTOModels;

namespace SwarmServerAPI.AppCore.Service
{
    public class TaskService
    {
        public IEnumerable<TaskGridModel> GetTaskGrid()
        {
            using (SwarmData context = new SwarmData())
            {
                List<Session> distinctTask = context.Sessions.GroupBy(d => new { d.ProjectName, d.TaskName }).Select(g => g.FirstOrDefault()).ToList();
                Guid[] distinctTaskIds = distinctTask.Select(t => t.Id).ToArray();

                return context.Sessions.Where(d => distinctTaskIds.Contains(d.Id)).Select(t => new TaskGridModel
                {
                    Identifier = t.Id.ToString(),
                    ProjectName = t.ProjectName,
                    Name = t.TaskName,
                    Description = t.TaskDescription,
                    Action = t.TaskAction,
                    Created = t.TaskCreated
                }).ToList();
            }
        }

        //TODO: review later, probaly delete
        //public List<PathNode> MountTreeByType(List<PathNode> pnCollection)
        //{
        //    List<PathNode> tree = new List<PathNode>();

        //    List<PathNode> roots = pnCollection.Where(pn => pn.Parent_Id == Guid.Empty).ToList();

        //    tree.AddRange(roots);

        //    foreach (PathNode root in roots)
        //    {
        //        foreach (PathNode child in pnCollection.Where(pn => pn.Parent_Id == root.Id).ToList())
        //        {
        //            if (tree.Any(pn => pn.Type == child.Type))
        //                continue;

        //            tree.Add(child);

        //            PathNode parent = tree
        //        }
        //    }
        //}

        public List<ElementModel.Element> GetTaskVisualization(string id)
        {
            ElementModel model = new ElementModel();
            List<PathNode> pnCollection = new List<PathNode>();
            List<Breakpoint> bCollection = new List<Breakpoint>();

            using (SwarmData context = new SwarmData())
            {
                var sessionFilter = context.Sessions.Where(s => s.Id.ToString() == id).Select(s => new { TaskName = s.TaskName, ProjectName = s.ProjectName }).FirstOrDefault();
                Guid[] sessionIds = context.Sessions.Where(s => s.TaskName == sessionFilter.TaskName && s.ProjectName == sessionFilter.ProjectName).Select(s => s.Id).ToArray();

                pnCollection = context.PathNodes.Where(pn => sessionIds.Contains(pn.Session.Id)).GroupBy(pn => pn.Type).Select(pn => pn.FirstOrDefault()).OrderBy(pn => pn.Created).ToList();
                bCollection = context.Breakpoints.Where(b => sessionIds.Contains(b.Session.Id)).GroupBy(b => new { b.Namespace, b.Type, b.LineNumber }).Select(b => b.FirstOrDefault()).ToList();
            }

            NodeColor nodeColor = new NodeColor(bCollection);

            //load nodes
            foreach (PathNode pn in pnCollection)
            {
                model.ElementCollection.Add(new ElementModel.Element()
                {
                    data = new ElementModel.Data()
                    {
                        id = pn.Id.ToString(),
                        parent_id = model.ElementCollection.Count() == 0 ? null : model.ElementCollection.Last().data.id,
                        method = pn.Type + " - " + bCollection.Where(b => b.Type == pn.Type).Count().ToString(),
                        size = bCollection.Where(b => b.Type == pn.Type).Count() + 10,
                        color = nodeColor.GetColor(pn.Type)
                    }
                });
            }

            //load edges
            List<ElementModel.Element> edgesCollection = new List<ElementModel.Element>();

            foreach (ElementModel.Element element in model.ElementCollection)
            {
                if (String.IsNullOrWhiteSpace(element.data.parent_id))
                    continue;

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

            return model.ElementCollection;
        }

        public List<ElementModel.Element> GetGlobalVisualization(string id)
        {
            ElementModel model = new ElementModel();
            List<Breakpoint> bCollection = new List<Breakpoint>();

            using (SwarmData context = new SwarmData())
            {
                var pnCollection = context.PathNodes.GroupBy(pn => new { pn.Session.ProjectName, pn.Type }).Select(pn => pn.FirstOrDefault()).OrderBy(pn => new { pn.Session.ProjectName, pn.Created }).Select(pn => new { PathNode = pn, Session = pn.Session });
                bCollection = context.Breakpoints.GroupBy(b => new { b.Session.ProjectName, b.Namespace, b.Type, b.LineNumber }).Select(b => b.FirstOrDefault()).ToList();

                NodeColor nodeColor = new NodeColor(bCollection);

                //load nodes
                foreach (var item in pnCollection)
                {
                    model.ElementCollection.Add(new ElementModel.Element()
                    {
                        data = new ElementModel.Data()
                        {
                            id = item.PathNode.Id.ToString(),
                            parent_id = model.ElementCollection.Count() == 0 ? null : model.ElementCollection.Last().data.project != item.Session.ProjectName ? null : model.ElementCollection.Last().data.id,
                            method = item.PathNode.Type + " - " + bCollection.Where(b => b.Type == item.PathNode.Type).Count().ToString(),
                            size = bCollection.Where(b => b.Type == item.PathNode.Type).Count() + 10,
                            color = nodeColor.GetColor(item.PathNode.Type),
                            project = item.Session.ProjectName
                        }
                    });
                }
            }

            //load edges
            List<ElementModel.Element> edgesCollection = new List<ElementModel.Element>();

            foreach (ElementModel.Element element in model.ElementCollection)
            {
                if (String.IsNullOrWhiteSpace(element.data.parent_id))
                    continue;

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

            return model.ElementCollection;
        }
    }
}
