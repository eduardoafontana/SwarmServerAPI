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
                    List<Task> distinctTask = context.Tasks.GroupBy(d => new { d.Name }).Select(g => g.FirstOrDefault()).ToList();
                    int[] distinctTaskIds = distinctTask.Select(t => t.Id).ToArray();

                    return context.Tasks.Where(d => distinctTaskIds.Contains(d.Id)).Select(t => new TaskGridModel
                    {
                        ProjectName = t.Project.Name,
                        Name = t.Name,
                        Description = t.Description,
                        Action = t.Action,
                        Created = t.Created,
                        TotalSessionTime = t.TotalSessionTime
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
