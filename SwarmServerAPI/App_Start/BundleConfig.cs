﻿using System.Web;
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

            //TODO: Remove this old code later.
            //bundles.Add(new ScriptBundle("~/bundles/data-session")
            //    .Include("~/Scripts/ag-grid-hack.js")
            //    .Include("~/Scripts/data-session.js"));

            //bundles.Add(new ScriptBundle("~/bundles/data-task")
            //    .Include("~/Scripts/ag-grid-hack.js")
            //    .Include("~/Scripts/data-task.js"));

            //bundles.Add(new ScriptBundle("~/bundles/data-tasktime").Include(
            //          "~/Scripts/data-tasktime.js"));

            //bundles.Add(new ScriptBundle("~/bundles/data-codemetric").Include(
            //          "~/Scripts/data-codemetric.js"));

            //bundles.Add(new ScriptBundle("~/bundles/cytoscape").Include(
            //          "~/Scripts/cytoscape.js"));

            //bundles.Add(new ScriptBundle("~/bundles/dagre").Include(
            //          "~/Scripts/dagre.min.js"));

            //bundles.Add(new ScriptBundle("~/bundles/cytoscape-dagre").Include(
            //          "~/Scripts/cytoscape-dagre.js"));

            //bundles.Add(new ScriptBundle("~/bundles/cytoscape-qtip").Include(
            //          "~/Scripts/jquery.qtip.js",
            //          "~/Scripts/cytoscape-qtip.js"));

            bundles.Add(new ScriptBundle("~/bundles/threejs").Include(
                      "~/Scripts/three.js/build/three.min.js",
                      //"~/Scripts/three.js/CSS3DRenderer.js",
                      "~/Scripts/three.js/OrbitControls.js",
                      "~/Scripts/three.js/dat.gui.min.js",
                      "~/Scripts/three.js/stats.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/view3d3").Include(
                      "~/Scripts/view3d3/fontLoader.js",
                      "~/Scripts/view3d3/detail-box.js",
                      "~/Scripts/view3d3/info-box.js",
                      "~/Scripts/view3d3/color-palette.js",
                      "~/Scripts/view3d3/data-control.js",
                      "~/Scripts/view3d3/scaleOptions.js",
                      "~/Scripts/view3d3/hideShowOptions.js",
                      "~/Scripts/view3d3/colorPaletteOptions.js",
                      "~/Scripts/view3d3/render.js",
                      "~/Scripts/view3d3/groupAssembler.js",
                      "~/Scripts/view3d3/Group.js",
                      "~/Scripts/view3d3/Cube.js",
                      "~/Scripts/view3d3/CubeReflection.js",
                      "~/Scripts/view3d3/Cylinder.js",
                      "~/Scripts/view3d3/Plane.js",
                      "~/Scripts/view3d3/Planes.js",
                      "~/Scripts/view3d3/HideCube.js",
                      "~/Scripts/view3d3/TitleCube.js",
                      "~/Scripts/view3d3/Arrow.js",
                      "~/Scripts/view3d3/ArrowHuge.js",
                      "~/Scripts/view3d3/Torus.js",
                      "~/Scripts/view3d3/Sphere.js",
                      "~/Scripts/view3d3/Square.js",
                      "~/Scripts/view3d3/TubeSphere.js",
                      "~/Scripts/view3d3/Tube.js",
                      "~/Scripts/view3d3/Grid.js",
                      "~/Scripts/view3d3/Axes.js",
                      "~/Scripts/view3d3/sessionFilter.js",
                      "~/Scripts/view3d3/taskProjectFilter.js",
                      "~/Scripts/view3d3/userFilter.js",
                      "~/Scripts/view3d3/sourceCode-control.js",
                      "~/Scripts/view3d3/View3d.js"));

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
