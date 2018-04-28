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
    public class ProjectService
    {
        public IEnumerable<dynamic> GetDistinctProjects()
        {
            using (SwarmData context = new SwarmData())
            {
                return context.Sessions.GroupBy(s => s.ProjectName).Select(s => s.FirstOrDefault()).OrderBy(s => s.ProjectName).Select(s => new { key = s.Id, value = s.ProjectName }).ToList();
            }
        }
    }
}
