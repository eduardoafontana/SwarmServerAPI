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

        public sealed class SessionSingleton
        {
            private static volatile SessionSingleton instance;
            private static object syncRoot = new Object();

            public Queue<Session> PostSessionList { get; set; } = new Queue<Session>();

            private SessionSingleton() { }

            public static SessionSingleton Instance
            {
                get
                {
                    if (instance != null)
                        return instance;

                    lock (syncRoot)
                    {
                        if (instance == null)
                            instance = new SessionSingleton();
                    }

                    return instance;
                }
            }

            public async System.Threading.Tasks.Task ProcessPosting()
            {
                await System.Threading.Tasks.Task.Run(() =>
                {
                    lock (PostSessionList)
                    {
                        using (SwarmData context = new SwarmData())
                        {
                            while (PostSessionList.Count > 0)
                            {
                                Session session = PostSessionList.Dequeue();

                                if (session == null)
                                    continue;

                                if (session.Id == new Guid("00000000-0000-0000-0000-000000000000"))
                                    continue;

                                Session original = context.Sessions
                                        .Include("Breakpoints")
                                        .Include("Events")
                                        .Include("PathNodes")
                                        .FirstOrDefault(s => s.Id == session.Id);

                                if (original == null)
                                    context.Sessions.Add(session);
                                else
                                {
                                    context.Entry(original).CurrentValues.SetValues(session);

                                    foreach (Breakpoint item in session.Breakpoints)
                                    {
                                        if (!original.Breakpoints.Any(x => x.Id == item.Id))
                                            original.Breakpoints.Add(item);
                                    }

                                    foreach (Event item in session.Events)
                                    {
                                        if (!original.Events.Any(x => x.Id == item.Id))
                                            original.Events.Add(item);
                                    }

                                    foreach (PathNode item in session.PathNodes)
                                    {
                                        if (!original.PathNodes.Any(x => x.Id == item.Id))
                                            original.PathNodes.Add(item);
                                    }
                                }

                                context.SaveChanges();
                            }
                        }
                    }
                });
            }
        }

        public string Post(Session session)
        {
            try
            {
                if (session.Id == new Guid("00000000-0000-0000-0000-000000000000"))
                    return "Post rejected: session.Identifier equal 00000000-0000-0000-0000-000000000000.";

                SessionSingleton.Instance.PostSessionList.Enqueue(session);

                SessionSingleton.Instance.ProcessPosting();

                return "Object created or updated!";
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }
    }
}
