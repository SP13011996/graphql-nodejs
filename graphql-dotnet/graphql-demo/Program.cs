/* var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddGraphQLServer()
    .AddMutationType<Mutation>();

var app = builder.Build();

app.MapGraphQL();

app.Run(); */


    static IEnumerable<int> GenerateNumbers()
    {
        int number = 1;
        while (true)
        {
            Console.WriteLine($"Generating number: {number}");
            yield return number;
            number++;
        }
    }

    
        IEnumerable<int> numbers = GenerateNumbers();     

        var query = numbers.Where(n => n % 2 == 0).Take(5);
        Console.WriteLine(query);
        Console.ReadLine();
        
    
