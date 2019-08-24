using System;
using System.Collections.Generic;
using System.Net.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SwarmServerAPI.Tests.SwarmServerAPI.Tests.Controllers
{
    [TestClass]
    public class PostApiPharoTest
    {
        [TestMethod]
        public void PostPharoTest()
        {
            DoPost();
        }

        private async void DoPost()
        {
            HttpClient client = new HttpClient();

            Dictionary<string, string> values = new Dictionary<string, string>
            {
               { "Id", Guid.NewGuid().ToString() },
               { "Description", "Test" }
            };

            FormUrlEncodedContent content = new FormUrlEncodedContent(values);

            HttpResponseMessage response = await client.PostAsync("http://localhost:54686/api/pharosession", content);

            var responseString = response.Content.ReadAsStringAsync();
        }
    }
}
