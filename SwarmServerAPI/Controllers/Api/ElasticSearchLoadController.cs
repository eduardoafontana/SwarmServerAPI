using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwarmServerAPI.AppCode.Repository;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class ElasticSearchLoadController : ApiController
    {
        public HttpResponseMessage Get()
        {
            try
            {
                //TODO: Go to service elastic search and do the work.

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
