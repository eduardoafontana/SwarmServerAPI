namespace SwarmServerAPI.AppCore.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _2 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Sessions", "TaskCreated", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Sessions", "TaskCreated", c => c.DateTime(nullable: false));
        }
    }
}
