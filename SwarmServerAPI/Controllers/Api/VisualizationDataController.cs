using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
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
        public HttpResponseMessage GetView3dVisualization()
        {
            try
            {
                #region json 
                //                string data = @"[
                //        {
                //            ""name"": ""User ABC"", ""projects"": [{
                //                ""name"": ""Day 17-10 presentation"", ""sessions"": [{
                //                    ""files"": [{
                //                        ""fileId"": ""1"",
                //                        ""fileName"": ""file11.cs"",
                //                        ""groupId"": 1,
                //                        ""groupIndex"": 0,
                //                        ""lines"": 10,
                //                        ""breakpoints"": [{
                //                            ""line"": 5, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 7, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 5 }]
                //                    },
                //                    {
                //                        ""fileId"": ""2"",
                //                        ""fileName"": ""file2.cs"",
                //                        ""groupId"": 1,
                //                        ""groupIndex"": 1,
                //                        ""lines"": 20,
                //                        ""breakpoints"": [{
                //                            ""line"": 10, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 12, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 10 }]
                //                    },
                //                    {
                //                        ""fileId"": ""3"",
                //                        ""fileName"": ""file3.cs"",
                //                        ""groupId"": 1,
                //                        ""groupIndex"": 2,
                //                        ""lines"": 30,
                //                        ""breakpoints"": [{
                //                            ""line"": 15, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 17, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 15 }]
                //                    },
                //                    {
                //                        ""fileId"": ""4"",
                //                        ""fileName"": ""file4.cs"",
                //                        ""groupId"": 2,
                //                        ""groupIndex"": 0,
                //                        ""lines"": 40,
                //                        ""breakpoints"": [{
                //                            ""line"": 20, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 22, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 20 }]
                //                    },
                //                    {
                //                        ""fileId"": ""5"",
                //                        ""fileName"": ""file5.cs"",
                //                        ""groupId"": 2,
                //                        ""groupIndex"": 1,
                //                        ""lines"": 50,
                //                        ""breakpoints"": [{
                //                            ""line"": 25, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 27, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 25 }]
                //                    },
                //                    {
                //                        ""fileId"": ""6"",
                //                        ""fileName"": ""file6.cs"",
                //                        ""groupId"": 3,
                //                        ""groupIndex"": 0,
                //                        ""lines"": 60,
                //                        ""breakpoints"": [{
                //                            ""line"": 30, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 32, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 30 }]
                //                    }],
                //                    ""pathnodes"": [{ ""fileId"": ""1"", ""line"": 5 }, { ""fileId"": ""2"", ""line"": 10 }, { ""fileId"": ""3"", ""line"": 15 }, { ""fileId"": ""4"", ""line"": 20 }, { ""fileId"": ""5"", ""line"": 25 }, { ""fileId"": ""6"", ""line"": 30 }]
                //                },
                //                {
                //                    ""files"": [{
                //                        ""fileId"": ""10"",
                //                        ""fileName"": ""file1.cs"",
                //                        ""groupId"": 1,
                //                        ""groupIndex"": 0,
                //                        ""lines"": 10,
                //                        ""breakpoints"": [{
                //                            ""line"": 5, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 7, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 5 }]
                //                    },
                //                    {
                //                        ""fileId"": ""20"",
                //                        ""fileName"": ""file2.cs"",
                //                        ""groupId"": 1,
                //                        ""groupIndex"": 1,
                //                        ""lines"": 20,
                //                        ""breakpoints"": [{
                //                            ""line"": 10, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 12, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 10 }]
                //                    },
                //                    {
                //                        ""fileId"": ""50"",
                //                        ""fileName"": ""file5.cs"",
                //                        ""groupId"": 2,
                //                        ""groupIndex"": 1,
                //                        ""lines"": 50,
                //                        ""breakpoints"": [{
                //                            ""line"": 25, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 27, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 25 }]
                //                    },
                //                    {
                //                        ""fileId"": ""60"",
                //                        ""fileName"": ""file6.cs"",
                //                        ""groupId"": 3,
                //                        ""groupIndex"": 0,
                //                        ""lines"": 60,
                //                        ""breakpoints"": [{
                //                            ""line"": 30, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 32, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 30 }]
                //                    },
                //                    {
                //                        ""fileId"": ""70"",
                //                        ""fileName"": ""file8.cs"",
                //                        ""groupId"": 3,
                //                        ""groupIndex"": 2,
                //                        ""lines"": 70,
                //                        ""breakpoints"": [{
                //                            ""line"": 35, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 37, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 35 }]
                //                    }],
                //                    ""pathnodes"": [{ ""fileId"": ""10"", ""line"": 5 }, { ""fileId"": ""20"", ""line"": 10 }, { ""fileId"": ""50"", ""line"": 25 }, { ""fileId"": ""60"", ""line"": 30 }, { ""fileId"": ""70"", ""line"": 35 }]
                //                },
                //                {
                //                    ""files"": [{
                //                        ""fileId"": ""100"",
                //                        ""fileName"": ""file1.cs"",
                //                        ""groupId"": 1,
                //                        ""groupIndex"": 0,
                //                        ""lines"": 10,
                //                        ""breakpoints"": [{
                //                            ""line"": 5, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 7, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 5 }]
                //                    }],
                //                    ""pathnodes"": []
                //                },
                //                {
                //                    ""files"": [{
                //                        ""fileId"": ""5001"",
                //                        ""fileName"": ""file5.cs"",
                //                        ""groupId"": 2,
                //                        ""groupIndex"": 1,
                //                        ""lines"": 50,
                //                        ""breakpoints"": [{
                //                            ""line"": 25, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 27, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 25 }]
                //                    },
                //                    {
                //                        ""fileId"": ""6001"",
                //                        ""fileName"": ""file7.cs"",
                //                        ""groupId"": 3,
                //                        ""groupIndex"": 1,
                //                        ""lines"": 60,
                //                        ""breakpoints"": [{
                //                            ""line"": 30, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 32, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 30 }]
                //                    },
                //                    {
                //                        ""fileId"": ""7001"",
                //                        ""fileName"": ""file8.cs"",
                //                        ""groupId"": 3,
                //                        ""groupIndex"": 2,
                //                        ""lines"": 70,
                //                        ""breakpoints"": [{
                //                            ""line"": 35, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 37, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 35 }]
                //                    }],
                //                    ""pathnodes"": [{ ""fileId"": ""5001"", ""line"": 25 }, { ""fileId"": ""6001"", ""line"": 30 }, { ""fileId"": ""7001"", ""line"": 35 }]
                //                },
                //                {
                //                    ""files"": [{
                //                        ""fileId"": ""1000"",
                //                        ""fileName"": ""file1.cs"",
                //                        ""groupId"": 1,
                //                        ""groupIndex"": 0,
                //                        ""lines"": 10,
                //                        ""breakpoints"": [{
                //                            ""line"": 5, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 7, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 5 }]
                //                    },
                //                    {
                //                        ""fileId"": ""2000"",
                //                        ""fileName"": ""file2.cs"",
                //                        ""groupId"": 1,
                //                        ""groupIndex"": 1,
                //                        ""lines"": 20,
                //                        ""breakpoints"": [{
                //                            ""line"": 10, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 12, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 10 }]
                //                    },
                //                    {
                //                        ""fileId"": ""4000"",
                //                        ""fileName"": ""file4.cs"",
                //                        ""groupId"": 2,
                //                        ""groupIndex"": 0,
                //                        ""lines"": 40,
                //                        ""breakpoints"": [{
                //                            ""line"": 20, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 22, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 20 }]
                //                    },
                //                    {
                //                        ""fileId"": ""5000"",
                //                        ""fileName"": ""file5.cs"",
                //                        ""groupId"": 2,
                //                        ""groupIndex"": 1,
                //                        ""lines"": 50,
                //                        ""breakpoints"": [{
                //                            ""line"": 25, ""data"": ""dados html""
                //                        }],
                //                        ""events"": [{ ""line"": 27, ""data"": ""dados html"" }],
                //                        ""nodes"": [{ ""line"": 25 }]
                //                    }],
                //                    ""pathnodes"": [{ ""fileId"": ""1000"", ""line"": 5 }, { ""fileId"": ""2000"", ""line"": 10 }, { ""fileId"": ""4000"", ""line"": 20 }, { ""fileId"": ""5000"", ""line"": 25 }]
                //                }],
                //                ""groups"": [{ ""groupId"": 1, ""maxIndexWidthQuantity"": 2 }, { ""groupId"": 2, ""maxIndexWidthQuantity"": 1 }, { ""groupId"": 3, ""maxIndexWidthQuantity"": 2 }]
                //            },
                //            {
                //                ""name"": ""Day 17-10 presentation 2"",
                //                ""sessions"": [
                //                    {
                //                        ""files"": [
                //                            {
                //                                ""fileId"": ""1"",
                //                                ""groupId"": 1,
                //                                ""groupIndex"": 0,
                //                                ""lines"": 308,
                //                                ""breakpoints"": [],
                //                                ""events"": [],
                //                                ""nodes"": [
                //                                    { ""line"": 35 }, { ""line"": 36 }
                //                                ]
                //                            },
                //                            {
                //                                ""fileId"": ""2"",
                //                                ""groupId"": 2,
                //                                ""groupIndex"": 0,
                //                                ""lines"": 201,
                //                                ""breakpoints"": [],
                //                                ""events"": [],
                //                                ""nodes"": [
                //                                    { ""line"": 137 },
                //                                    { ""line"": 135 },
                //                                    { ""line"": 133 },
                //                                    { ""line"": 128 },
                //                                    { ""line"": 122 }
                //                                ]
                //                            },
                //                            {
                //                                ""fileId"": ""3"",
                //                                ""groupId"": 2,
                //                                ""groupIndex"": 1,
                //                                ""lines"": 275,
                //                                ""breakpoints"": [],
                //                                ""events"": [],
                //                                ""nodes"": [
                //                                    { ""line"": 215 },
                //                                    { ""line"": 47 },
                //                                    { ""line"": 216 }
                //                                ]
                //                            },
                //                            {
                //                                ""fileId"": ""4"",
                //                                ""groupId"": 2,
                //                                ""groupIndex"": 2,
                //                                ""lines"": 268,
                //                                ""breakpoints"": [],
                //                                ""events"": [],
                //                                ""nodes"": [
                //                                    { ""line"": 210 },
                //                                    { ""line"": 152 },
                //                                    { ""line"": 120 }
                //                                ]
                //                            },
                //                            {
                //                                ""fileId"": ""5"",
                //                                ""groupId"": 3,
                //                                ""groupIndex"": 0,
                //                                ""lines"": 509,
                //                                ""breakpoints"": [],
                //                                ""events"": [],
                //                                ""nodes"": [
                //                                    { ""line"": 205 },
                //                                    { ""line"": 206 }
                //                                ]
                //                            },
                //                            {
                //                                ""fileId"": ""6"",
                //                                ""groupId"": 4,
                //                                ""groupIndex"": 0,
                //                                ""lines"": 150,
                //                                ""breakpoints"": [],
                //                                ""events"": [],
                //                                ""nodes"": [
                //                                    {
                //                                        ""line"": 103
                //                                    },
                //                                    { ""line"": 104 }
                //                                ]
                //                            },
                //                            {
                //                                ""fileId"": ""7"",
                //                                ""groupId"": 4,
                //                                ""groupIndex"": 1,
                //                                ""lines"": 150,
                //                                ""breakpoints"": [],
                //                                ""events"": [],
                //                                ""nodes"": [
                //                                    {
                //                                        ""line"": 103
                //                                    },
                //                                    { ""line"": 104 }
                //                                ]
                //                            },
                //                            {
                //                                ""fileId"": ""8"",
                //                                ""groupId"": 4,
                //                                ""groupIndex"": 2,
                //                                ""lines"": 150,
                //                                ""breakpoints"": [],
                //                                ""events"": [],
                //                                ""nodes"": [
                //                                    {
                //                                        ""line"": 103
                //                                    },
                //                                    { ""line"": 104 }
                //                                ]
                //                            },
                //                            {
                //                                ""fileId"": ""9"",
                //                                ""groupId"": 5,
                //                                ""groupIndex"": 0,
                //                                ""lines"": 340,
                //                                ""breakpoints"": [],
                //                                ""events"": [],
                //                                ""nodes"": [
                //                                    {
                //                                        ""line"": 110
                //                                    },
                //                                    { ""line"": 115 }
                //                                ]
                //                            }
                //                        ],
                //                        ""pathnodes"": [
                //                            {
                //                                ""fileId"": ""1"",
                //                                ""line"": 35
                //                            },
                //                            {
                //                                ""fileId"": ""2"",
                //                                ""line"": 137
                //                            },
                //                            {
                //                                ""fileId"": ""2"",
                //                                ""line"": 133
                //                            },
                //                            {
                //                                ""fileId"": ""2"",
                //                                ""line"": 125
                //                            },
                //                            {
                //                                ""fileId"": ""2"",
                //                                ""line"": 135
                //                            },
                //                            {
                //                                ""fileId"": ""2"",
                //                                ""line"": 128
                //                            },
                //                            {
                //                                ""fileId"": ""3"",
                //                                ""line"": 47
                //                            },
                //                            {
                //                                ""fileId"": ""3"",
                //                                ""line"": 215
                //                            },
                //                            {
                //                                ""fileId"": ""4"",
                //                                ""line"": 210
                //                            },
                //                            {
                //                                ""fileId"": ""4"",
                //                                ""line"": 152
                //                            },
                //                            {
                //                                ""fileId"": ""5"",
                //                                ""line"": 205
                //                            },
                //                            {
                //                                ""fileId"": ""6"",
                //                                ""line"": 103
                //                            },
                //                            {
                //                                ""fileId"": ""7"",
                //                                ""line"": 103
                //                            },
                //                            {
                //                                ""fileId"": ""8"",
                //                                ""line"": 103
                //                            },
                //                            {
                //                                ""fileId"": ""9"",
                //                                ""line"": 110
                //                            },
                //                            {
                //                                ""fileId"": ""9"",
                //                                ""line"": 115
                //                            },
                //                            {
                //                                ""fileId"": ""8"",
                //                                ""line"": 104
                //                            },
                //                            {
                //                                ""fileId"": ""7"",
                //                                ""line"": 104
                //                            },
                //                            {
                //                                ""fileId"": ""6"",
                //                                ""line"": 104
                //                            },
                //                            {
                //                                ""fileId"": ""5"",
                //                                ""line"": 206
                //                            },
                //                            {
                //                                ""fileId"": ""4"",
                //                                ""line"": 120
                //                            },
                //                            {
                //                                ""fileId"": ""3"",
                //                                ""line"": 116
                //                            },
                //                            {
                //                                ""fileId"": ""2"",
                //                                ""line"": 122
                //                            },
                //                            {
                //                                ""fileId"": ""1"",
                //                                ""line"": 36
                //                            }
                //                        ]
                //                    }
                //                ],
                //                ""groups"": [
                //                    {
                //                        ""groupId"": 1,
                //                        ""maxIndexWidthQuantity"": 0
                //                    },
                //                    {
                //                        ""groupId"": 2,
                //                        ""maxIndexWidthQuantity"": 2
                //                    },
                //                    {
                //                        ""groupId"": 3,
                //                        ""maxIndexWidthQuantity"": 0
                //                    },
                //                    {
                //                        ""groupId"": 4,
                //                        ""maxIndexWidthQuantity"": 2
                //                    },
                //                    {
                //                        ""groupId"": 5,
                //                        ""maxIndexWidthQuantity"": 0
                //                    }
                //                ]
                //            },
                //            {
                //                ""name"": ""Project 1 ABC"", ""sessions"": [{
                //                    ""files"": [
                //                        { ""groupId"": 0, ""groupIndex"": 0, ""lines"": 150, ""breakpoints"": [{ ""line"": 10, ""data"": ""<h4>título 10</h4><p>10 </p><p>breakpoint</p>"" }], ""events"": [] },
                //                        { ""fileId"": ""b6ffd257"", ""groupId"": 0, ""groupIndex"": 1, ""lines"": 160, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 30 }] },
                //                        { ""fileId"": ""2d7c"", ""groupId"": 1, ""groupIndex"": 0, ""lines"": 170, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 50 }, { ""line"": 15 }] },
                //                        { ""fileId"": ""4038"", ""groupId"": 1, ""groupIndex"": 1, ""lines"": 140, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 60 }] },
                //                        { ""groupId"": 2, ""groupIndex"": 0, ""lines"": 180, ""breakpoints"": [], ""events"": [] },
                //                        { ""groupId"": 2, ""groupIndex"": 1, ""lines"": 200, ""breakpoints"": [], ""events"": [] },
                //                        { ""fileId"": ""7f8aeab1cb38"", ""groupId"": 2, ""groupIndex"": 2, ""lines"": 130, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 40 }] },
                //                        { ""groupId"": 2, ""groupIndex"": 3, ""lines"": 76, ""breakpoints"": [], ""events"": [] },
                //                        {
                //                            ""groupId"": 2, ""groupIndex"": 4, ""lines"": 300, ""breakpoints"": [
                //                                { ""line"": 20, ""data"": ""<h4>título 20</h4><p>20 </p><p>breakpoint</p>"" }
                //                            ], ""events"": []
                //                        },
                //                        {
                //                            ""groupId"": 2, ""groupIndex"": 5, ""lines"": 210, ""breakpoints"": [
                //                                { ""line"": 30, ""data"": ""<h4>título 30</h4><p>30 </p><p>breakpoint</p>"" },
                //                                { ""line"": 40, ""data"": ""<h4>título 40</h4><p>40 </p><p>breakpoint</p>"" }
                //                            ], ""events"": []
                //                        },
                //                        {
                //                            ""groupId"": 2, ""groupIndex"": 6, ""lines"": 120, ""breakpoints"": [
                //                            ], ""events"": [
                //                                { ""line"": 10, ""data"": ""<h4>título 100</h4><p>100 </p><p>event</p>"" },
                //                                { ""line"": 30, ""data"": ""<h4>título 300</h4><p>300 </p><p>event</p>"" },
                //                                { ""line"": 35, ""data"": ""<h4>título 350</h4><p>350 </p><p>event</p>"" }
                //                            ]
                //                        },
                //                        { ""groupId"": 2, ""groupIndex"": 7, ""lines"": 10, ""breakpoints"": [], ""events"": [] },
                //                        { ""groupId"": 2, ""groupIndex"": 8, ""lines"": 280, ""breakpoints"": [], ""events"": [] },
                //                        {
                //                            ""groupId"": 2, ""groupIndex"": 9, ""lines"": 200, ""breakpoints"": [
                //                                { ""line"": 178, ""data"": ""<h4>título 478</h4><p>478 </p><p>breakpoint</p>"" },
                //                                { ""line"": 60, ""data"": ""<h4>título 510</h4><p>510 </p><p>breakpoint</p>"" },
                //                                { ""line"": 65, ""data"": ""<h4>título 515</h4><p>515 </p><p>breakpoint</p>"" }
                //                            ], ""events"": []
                //                        },
                //                        { ""groupId"": 2, ""groupIndex"": 10, ""lines"": 25, ""breakpoints"": [], ""events"": [] },
                //                        { ""groupId"": 2, ""groupIndex"": 11, ""lines"": 245, ""breakpoints"": [], ""events"": [] },
                //                        { ""groupId"": 2, ""groupIndex"": 12, ""lines"": 240, ""breakpoints"": [], ""events"": [] },
                //                        {
                //                            ""groupId"": 2, ""groupIndex"": 13, ""lines"": 31, ""breakpoints"": [
                //                                { ""line"": 2, ""data"": ""<h4>título 2</h4><p>2</p><p>breakpoint</p>"" },
                //                                { ""line"": 31, ""data"": ""<h4>título 31</h4><p>31</p><p>breakpoint</p>"" }
                //                            ], ""events"": []
                //                        },
                //                        {
                //                            ""groupId"": 2, ""groupIndex"": 14, ""lines"": 300, ""breakpoints"": [
                //                                { ""line"": 210, ""data"": ""<h4>título 210</h4><p>210</p><p>breakpoint</p>"" },
                //                                { ""line"": 211, ""data"": ""<h4>título 211</h4><p>211</p><p>breakpoint</p>"" },
                //                                { ""line"": 213, ""data"": ""<h4>título 213</h4><p>213</p><p>breakpoint</p>"" },
                //                                { ""line"": 235, ""data"": ""<h4>título 355</h4><p>355</p><p>breakpoint</p>"" }
                //                            ], ""events"": []
                //                        },
                //                        { ""groupId"": 2, ""groupIndex"": 15, ""lines"": 140, ""breakpoints"": [], ""events"": [] },
                //                        { ""groupId"": 2, ""groupIndex"": 16, ""lines"": 100, ""breakpoints"": [], ""events"": [] }
                //                    ],
                //                    ""pathnodes"": [{ ""fileId"": ""b6ffd257"", ""line"": 30 }, { ""fileId"": ""2d7c"", ""line"": 50 }, { ""fileId"": ""2d7c"", ""line"": 15 }, { ""fileId"": ""4038"", ""line"": 60 }, { ""fileId"": ""7f8aeab1cb38"", ""line"": 40 }]
                //                },
                //                {
                //                    ""files"": [
                //                        { ""fileId"": ""aaa"", ""groupId"": 0, ""groupIndex"": 0, ""lines"": 10, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 5 }] },
                //                        { ""fileId"": ""bbb"", ""groupId"": 0, ""groupIndex"": 1, ""lines"": 20, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 10 }] },
                //                        { ""groupId"": 0, ""groupIndex"": 2, ""lines"": 20, ""breakpoints"": [], ""events"": [] },
                //                        { ""fileId"": ""ccc"", ""groupId"": 1, ""groupIndex"": 0, ""lines"": 30, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 15 }] },
                //                        { ""fileId"": ""ddd"", ""groupId"": 1, ""groupIndex"": 1, ""lines"": 40, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 20 }] }
                //                    ],
                //                    ""pathnodes"": [{ ""fileId"": ""aaa"", ""line"": 5 }, { ""fileId"": ""bbb"", ""line"": 10 }, { ""fileId"": ""ccc"", ""line"": 15 }, { ""fileId"": ""ddd"", ""line"": 20 }]
                //                },
                //                {
                //                    ""files"": [
                //                        { ""groupId"": 0, ""groupIndex"": 0, ""lines"": 40, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 1 }] },
                //                        { ""groupId"": 0, ""groupIndex"": 1, ""lines"": 45, ""breakpoints"": [{ ""line"": 5, ""data"": ""<h4>título 10</h4><p>10 </p><p>breakpoint</p>"" }], ""events"": [{ ""line"": 5, ""data"": ""<h4>título 5</h4><p>5 </p><p>event</p>"" }], ""nodes"": [{ ""line"": 1 }] },
                //                        { ""groupId"": 1, ""groupIndex"": 0, ""lines"": 56, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 1 }] },
                //                        { ""groupId"": 1, ""groupIndex"": 1, ""lines"": 54, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 1 }] },
                //                        { ""groupId"": 1, ""groupIndex"": 2, ""lines"": 34, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 1 }] },
                //                        { ""groupId"": 1, ""groupIndex"": 3, ""lines"": 35, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 1 }] },
                //                        { ""groupId"": 3, ""groupIndex"": 0, ""lines"": 15, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 1 }] }
                //                    ], ""pathnodes"": []
                //                },
                //                {
                //                    ""files"": [
                //                        { ""groupId"": 1, ""groupIndex"": 0, ""lines"": 10, ""breakpoints"": [{ ""line"": 5, ""data"": ""<h4>título 10</h4><p>10 </p><p>breakpoint</p>"" }], ""events"": [], ""nodes"": [{ ""line"": 1 }] },
                //                        { ""groupId"": 1, ""groupIndex"": 1, ""lines"": 10, ""breakpoints"": [], ""events"": [{ ""line"": 5, ""data"": ""<h4>título 5</h4><p>5</p><p>event</p>"" }], ""nodes"": [{ ""line"": 1 }] },
                //                        { ""groupId"": 3, ""groupIndex"": 0, ""lines"": 10, ""breakpoints"": [], ""events"": [], ""nodes"": [{ ""line"": 1 }] }
                //                    ], ""pathnodes"": []
                //                }],
                //                ""groups"": [{ ""groupId"": 0, ""maxIndexWidthQuantity"": 2 }, { ""groupId"": 1, ""maxIndexWidthQuantity"": 3 }, { ""groupId"": 2, ""maxIndexWidthQuantity"": 16 }, { ""groupId"": 3, ""maxIndexWidthQuantity"": 0 }]
                //            }]
                //        },
                //        {
                //            ""name"": ""User XYZ"", ""projects"": [{
                //                ""name"": ""Project 1 XYZ"", ""sessions"": [{
                //                    ""files"": [{
                //                        ""groupId"": 0,
                //                        ""groupIndex"": 0,
                //                        ""lines"": 300,
                //                        ""breakpoints"": [],
                //                        ""events"": [],
                //                        ""nodes"": []
                //                    }],
                //                    ""pathnodes"": []
                //                }], ""groups"": []
                //            }]
                //        },
                //        {
                //            ""name"": ""User OKS"", ""projects"": [
                //                {
                //                    ""name"": ""Project 1 OKS"", ""sessions"": [{
                //                        ""files"": [{
                //                            ""groupId"": 0,
                //                            ""groupIndex"": 0,
                //                            ""lines"": 120,
                //                            ""breakpoints"": [],
                //                            ""events"": [],
                //                            ""nodes"": []
                //                        }],
                //                        ""pathnodes"": []
                //                    }], ""groups"": []
                //                },
                //                {
                //                    ""name"": ""Project 2 OKS"", ""sessions"": [
                //                        {
                //                            ""files"": [
                //                                { ""groupId"": 0, ""groupIndex"": 0, ""lines"": 1, ""breakpoints"": [], ""events"": [] },
                //                                { ""groupId"": 0, ""groupIndex"": 1, ""lines"": 10, ""breakpoints"": [], ""events"": [] },
                //                                { ""groupId"": 0, ""groupIndex"": 2, ""lines"": 1, ""breakpoints"": [], ""events"": [] },
                //                                {
                //                                    ""groupId"": 0, ""groupIndex"": 3, ""lines"": 120, ""breakpoints"": [], ""events"": [
                //                                        { ""line"": 100, ""data"": ""<h4>título 100</h4><p>100 </p><p>event</p>"" },
                //                                        { ""line"": 20, ""data"": ""<h4>título 20</h4><p>20 </p><p>event</p>"" },
                //                                        { ""line"": 50, ""data"": ""<h4>título 50</h4><p>50 </p><p>event</p>"" }
                //                                    ]
                //                                }
                //                            ], ""pathnodes"": []
                //                        }
                //                    ],
                //                    ""groups"": [{ ""groupId"": 0, ""maxIndexWidthQuantity"": 3 }]
                //                }
                //            ]
                //        }
                //    ]
                //";
                #endregion


                VisualizationService visualizationService = new VisualizationService();
                var view3dData = visualizationService.GetView3dData();

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
