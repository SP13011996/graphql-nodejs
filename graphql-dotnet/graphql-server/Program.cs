using Microsoft.EntityFrameworkCore;

/* var schema = Schema.For(@"
    type someObject{
        a : ID
    }
 
    type Query {
        hello: String,
        someObj : someObject
    }
");

var root = new { hello = "Hello World!", someObj = new { a = 1, b = "someName" } };
var json = await schema.ExecuteAsync(_ =>
{
    _.Query = "{ hello,someObj {a} }";
    _.Root = root;
});

Console.WriteLine(json); */

var builder = WebApplication.CreateBuilder(args);
{

}

builder.Services.AddScoped<ILoggedInUserService, LoggedInUserService>();

builder.Services.AddDbContext<DBContext>(options =>
{
    options.UseSqlite("Data Source=Todo.db");
});

builder.Services.AddControllers();


builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin",
            builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
    });

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>();

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

app.MapGraphQL();

app.Run();