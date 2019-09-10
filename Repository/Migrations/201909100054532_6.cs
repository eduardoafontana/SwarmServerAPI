namespace SwarmServerAPI.AppCore.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _6 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PharoSessions", "Started", c => c.DateTime(nullable: false));
            AddColumn("dbo.PharoSessions", "Finished", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.PharoSessions", "Finished");
            DropColumn("dbo.PharoSessions", "Started");
        }
    }
}
