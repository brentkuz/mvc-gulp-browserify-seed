using System.Web;
using System.Web.Mvc;

namespace MVC_Gulp_Browserify
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
