using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwarmServerAPI.AppCode.Repository;
using SwarmServerAPI.AppCore.Service.DTOModels;

namespace SwarmServerAPI.AppCore.Service
{
    public class SessionService
    {
        public List<SessionModel> GetAll()
        {
            List<SessionModel> sessionModelCollection = new List<SessionModel>();

            using (SwarmData context = new SwarmData())
            {
                sessionModelCollection = context.Sessions.Select(s => new SessionModel
                {
                    Id = s.Id,
                    Description = s.Description,
                    Started = s.Started,
                    Finished = s.Finished,
                    TaskName = s.TaskName,
                    TaskDescription = s.TaskDescription,
                    TaskAction = s.TaskAction,
                    TaskCreated = s.TaskCreated,
                    ProjectName = s.ProjectName,
                    DeveloperName = s.DeveloperName,
                    Breakpoints = s.Breakpoints.Select(b => new BreakpointModel
                    {
                        Id = b.Id,
                        BreakpointKind = b.BreakpointKind,
                        Created = b.Created,
                        LineNumber = b.LineNumber ?? 0,
                        LineOfCode = b.LineOfCode,
                        Namespace = b.Namespace,
                        Origin = b.Origin,
                        Type = b.Type
                    }).ToList(),
                    CodeFiles = s.CodeFiles.Select(c => new CodeFileModel
                    {
                        Id = c.Id,
                        Path = c.Path,
                        Content = c.Content,
                        Created = c.Created
                    }).ToList(),
                    Events = s.Events.Select(e => new EventModel
                    {
                        Id = e.Id,
                        CharEnd = e.CharEnd ?? 0,
                        CharStart = e.CharStart ?? 0,
                        Created = e.Created,
                        Detail = e.Detail,
                        EventKind = e.EventKind,
                        LineNumber = e.LineNumber ?? 0,
                        LineOfCode = e.LineOfCode,
                        Method = e.Method,
                        MethodKey = e.MethodKey,
                        MethodSignature = e.MethodSignature,
                        Namespace = e.Namespace,
                        Type = e.Type,
                        TypeFullPath = e.TypeFullPath
                    }).ToList(),
                    PathNodes = s.PathNodes.Select(p => new PathNodeModel
                    {
                        Id = p.Id,
                        Created = p.Created,
                        Type = p.Type,
                        Namespace = p.Namespace,
                        Hash = p.Hash,
                        Method = p.Method,
                        Origin = p.Origin,
                        Parameters = p.Parameters.Select(pp => new PathNodeParameterModel
                        {
                            Id = pp.Id,
                            Name = pp.Name,
                            Type = pp.Type,
                            Value = pp.Value
                        }).ToList(),
                        Parent = p.Parent,
                        Parent_Id = p.Parent_Id,
                        ReturnType = p.ReturnType
                    }).ToList()
                }).ToList();

                return sessionModelCollection;
            }
        }

        public IEnumerable<SessionGridModel> GetSessionGrid()
        {
            using (SwarmData context = new SwarmData())
            {
                return context.Sessions.OrderByDescending(s => s.Started).Select(s => new SessionGridModel
                {
                    Identifier = s.Id,
                    TaskName = s.TaskName,
                    TaskAction = s.TaskAction,
                    TaskProjectName = s.ProjectName,
                    DeveloperName = s.DeveloperName,
                    Started = s.Started,
                    Finished = s.Finished,
                    BreakpointCount = s.Breakpoints.Count,
                    EventCount = s.Events.Count,
                    PathNodeCount = s.PathNodes.Count
                }).ToList();
            }
        }

        public List<ElementModel.Element> GetSessionVisualization(string id)
        {
            ElementModel model = new ElementModel();
            List<PathNode> pnCollection = new List<PathNode>();

            using (SwarmData context = new SwarmData())
            {
                pnCollection = context.PathNodes
                    .Where(pn => pn.Session.Id.ToString() == id).OrderBy(pn => pn.Created).ToList();
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
                        method = pn.Method,
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

            //load edges
            List<ElementModel.Element> edgesCollection = new List<ElementModel.Element>();

            foreach (ElementModel.Element element in model.ElementCollection)
            {
                if (element.data.parent_id == Guid.Empty.ToString())
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
