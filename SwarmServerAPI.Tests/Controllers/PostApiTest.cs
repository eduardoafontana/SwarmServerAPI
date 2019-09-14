using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SwarmServerAPI.AppCode.Repository;

namespace SwarmServerAPI.Tests.SwarmServerAPI.Tests.Controllers
{
    [TestClass]
    public class PostApiTest
    {
        [TestMethod]
        public void PostTest()
        {
            DoPost();
        }

        private async void DoPost()
        {
            HttpClient client = new HttpClient();

            string dataModel = @"{""Id"":""e198240a-02a4-482b-8abc-c24ef7d6daa9"",""Description"":""From Pharo Test"",""Started"":""2019-09-14 08:50:00.000"",""Finished"":""2019-09-14 08:51:00.000"",""DeveloperName"":""Eduardo"",""TaskName"":""Test from test"",""TaskAction"":""SearchingBug"",""TaskDescription"":null,""TaskCreated"":null,""TaskTotalSessionTime"":""00:00:00.0000000"",""ProjectName"":""FromPharo"",""Breakpoints"":""[]"",""CodeFiles"":[],""Events"":[],""PathNodes"":[]}";

            //Session session = new Session();
            //session.Id = Guid.Parse("e198240a-02a4-482b-8abc-c24ef7d6daa9");
            //session.Description = "From Pharo Test";
            //session.Started = DateTime.Now;
            //session.Finished = DateTime.Now;
            //session.DeveloperName = "Eduardo";
            //session.TaskName = "Test from test";
            //session.TaskAction = "SearchingBug";
            //session.TaskDescription = null;
            //session.TaskCreated = DateTime.Now;
            //session.TaskTotalSessionTime = TimeSpan.Zero;
            //session.ProjectName = "FromPharo";
            //session.Breakpoints = new List<Breakpoint>();
            //need to set others lists

            //string objJsonDataSerialized = Newtonsoft.Json.JsonConvert.SerializeObject(session, Newtonsoft.Json.Formatting.None);

            var buffer = Encoding.UTF8.GetBytes(dataModel);//objJsonDataSerialized
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            HttpResponseMessage response = await client.PostAsync("http://localhost:54686/api/session", byteContent);

            var responseString = response.Content.ReadAsStringAsync();
        }
    }
}
