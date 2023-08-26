using Microsoft.EntityFrameworkCore;

public class DBContext : DbContext{

    public DbSet<User> users {get;set;}=null!;
    public DBContext(DbContextOptions<DBContext> dbContextOptions):base(dbContextOptions)
    {
        
    }
    
}