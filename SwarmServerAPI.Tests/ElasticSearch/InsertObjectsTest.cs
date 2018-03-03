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

namespace SwarmServerAPI.Tests.ElasticSearch
{
    [TestClass]
    public class LoadObjects
    {
        public class TestObject
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }

        public List<TestObject> lstTestObject;
        public List<TestObject> TestObjects
        {
            get
            {
                if (lstTestObject == null)
                {
                    lstTestObject = new List<TestObject>();
                    lstTestObject.Add(new TestObject { Id = 1, Name = "Name 1" });
                    lstTestObject.Add(new TestObject { Id = 2, Name = "Name 2" });
                    lstTestObject.Add(new TestObject { Id = 3, Name = "Name 3" });
                    lstTestObject.Add(new TestObject { Id = 4, Name = "Name 4" });
                    lstTestObject.Add(new TestObject { Id = 5, Name = "Name 5" });
                    lstTestObject.Add(new TestObject { Id = 6, Name = "Name 6" });
                    lstTestObject.Add(new TestObject { Id = 7, Name = "Name 7" });
                    lstTestObject.Add(new TestObject { Id = 8, Name = "Name 8" });
                    lstTestObject.Add(new TestObject { Id = 9, Name = "Name 9" });
                    lstTestObject.Add(new TestObject { Id = 10, Name = "Name 10" });
                    lstTestObject.Add(new TestObject { Id = 11, Name = "Name 11" });
                    lstTestObject.Add(new TestObject { Id = 12, Name = "Name 12" });
                    lstTestObject.Add(new TestObject { Id = 13, Name = "Name 13" });
                    lstTestObject.Add(new TestObject { Id = 14, Name = "Name 14" });
                    lstTestObject.Add(new TestObject { Id = 15, Name = "Name 15" });
                    lstTestObject.Add(new TestObject { Id = 16, Name = "Name 16" });
                    lstTestObject.Add(new TestObject { Id = 17, Name = "Name 17" });
                    lstTestObject.Add(new TestObject { Id = 18, Name = "Name 18" });
                    lstTestObject.Add(new TestObject { Id = 19, Name = "Name 19" });
                    lstTestObject.Add(new TestObject { Id = 20, Name = "Name 20" });
                }

                return lstTestObject;
            }
        }

        [TestMethod]
        public void InsertFirst()
        {
            var response = ConnectionToES.EsClient().Index(TestObjects[0], i => i
                .Index("swarmdb")
                .Type("project")
                .Id(TestObjects[0].Id)
                .Refresh(Elasticsearch.Net.Refresh.True));

            if (!response.IsValid)
                throw response.OriginalException;
        }

        [TestMethod]
        public void InsertSecond()
        {
            var response = ConnectionToES.EsClient().Index(TestObjects[1], i => i
                .Index("swarmdb")
                .Type("project")
                .Id(TestObjects[1].Id)
                .Refresh(Elasticsearch.Net.Refresh.True));

            if (!response.IsValid)
                throw response.OriginalException;
        }

        [TestMethod]
        public void InsertFirstTen()
        {
            foreach (TestObject project in TestObjects.Take(10))
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
        public void Delete()
        {
            WebRequest request = WebRequest.Create("http://191.234.182.53:9200/swarmdb?pretty");
            request.Method = "DELETE";

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        }
    }
}
