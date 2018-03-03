namespace SwarmServerAPI.AppCore.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Second : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Breakpoints", "LineNumber", c => c.Int());
            AlterColumn("dbo.Sessions", "Finished", c => c.DateTime());
            DropColumn("dbo.Sessions", "Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Sessions", "Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Sessions", "Finished", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Breakpoints", "LineNumber", c => c.Int(nullable: false));
        }
    }
}
