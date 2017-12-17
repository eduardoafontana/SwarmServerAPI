namespace SwarmServerAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class First : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Breakpoints",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BreakpointKind = c.String(),
                        Namespace = c.String(),
                        Type = c.String(),
                        LineNumber = c.Int(nullable: false),
                        LineOfCode = c.String(),
                        Origin = c.String(),
                        Created = c.DateTime(nullable: false),
                        Session_Identifier = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Sessions", t => t.Session_Identifier)
                .Index(t => t.Session_Identifier);
            
            CreateTable(
                "dbo.Sessions",
                c => new
                    {
                        Identifier = c.Guid(nullable: false),
                        Id = c.Int(nullable: false),
                        Label = c.String(),
                        Description = c.String(),
                        Purpose = c.String(),
                        Started = c.DateTime(nullable: false),
                        Finished = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Identifier);
            
            CreateTable(
                "dbo.Table",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Chave = c.String(unicode: false),
                        Valor = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Breakpoints", "Session_Identifier", "dbo.Sessions");
            DropIndex("dbo.Breakpoints", new[] { "Session_Identifier" });
            DropTable("dbo.Table");
            DropTable("dbo.Sessions");
            DropTable("dbo.Breakpoints");
        }
    }
}
