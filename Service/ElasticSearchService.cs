using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwarmServerAPI.AppCode.Repository;
using SwarmServerAPI.AppCore.Service.ElasticSearch;

namespace SwarmServerAPI.AppCore.Service
{
    public class ElasticSearchService
    {
        public void Get()
        {
            using (SwarmData context = new SwarmData())
            {
                foreach (Project project in context.Projects.ToList())
                {
                    var response = ConnectionToES.EsClient().Index(project, i => i
                        .Index("swarmdb")
                        .Type("project")
                        .Id(project.Id)
                        .Refresh(Elasticsearch.Net.Refresh.True));

                    if (!response.IsValid)
                        throw response.OriginalException;
                }
            }
        }
    }
}
