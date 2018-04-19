﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwarmServerAPI.AppCode.Repository;
using SwarmServerAPI.UI.SwarmServerAPI.General;
using SwarmServerAPI.UI.SwarmServerAPI.Models;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class VisualizationDataController : ApiController
    {
        [HttpGet]
        [Route("api/Visualization/Session")]
        public IEnumerable<SessionGridModel> GetSessionGrid()
        {
            try
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
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }

        [HttpGet]
        [Route("api/Visualization/Session/{id}")]
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

        [HttpGet]
        [Route("api/Visualization/Task")]
        public IEnumerable<TaskGridModel> GetTaskGrid()
        {
            try
            {
                using (SwarmData context = new SwarmData())
                {
                    //TODO: review logic later, data model changes
                    List<Session> distinctTask = context.Sessions.GroupBy(d => new { d.TaskName }).Select(g => g.FirstOrDefault()).ToList();
                    Guid[] distinctTaskIds = distinctTask.Select(t => t.Id).ToArray();

                    return context.Sessions.Where(d => distinctTaskIds.Contains(d.Id)).Select(t => new TaskGridModel
                    {
                        ProjectName = t.ProjectName,
                        Name = t.TaskName,
                        Description = t.TaskDescription,
                        Action = t.TaskAction,
                        Created = t.TaskCreated,
                        TotalSessionTime = t.TaskTotalSessionTime
                    }).ToList();
                }
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }
    }
}
