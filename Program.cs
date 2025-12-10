using Microsoft.EntityFrameworkCore;
using SnackBar_system;
using SnackBar_system.Data;
using SnackBar_system.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SnackBarContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}

app.ProdutosRoutes();
app.UsuarioRoutes();
app.MovimentacoesRoute();

// estudar Migrations

app.UseHttpsRedirection();
app.Run();