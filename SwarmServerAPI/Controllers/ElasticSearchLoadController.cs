using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwarmServerAPI.AppCode.Domain;
using SwarmServerAPI.ElasticSearch;

namespace SwarmServerAPI.Controllers
{
    public class ElasticSearchLoadController : ApiController
    {
        public HttpResponseMessage Get()
        {
            try
            {
                using (SwarmData context = new SwarmData())
                {
                    foreach(Project project in context.Projects.ToList())
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

                return Request.CreateResponse(HttpStatusCode.OK, true, "application/json");
            }
            catch (Exception ex)
            {
                throw ThrowError(ex);
            }
        }

        private HttpResponseException ThrowError(Exception ex)
        {
            //TODO: bad smell return internal error. Review later.
            var resp = new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                Content = new StringContent(ex.ToString()),
                ReasonPhrase = "Error!"
            };

            return new HttpResponseException(resp);
        }
    }
}
