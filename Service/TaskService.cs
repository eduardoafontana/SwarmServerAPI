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

        public List<ElementModel.Element> GetTaskVisualization(string id)
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

            NodeColor nodeColor = new NodeColor(bCollection);

            //load nodes
            foreach (PathNode pn in pnCollection)
            {
                model.ElementCollection.Add(new ElementModel.Element()
                {
                    data = new ElementModel.Data()
                    {
                        id = pn.Hash,
                        parent_id = pn.Parent,
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
    }
}
