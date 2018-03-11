using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SwarmServerAPI.AppCode.Repository;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class TasksController : Controller
    {
        // GET: Tasks
        public ActionResult Index()
        {
            ViewBag.Title = "Tasks";

            return View();
        }

        [HttpPost]
        public ActionResult Recalculate()
        {
            using (SwarmData context = new SwarmData())
            {
                List<Session> distinctTask = context.Sessions.GroupBy(d => new { d.TaskName }).Select(g => g.FirstOrDefault()).ToList();
                string[] distinctTaskNames = distinctTask.Select(t => t.TaskName).ToArray();

                foreach (string taskName in distinctTaskNames)
                {
                    List<Session> taskSessions = context.Sessions.Where(x => x.TaskName.Equals(taskName)).ToList();

                    double totalMiliTask = 0;

                    foreach (Session session in taskSessions)
                    {
                        if (session.Finished != null)
                        {
                            TimeSpan diff = (DateTime)session.Finished - session.Started;

                            totalMiliTask += diff.TotalMilliseconds;
                        }
                    }

                    //TODO: review logic later, data model changes
                    foreach (Session task in context.Sessions.Where(t => t.TaskName.Equals(taskName)))
                    {
                        task.TaskTotalSessionTime = TimeSpan.FromMilliseconds(totalMiliTask);
                    }
                }

                context.SaveChanges();
            }

            return RedirectToAction("Index");
        }
    }
}