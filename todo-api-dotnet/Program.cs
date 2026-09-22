var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/todos", () =>
{
    return new[]
    {
        new Todo(1, "Viet", false),
        new Todo(2, "Learn .NET", true),
        new Todo(3, "Build Todo API", false)
    };
})
.WithName("GetTodos");

app.Run();

record Todo(int Id, string Name, bool Completed);
