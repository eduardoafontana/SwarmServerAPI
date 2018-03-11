using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwarmServerAPI.AppCode.Repository;
using SwarmServerAPI.UI.SwarmServerAPI.General;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class TaskGridDataController : ApiController
    {
        public IEnumerable<TaskGridModel> Get()
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
