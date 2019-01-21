using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;
using SwarmServerAPI.AppCode.Repository;
using SwarmServerAPI.AppCore.Service;
using SwarmServerAPI.AppCore.Service.DTOModels;
using SwarmServerAPI.UI.SwarmServerAPI.General;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class VisualizationDataController : ApiController
    {
        [HttpGet]
        [Route("api/Visualization/Session")]
        public IEnumerable<SessionGridModel> GetSessionGrid()
        {
            try
            {
                SessionService sessionService = new SessionService();
                return sessionService.GetSessionGrid();
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }

        [HttpGet]
        [Route("api/Visualization/Session/{id}")]
        public List<ElementModel.Element> GetSessionVisualization(string id)
        {
            try
            {
                SessionService sessionService = new SessionService();
                return sessionService.GetSessionVisualization(id);
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }

        [HttpGet]
        [Route("api/Visualization/Task")]
        public IEnumerable<TaskGridModel> GetTaskGrid()
        {
            try
            {
                TaskService taskService = new TaskService();
                return taskService.GetTaskGrid();
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }

        [HttpGet]
        [Route("api/Visualization/Task/{id}")]
        public List<ElementModel.Element> GetTaskVisualization(string id)
        {
            try
            {
                TaskService taskService = new TaskService();
                return taskService.GetTaskVisualization(id);
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }

        [HttpGet]
        [Route("api/Visualization/Global/Projects")]
        public HttpResponseMessage GetGlobalProjects()
        {
            try
            {
                ProjectService projectService = new ProjectService();
                var projects = projectService.GetDistinctProjects();

                return Request.CreateResponse(HttpStatusCode.OK, projects, "application/json");
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }

        [HttpGet]
        [Route("api/Visualization/Global/{id}")]
        public List<ElementModel.Element> GetGlobalVisualization(string id)
        {
            try
            {
                TaskService taskService = new TaskService();
                return taskService.GetGlobalVisualization(id);
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }

        [HttpGet]
        [Route("api/Visualization/View3dFilter")]
        public HttpResponseMessage GetView3dFilterVisualization()
        {
            try
            {
                VisualizationService visualizationService = new VisualizationService();
                var view3dData = visualizationService.GetView3dDataFilter();

                var data = new JavaScriptSerializer().Serialize(view3dData);

                var response = Request.CreateResponse(HttpStatusCode.OK);
                response.Content = new StringContent(data, Encoding.UTF8, "application/json");
                return response;
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }

        [HttpGet]
        [Route("api/Visualization/View3d")]
        public HttpResponseMessage GetView3dVisualization(string user, string project, string task)
        {
            try
            {
                VisualizationService visualizationService = new VisualizationService();
                var view3dData = visualizationService.GetView3dData(user, project, task);

                var data = new JavaScriptSerializer().Serialize(view3dData);

                var response = Request.CreateResponse(HttpStatusCode.OK);
                response.Content = new StringContent(data, Encoding.UTF8, "application/json");
                return response;
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }

        [HttpGet]
        [Route("api/Visualization/SourceCode")]
        public HttpResponseMessage GetSourceCodeisualization(string originalId)
        {
            try
            {
                VisualizationService visualizationService = new VisualizationService();
                var view3dData = visualizationService.GetView3dSourceCode(originalId);

                var data = new JavaScriptSerializer().Serialize(view3dData);

                var response = Request.CreateResponse(HttpStatusCode.OK);
                response.Content = new StringContent(data, Encoding.UTF8, "application/json");
                return response;
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }
    }
}
