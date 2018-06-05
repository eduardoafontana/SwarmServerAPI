namespace SwarmServerAPI.AppCore.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _3 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CodeFiles",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Path = c.String(),
                        Content = c.String(),
                        Created = c.DateTime(nullable: false),
                        Session_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Sessions", t => t.Session_Id)
                .Index(t => t.Session_Id);
            
            AddColumn("dbo.Events", "CodeFilePath", c => c.String());
            AddColumn("dbo.Breakpoints", "CodeFilePath", c => c.String());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CodeFiles", "Session_Id", "dbo.Sessions");
            DropIndex("dbo.CodeFiles", new[] { "Session_Id" });
            DropColumn("dbo.Breakpoints", "CodeFilePath");
            DropColumn("dbo.Events", "CodeFilePath");
            DropTable("dbo.CodeFiles");
        }
    }
}
