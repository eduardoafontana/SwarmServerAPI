using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwarmServerAPI.AppCode.Repository;
using SwarmServerAPI.AppCore.Service;
using SwarmServerAPI.AppCore.Service.DTOModels;
using SwarmServerAPI.UI.SwarmServerAPI.General;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class SessionController : ApiController
    {
        //OBSERVAÇÃO: Por default, métodos declarados em um Controller como públicos e cujos nomes se iniciem por “Get”, “Post”, “Put” e “Delete” são mapeados automaticamente para o processamento das requisições HTTP correspondentes (GET, POST, PUT e DELETE, respectivamente).
        //https://www.devmedia.com.br/asp-net-web-api-implementando-servicos-restful/31024
        //http://www.ciceroednilson.com.br/criando-um-servico-restful-com-web-api-em-c/
        //Best practices
        //https://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api/

        public HttpResponseMessage Get()
        {
            try
            {
                SessionService sessionService = new SessionService();
                List<SessionModel> sessionModelCollection = sessionService.GetAll();

                return Request.CreateResponse(HttpStatusCode.OK, sessionModelCollection, "application/json");
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }

        public string Post(Session session)
        {
            try
            {
                using (SwarmData context = new SwarmData())
                {
                    if (session.Identifier == new Guid("00000000-0000-0000-0000-000000000000"))
                        return "Post rejected: session.Identifier equal 00000000-0000-0000-0000-000000000000.";

                    Session original = context.Sessions.FirstOrDefault(s => s.Identifier == session.Identifier);

                    if (original == null)
                        context.Sessions.Add(session);
                    else
                        context.Entry(original).CurrentValues.SetValues(session);

                    context.SaveChanges();

                    return "Object created or updated!";
                }
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }
    }
}
