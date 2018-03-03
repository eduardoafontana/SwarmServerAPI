using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SwarmServerAPI.AppCode.Repository;
using SwarmServerAPI.UI.SwarmServerAPI.General;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class CodeMetricGridDataController : ApiController
    {
        public IEnumerable<CodeMetricGridModel> Get()
        {
            try
            {
                using (SwarmData context = new SwarmData())
                {
                    return context.PathNodes.Select(pn => new CodeMetricGridModel
                    {
                        SessionIdentifier = pn.Session.Identifier.ToString(),
                        TaskName = pn.Session.Task.Name,
                        TaskProject = pn.Session.Task.Project.Name,
                        Hash = pn.Hash,
                        MaintainabilityIndex = pn.MethodCodeMetric.MaintainabilityIndex,
                        CyclomaticComplexity = pn.MethodCodeMetric.CyclomaticComplexity,
                        ClassCoupling = pn.MethodCodeMetric.ClassCoupling,
                        LineOfCode = pn.MethodCodeMetric.LineOfCode
                    }).ToList();
                }
            }
            catch (Exception ex)
            {
                throw InternalError.ThrowError(ex);
            }
        }
    }
}
