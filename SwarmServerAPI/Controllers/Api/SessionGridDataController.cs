using System;
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
    public class SessionGridDataController : ApiController
    {
        public IEnumerable<SessionGridModel> Get()
        {

            try
            {
                using (SwarmData context = new SwarmData())
                {
                    return context.Sessions.Select(s => new SessionGridModel
                    {
                        Identifier = s.Identifier,
                        TaskName = s.Task.Name,
                        TaskAction = s.Task.Action,
                        TaskProjectName = s.Task.Project.Name,
                        DeveloperName = s.Developer.Name,
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
    }
}
