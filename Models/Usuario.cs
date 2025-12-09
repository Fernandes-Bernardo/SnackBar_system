namespace SnackBar_system.Models;

public class Usuario
{
    public Usuario(string nome, string email, string senha, string tipo)
    {
        Id = Guid.NewGuid();
        Nome = nome;
        Email = email;
        Senha = senha;
        Tipo = tipo;
    }

    public Guid Id { get; init; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }
    public string Tipo { get; set; }
}