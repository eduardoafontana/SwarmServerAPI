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
    public class PharoSessionController : ApiController
    {
        public HttpResponseMessage Get()
        {
            try
            {
                PharoSessionService sessionService = new PharoSessionService();
                List<PharoSessionModel> sessionModelCollection = sessionService.GetAll();

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

            public Queue<PharoSession> PostSessionList { get; set; } = new Queue<PharoSession>();

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
                                PharoSession session = PostSessionList.Dequeue();

                                if (session == null)
                                    continue;

                                if (session.Id == new Guid("00000000-0000-0000-0000-000000000000"))
                                    continue;

                                PharoSession original = context.PharoSessions.FirstOrDefault(s => s.Id == session.Id);

                                if (original == null)
                                    context.PharoSessions.Add(session);
                                else
                                    context.Entry(original).CurrentValues.SetValues(session);

                                context.SaveChanges();
                            }
                        }
                    }
                });
            }
        }

        public string Post(PharoSession session)
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
