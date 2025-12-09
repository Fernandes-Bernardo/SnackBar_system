using Microsoft.EntityFrameworkCore;
using SnackBar_system.Data;

namespace SnackBar_system;

public static class ProdutoRoute
{
    public static void ProdutosRoutes(this WebApplication app)
    {
        var route = app.MapGroup("produtos");

        app.MapGet("/produtos",
        async(SnackBarContext context) =>
        {
            var product = await context.Produtos.ToListAsync();
            return Results.Ok(product);
        });
    }
}