using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwarmServerAPI.Models;

namespace SwarmServerAPI.Controllers
{
    public class SessionGridDataController : ApiController
    {
        public IEnumerable<SessionModel> Get()
        {

            try
            {
                List<SessionModel> sessionModelCollection = new List<SessionModel>();

                using (SwarmData context = new SwarmData())
                {
                    return sessionModelCollection = context.Sessions.Select(s => new SessionModel
                    {
                        Identifier = s.Identifier,
                        Label = s.Label,
                        Description = s.Description,
                        Purpose = s.Purpose,
                        Started = s.Started,
                        Finished = s.Finished
                    }).ToList();
                }
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
