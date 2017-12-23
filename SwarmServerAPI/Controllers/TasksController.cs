using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SwarmServerAPI.Controllers
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
                List<Task> distinctTask = context.Tasks.GroupBy(d => new { d.Name }).Select(g => g.FirstOrDefault()).ToList();
                string[] distinctTaskNames = distinctTask.Select(t => t.Name).ToArray();

                foreach (string taskName in distinctTaskNames)
                {
                    List<Session> taskSessions = context.Sessions.Where(x => x.Task.Name.Equals(taskName)).ToList();

                    double totalMiliTask = 0;

                    foreach (Session session in taskSessions)
                    {
                        if (session.Finished != null)
                        {
                            TimeSpan diff = (DateTime)session.Finished - session.Started;

                            totalMiliTask += diff.TotalMilliseconds;
                        }
                    }

                    foreach (Task task in context.Tasks.Where(t => t.Name.Equals(taskName)))
                    {
                        task.TotalSessionTime = TimeSpan.FromMilliseconds(totalMiliTask);
                    }
                }

                context.SaveChanges();
            }

            return RedirectToAction("Index");
        }
    }
}