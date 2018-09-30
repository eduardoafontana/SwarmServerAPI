using System.Web;
using System.Web.Optimization;

namespace SwarmServerAPI.UI.SwarmServerAPI
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/umd/popper.js",
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/bootstrap-select.js",
                      "~/Scripts/bootstrap.bundle.js"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/data-session")
                .Include("~/Scripts/ag-grid-hack.js")
                .Include("~/Scripts/data-session.js"));

            bundles.Add(new ScriptBundle("~/bundles/data-task")
                .Include("~/Scripts/ag-grid-hack.js")
                .Include("~/Scripts/data-task.js"));

            bundles.Add(new ScriptBundle("~/bundles/data-tasktime").Include(
                      "~/Scripts/data-tasktime.js"));

            bundles.Add(new ScriptBundle("~/bundles/data-codemetric").Include(
                      "~/Scripts/data-codemetric.js"));

            bundles.Add(new ScriptBundle("~/bundles/cytoscape").Include(
                      "~/Scripts/cytoscape.js"));

            bundles.Add(new ScriptBundle("~/bundles/dagre").Include(
                      "~/Scripts/dagre.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/cytoscape-dagre").Include(
                      "~/Scripts/cytoscape-dagre.js"));

            bundles.Add(new ScriptBundle("~/bundles/cytoscape-qtip").Include(
                      "~/Scripts/jquery.qtip.js",
                      "~/Scripts/cytoscape-qtip.js"));

            bundles.Add(new ScriptBundle("~/bundles/threejs").Include(
                      "~/Scripts/three.js/build/three.min.js",
                      "~/Scripts/three.js/OrbitControls.js",
                      "~/Scripts/three.js/dat.gui.min.js",
                      "~/Scripts/three.js/stats.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/3dview").Include(
                      "~/Scripts/3dview/detail-box.js",
                      "~/Scripts/3dview/info-box.js",
                      "~/Scripts/3dview/color-palettes.js",
                      "~/Scripts/3dview/session-data.js",
                      "~/Scripts/3dview/project-data.js",
                      "~/Scripts/3dview/graph.js",
                      "~/Scripts/3dview/core.js",
                      "~/Scripts/3dview/view3d.js"));

            bundles.Add(new ScriptBundle("~/bundles/view3d").Include(
                      //"~/Scripts/3dview/detail-box.js",
                      //"~/Scripts/3dview/info-box.js",
                      //"~/Scripts/3dview/color-palettes.js",
                      "~/Scripts/3dview/session-data.js",
                      "~/Scripts/3dview/project-data.js",
                      //"~/Scripts/3dview/graph.js",
                      //"~/Scripts/3dview/core.js",
                      "~/Scripts/view3d/render.js",
                      "~/Scripts/view3d/groupAssembler.js",
                      "~/Scripts/view3d/Cube.js",
                      "~/Scripts/view3d/HideCube.js",
                      "~/Scripts/view3d/View3d.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/jquery.qtip.css",
                      "~/Content/bootstrap-select.css",
                      "~/Content/bootstrap-grid.css",
                      "~/Content/bootstrap-reboot.css",
                      "~/Content/dashboard.css"));

            bundles.Add(new StyleBundle("~/Content/3dview").Include(
                      "~/Content/detail-box.css"));

            bundles.Add(new StyleBundle("~/Content/view3d").Include(
                      "~/Content/detail-box.css"));

            //BundleTable.EnableOptimizations = true;
        }
    }
}
