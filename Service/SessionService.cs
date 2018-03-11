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
                        MethodCodeMetric = p.MethodCodeMetric != null ? new CodeMetricModel
                        {
                            Id = p.MethodCodeMetric.Id,
                            ClassCoupling = p.MethodCodeMetric.ClassCoupling,
                            CyclomaticComplexity = p.MethodCodeMetric.CyclomaticComplexity,
                            Hash = p.MethodCodeMetric.Hash,
                            LineOfCode = p.MethodCodeMetric.LineOfCode,
                            MaintainabilityIndex = p.MethodCodeMetric.MaintainabilityIndex
                        } : null,
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
    }
}
