namespace SwarmServerAPI.AppCore.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CodeMetrics",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Hash = c.String(),
                        MaintainabilityIndex = c.String(),
                        CyclomaticComplexity = c.String(),
                        ClassCoupling = c.String(),
                        LineOfCode = c.String(),
                        PathNode_Id = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Events",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        EventKind = c.String(),
                        Detail = c.String(),
                        Namespace = c.String(),
                        Type = c.String(),
                        TypeFullPath = c.String(),
                        Method = c.String(),
                        MethodKey = c.String(),
                        MethodSignature = c.String(),
                        CharStart = c.Int(),
                        CharEnd = c.Int(),
                        LineNumber = c.Int(),
                        LineOfCode = c.String(),
                        Created = c.DateTime(nullable: false),
                        Session_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Sessions", t => t.Session_Id)
                .Index(t => t.Session_Id);
            
            CreateTable(
                "dbo.Sessions",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Description = c.String(),
                        Started = c.DateTime(nullable: false),
                        Finished = c.DateTime(),
                        DeveloperName = c.String(),
                        TaskName = c.String(),
                        TaskAction = c.String(),
                        TaskDescription = c.String(),
                        TaskCreated = c.DateTime(nullable: false),
                        TaskTotalSessionTime = c.Time(nullable: false, precision: 7),
                        ProjectName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Breakpoints",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        BreakpointKind = c.String(),
                        Namespace = c.String(),
                        Type = c.String(),
                        LineNumber = c.Int(),
                        LineOfCode = c.String(),
                        Origin = c.String(),
                        Created = c.DateTime(nullable: false),
                        Session_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Sessions", t => t.Session_Id)
                .Index(t => t.Session_Id);
            
            CreateTable(
                "dbo.PathNodes",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Hash = c.String(),
                        Namespace = c.String(),
                        Type = c.String(),
                        Method = c.String(),
                        Parent = c.String(),
                        Parent_Id = c.Guid(nullable: false),
                        Origin = c.String(),
                        ReturnType = c.String(),
                        Created = c.DateTime(nullable: false),
                        MethodCodeMetric_Id = c.Guid(),
                        Session_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CodeMetrics", t => t.MethodCodeMetric_Id)
                .ForeignKey("dbo.Sessions", t => t.Session_Id)
                .Index(t => t.MethodCodeMetric_Id)
                .Index(t => t.Session_Id);
            
            CreateTable(
                "dbo.PathNodeParameters",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Type = c.String(),
                        Name = c.String(),
                        Value = c.String(),
                        PathNode_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PathNodes", t => t.PathNode_Id)
                .Index(t => t.PathNode_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PathNodes", "Session_Id", "dbo.Sessions");
            DropForeignKey("dbo.PathNodeParameters", "PathNode_Id", "dbo.PathNodes");
            DropForeignKey("dbo.PathNodes", "MethodCodeMetric_Id", "dbo.CodeMetrics");
            DropForeignKey("dbo.Events", "Session_Id", "dbo.Sessions");
            DropForeignKey("dbo.Breakpoints", "Session_Id", "dbo.Sessions");
            DropIndex("dbo.PathNodeParameters", new[] { "PathNode_Id" });
            DropIndex("dbo.PathNodes", new[] { "Session_Id" });
            DropIndex("dbo.PathNodes", new[] { "MethodCodeMetric_Id" });
            DropIndex("dbo.Breakpoints", new[] { "Session_Id" });
            DropIndex("dbo.Events", new[] { "Session_Id" });
            DropTable("dbo.PathNodeParameters");
            DropTable("dbo.PathNodes");
            DropTable("dbo.Breakpoints");
            DropTable("dbo.Sessions");
            DropTable("dbo.Events");
            DropTable("dbo.CodeMetrics");
        }
    }
}
