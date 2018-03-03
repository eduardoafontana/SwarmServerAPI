using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Elasticsearch.Net;
using Nest;

namespace SwarmServerAPI.UI.SwarmServerAPI.ElasticSearch
{
    public class ConnectionToES
    {
        public static ElasticClient EsClient()
        {
            ConnectionSettings connectionSettings;
            ElasticClient elasticClient;
            StaticConnectionPool connectionPool;

            var nodes = new Uri[]
            {
                new Uri("http://191.234.182.53:9200/"),
            };

            connectionPool = new StaticConnectionPool(nodes);
            connectionSettings = new ConnectionSettings(connectionPool);
            elasticClient = new ElasticClient(connectionSettings);

            return elasticClient;
        }
    }
}