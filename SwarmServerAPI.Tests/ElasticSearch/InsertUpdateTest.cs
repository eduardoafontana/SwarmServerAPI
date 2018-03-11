using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SwarmServerAPI;
using SwarmServerAPI.AppCode.Repository;
using SwarmServerAPI.AppCore.Service.ElasticSearch;

namespace SwarmServerAPI.Tests.ElasticSearch
{
    [TestClass]
    public class ElasticSearchLoadTest
    {
        public List<PathNode> lstPathNode;
        public List<PathNode> PathNodes
        {
            get
            {
                if (lstPathNode == null)
                {
                    using (SwarmData context = new SwarmData())
                    {
                        lstPathNode = context.PathNodes.OrderBy(p => p.Id).ToList();
                    }
                }

                return lstPathNode;
            }
        }

        [TestMethod]
        public void InsertFirst()
        {
            var response = ConnectionToES.EsClient().Index(PathNodes[0], i => i
                .Index("swarmdb")
                .Type("pathNode")
                .Id(PathNodes[0].Id)
                .Refresh(Elasticsearch.Net.Refresh.True));

            if (!response.IsValid)
                throw response.OriginalException;
        }

        [TestMethod]
        public void InsertSecond()
        {
            var response = ConnectionToES.EsClient().Index(PathNodes[1], i => i
                .Index("swarmdb")
                .Type("pathNode")
                .Id(PathNodes[1].Id)
                .Refresh(Elasticsearch.Net.Refresh.True));

            if (!response.IsValid)
                throw response.OriginalException;
        }

        [TestMethod]
        public void InsertFirstTen()
        {
            foreach (PathNode pathNode in PathNodes.Take(10))
            {
                var response = ConnectionToES.EsClient().Index(pathNode, i => i
                    .Index("swarmdb")
                    .Type("pathNode")
                    .Id(pathNode.Id)
                    .Refresh(Elasticsearch.Net.Refresh.True));

                if (!response.IsValid)
                    throw response.OriginalException;
            }
        }

        [TestMethod]
        public void InsertAll()
        {
            foreach (PathNode pathNode in PathNodes)
            {
                var response = ConnectionToES.EsClient().Index(pathNode, i => i
                    .Index("swarmdb")
                    .Type("pathNode")
                    .Id(pathNode.Id)
                    .Refresh(Elasticsearch.Net.Refresh.True));

                if (!response.IsValid)
                    throw response.OriginalException;
            }
        }

        [TestMethod]
        public void InsertFirstAltered()
        {
            PathNode pathNode = PathNodes[0];
            pathNode.Method = "description test aaaaa";

            var response = ConnectionToES.EsClient().Index(pathNode, i => i
                .Index("swarmdb")
                .Type("pathNode")
                .Id(pathNode.Id)
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
