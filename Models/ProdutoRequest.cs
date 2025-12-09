namespace SnackBar_system.Models;

public record ProdutoRequest(
    string nome,
    string categoria,
    double preco,
    int quantidadeTotal,
    int quantidadeDisponivel,
    int quantidadeReserva
);

public record ReservaRequest(
    Guid produtoId,
    Guid usuarioId,
    int quantidade,
    string tipo = "Reserva"
);