using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SwarmServerAPI;
using SwarmServerAPI.Controllers;
using SwarmServerAPI.ElasticSearch;

namespace SwarmServerAPI.Tests.Controllers
{
    [TestClass]
    public class ElasticSearchLoadRealTest
    {
        [TestMethod]
        public void InsertAll()
        {
            using (SwarmData context = new SwarmData())
            {
                System.Diagnostics.Debug.WriteLine("Started.");

                foreach (Project project in context.Projects.ToList())
                {
                    var response = ConnectionToES.EsClient().Index(project, i => i
                        .Index("swarmdb")
                        .Type("project")
                        .Id(project.Id)
                        .Refresh(Elasticsearch.Net.Refresh.True));
                }

                System.Diagnostics.Debug.WriteLine("Projects finished.");

                foreach (Task task in context.Tasks.ToList())
                {
                    var response = ConnectionToES.EsClient().Index(task, i => i
                        .Index("swarmdb")
                        .Type("task")
                        .Id(task.Id)
                        .Refresh(Elasticsearch.Net.Refresh.True));
                }

                System.Diagnostics.Debug.WriteLine("Tasks finished.");

                foreach (Developer developer in context.Developers.ToList())
                {
                    var response = ConnectionToES.EsClient().Index(developer, i => i
                        .Index("swarmdb")
                        .Type("developer")
                        .Id(developer.Id)
                        .Refresh(Elasticsearch.Net.Refresh.True));
                }

                System.Diagnostics.Debug.WriteLine("Developers finished.");

                foreach (Session session in context.Sessions.ToList())
                {
                    var response = ConnectionToES.EsClient().Index(session, i => i
                        .Index("swarmdb")
                        .Type("session")
                        .Id(session.Identifier)
                        .Refresh(Elasticsearch.Net.Refresh.True));
                }

                System.Diagnostics.Debug.WriteLine("Sessions finished.");

                System.Diagnostics.Debug.WriteLine("Finished all.");
            }
        }

        [TestMethod]
        public void Delete()
        {
            WebRequest request = WebRequest.Create("http://191.234.182.53:9200/swarmdb?pretty");
            request.Method = "DELETE";

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        }
    }
}
