using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SwarmServerAPI;
using SwarmServerAPI.AppCode.Domain;
using SwarmServerAPI.Controllers;
using SwarmServerAPI.ElasticSearch;

namespace SwarmServerAPI.Tests.ElasticSearch
{
    [TestClass]
    public class ElasticSearchLoadTest
    {
        public List<Project> lstProject;
        public List<Project> Projects
        {
            get
            {
                if (lstProject == null)
                {
                    using (SwarmData context = new SwarmData())
                    {
                        lstProject = context.Projects.OrderBy(p => p.Id).ToList();
                    }
                }

                return lstProject;
            }
        }

        [TestMethod]
        public void InsertFirst()
        {
            var response = ConnectionToES.EsClient().Index(Projects[0], i => i
                .Index("swarmdb")
                .Type("project")
                .Id(Projects[0].Id)
                .Refresh(Elasticsearch.Net.Refresh.True));

            if (!response.IsValid)
                throw response.OriginalException;
        }

        [TestMethod]
        public void InsertSecond()
        {
            var response = ConnectionToES.EsClient().Index(Projects[1], i => i
                .Index("swarmdb")
                .Type("project")
                .Id(Projects[1].Id)
                .Refresh(Elasticsearch.Net.Refresh.True));

            if (!response.IsValid)
                throw response.OriginalException;
        }

        [TestMethod]
        public void InsertFirstTen()
        {
            foreach (Project project in Projects.Take(10))
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

        [TestMethod]
        public void InsertAll()
        {
            foreach (Project project in Projects)
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

        [TestMethod]
        public void InsertFirstAltered()
        {
            Project project = Projects[0];
            project.Description = "description test aaaaa";

            var response = ConnectionToES.EsClient().Index(project, i => i
                .Index("swarmdb")
                .Type("project")
                .Id(project.Id)
                .Refresh(Elasticsearch.Net.Refresh.True));

            if (!response.IsValid)
                throw response.OriginalException;
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
