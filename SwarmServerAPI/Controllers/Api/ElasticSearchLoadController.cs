using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwarmServerAPI.AppCode.Repository;
using SwarmServerAPI.AppCore.Service;
using SwarmServerAPI.UI.SwarmServerAPI.General;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class ElasticSearchLoadController : ApiController
    {
        public HttpResponseMessage Get()
        {
            try
            {
                ElasticSearchService elasticSearchService = new ElasticSearchService();
                elasticSearchService.ProcessLoad();

                return Request.CreateResponse(HttpStatusCode.OK, true, "application/json");
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }
    }
}
