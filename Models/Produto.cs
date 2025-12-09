namespace SnackBar_system.Models;

    public class Produto
{
    public Produto(string nome, string categoria, double preco, int quantidadeTotal, int quantidadeDisponivel, int quantidadeReserva)
    {
        Id = Guid.NewGuid();
        Nome = nome;
        Categoria = categoria;
        Preco = preco;
        QuantidadeTotal = quantidadeTotal;
        QuantidadeDisponivel = quantidadeDisponivel;
        QuantidadeReserva = QuantidadeReserva;
    }

    public Guid Id { get; init; }
    public string Nome { get; set; }
    public string Categoria { get; set; }
    public double Preco { get; set; }
    public int QuantidadeTotal { get; set; }
    public int QuantidadeDisponivel { get; set; }
    public int QuantidadeReserva { get; set; }

        public void AdicionarEstoque(int qty)
    {
        QuantidadeTotal += qty;
    }

    public void RegistrarVenda(int qty)
    {
        QuantidadeDisponivel -= qty;
    }

    public void ReservarProduto(int qty)
    {
        QuantidadeDisponivel -= qty;
        QuantidadeReserva += qty;
    }
}