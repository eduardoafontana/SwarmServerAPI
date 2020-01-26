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
                      //TODO: Removed to bug fix de double click of selectpicker for filters. Maybe review later.
                      //"~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/bootstrap.bundle.js",
                      "~/Scripts/bootstrap-select.js"
                      ));

            //bundles.Add(new ScriptBundle("~/bundles/data-tasktime").Include(
            //          "~/Scripts/data-tasktime.js"));

            bundles.Add(new ScriptBundle("~/bundles/threejs").Include(
                      "~/Scripts/three.js/build/three.min.js",
                      //"~/Scripts/three.js/CSS3DRenderer.js",
                      "~/Scripts/three.js/OrbitControls.js",
                      "~/Scripts/three.js/dat.gui.min.js",
                      "~/Scripts/three.js/stats.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/view3d").Include(
                      "~/Scripts/view3d/fontLoader.js",
                      "~/Scripts/view3d/detail-box.js",
                      "~/Scripts/view3d/detail-box-additional.js",
                      "~/Scripts/view3d/info-box.js",
                      "~/Scripts/view3d/color-palette.js",
                      "~/Scripts/view3d/data-control.js",
                      "~/Scripts/view3d/scaleOptions.js",
                      "~/Scripts/view3d/hideShowOptions.js",
                      "~/Scripts/view3d/colorPaletteOptions.js",
                      "~/Scripts/view3d/render.js",
                      "~/Scripts/view3d/groupAssembler.js",
                      "~/Scripts/view3d/Group.js",
                      "~/Scripts/view3d/Cube.js",
                      "~/Scripts/view3d/CubeReflection.js",
                      "~/Scripts/view3d/Cylinder.js",
                      "~/Scripts/view3d/Plane.js",
                      "~/Scripts/view3d/Planes.js",
                      "~/Scripts/view3d/HideCube.js",
                      "~/Scripts/view3d/TitleCube.js",
                      "~/Scripts/view3d/Arrow.js",
                      "~/Scripts/view3d/ArrowHuge.js",
                      "~/Scripts/view3d/Torus.js",
                      "~/Scripts/view3d/Sphere.js",
                      "~/Scripts/view3d/Square.js",
                      "~/Scripts/view3d/TubeSphere.js",
                      "~/Scripts/view3d/Tube.js",
                      "~/Scripts/view3d/Grid.js",
                      "~/Scripts/view3d/Axes.js",
                      "~/Scripts/view3d/sessionFilter.js",
                      "~/Scripts/view3d/taskProjectFilter.js",
                      "~/Scripts/view3d/userFilter.js",
                      "~/Scripts/view3d/sourceCode-control.js",
                      "~/Scripts/view3d/View3d.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/jquery.qtip.css",
                      "~/Content/bootstrap-select.css",
                      "~/Content/bootstrap-grid.css",
                      "~/Content/bootstrap-reboot.css",
                      "~/Content/dashboard.css"));

            bundles.Add(new StyleBundle("~/Content/view3d").Include(
                      "~/Content/detail-box.css"));

            //BundleTable.EnableOptimizations = true;
        }
    }
}
