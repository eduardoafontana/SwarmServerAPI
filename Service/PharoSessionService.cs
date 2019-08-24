using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwarmServerAPI.AppCode.Repository;
using SwarmServerAPI.AppCore.Service.DTOModels;

namespace SwarmServerAPI.AppCore.Service
{
    public class PharoSessionService
    {
        public List<PharoSessionModel> GetAll()
        {
            List<PharoSessionModel> sessionModelCollection = new List<PharoSessionModel>();

            using (SwarmData context = new SwarmData())
            {
                sessionModelCollection = context.PharoSessions.Select(s => new PharoSessionModel
                {
                    Id = s.Id,
                    Description = s.Description,
                }).ToList();

                return sessionModelCollection;
            }
        }
    }
}
