using System.Web;
using System.Web.Mvc;

namespace SwarmServerAPI.UI.SwarmServerAPI
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
