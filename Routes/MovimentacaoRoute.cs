using Microsoft.EntityFrameworkCore;
using SnackBar_system.Data;
using SnackBar_system.Models;

namespace SnackBar_system;

public static class MovimentacaoRoute
{
    public static void MovimentacoesRoute(this WebApplication app)
    {
        var route = app.MapGroup("movimentacoes");

        //registrar entrada
        app.MapPost("/movimentacoes",
        async(SnackBarContext context) =>
        {
            var
        });
    }
}