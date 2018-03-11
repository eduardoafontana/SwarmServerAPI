using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwarmServerAPI.AppCode.Repository;
using SwarmServerAPI.AppCore.Service.DTOModels;
using SwarmServerAPI.AppCore.Service.ElasticSearch;

namespace SwarmServerAPI.AppCore.Service
{
    public class ElasticSearchService
    {
        public void ProcessLoad()
        {
            SessionService sessionService = new SessionService();
            List<SessionModel> sessionModelCollection = sessionService.GetAll();

            foreach (SessionModel session in sessionModelCollection)
            {
                var response = ConnectionToES.EsClient().Index(session, i => i
                    .Index("swarmdb")
                    .Type("session")
                    .Id(session.Id)
                    .Refresh(Elasticsearch.Net.Refresh.True));
            }
        }
    }
}
