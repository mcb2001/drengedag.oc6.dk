namespace Oc6.Bold.Models
{
    public interface IPlayer
    {
        string Auth0UserId { get; }
        string Email { get; }
        int Id { get; }
        string Name { get; }
    }
}