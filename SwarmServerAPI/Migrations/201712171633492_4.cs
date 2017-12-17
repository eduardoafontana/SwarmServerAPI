namespace SwarmServerAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _4 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CodeMetrics",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Hash = c.String(),
                        MaintainabilityIndex = c.String(),
                        CyclomaticComplexity = c.String(),
                        ClassCoupling = c.String(),
                        LineOfCode = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Developers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Events",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
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
                        Session_Identifier = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Sessions", t => t.Session_Identifier)
                .Index(t => t.Session_Identifier);
            
            CreateTable(
                "dbo.PathNodeParameters",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        Name = c.String(),
                        Value = c.String(),
                        PathNode_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PathNodes", t => t.PathNode_Id)
                .Index(t => t.PathNode_Id);
            
            CreateTable(
                "dbo.PathNodes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Hash = c.String(),
                        Namespace = c.String(),
                        Type = c.String(),
                        Method = c.String(),
                        Parent = c.String(),
                        Origin = c.String(),
                        ReturnType = c.String(),
                        Created = c.DateTime(nullable: false),
                        MethodCodeMetric_Id = c.Int(),
                        Session_Identifier = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CodeMetrics", t => t.MethodCodeMetric_Id)
                .ForeignKey("dbo.Sessions", t => t.Session_Identifier)
                .Index(t => t.MethodCodeMetric_Id)
                .Index(t => t.Session_Identifier);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Tasks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Action = c.String(),
                        Created = c.DateTime(nullable: false),
                        Project_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Projects", t => t.Project_Id)
                .Index(t => t.Project_Id);
            
            AddColumn("dbo.Sessions", "Developer_Id", c => c.Int());
            AddColumn("dbo.Sessions", "Task_Id", c => c.Int());
            CreateIndex("dbo.Sessions", "Developer_Id");
            CreateIndex("dbo.Sessions", "Task_Id");
            AddForeignKey("dbo.Sessions", "Developer_Id", "dbo.Developers", "Id");
            AddForeignKey("dbo.Sessions", "Task_Id", "dbo.Tasks", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Sessions", "Task_Id", "dbo.Tasks");
            DropForeignKey("dbo.Tasks", "Project_Id", "dbo.Projects");
            DropForeignKey("dbo.PathNodes", "Session_Identifier", "dbo.Sessions");
            DropForeignKey("dbo.Events", "Session_Identifier", "dbo.Sessions");
            DropForeignKey("dbo.Sessions", "Developer_Id", "dbo.Developers");
            DropForeignKey("dbo.PathNodeParameters", "PathNode_Id", "dbo.PathNodes");
            DropForeignKey("dbo.PathNodes", "MethodCodeMetric_Id", "dbo.CodeMetrics");
            DropIndex("dbo.Tasks", new[] { "Project_Id" });
            DropIndex("dbo.Sessions", new[] { "Task_Id" });
            DropIndex("dbo.Sessions", new[] { "Developer_Id" });
            DropIndex("dbo.PathNodes", new[] { "Session_Identifier" });
            DropIndex("dbo.PathNodes", new[] { "MethodCodeMetric_Id" });
            DropIndex("dbo.PathNodeParameters", new[] { "PathNode_Id" });
            DropIndex("dbo.Events", new[] { "Session_Identifier" });
            DropColumn("dbo.Sessions", "Task_Id");
            DropColumn("dbo.Sessions", "Developer_Id");
            DropTable("dbo.Tasks");
            DropTable("dbo.Projects");
            DropTable("dbo.PathNodes");
            DropTable("dbo.PathNodeParameters");
            DropTable("dbo.Events");
            DropTable("dbo.Developers");
            DropTable("dbo.CodeMetrics");
        }
    }
}
