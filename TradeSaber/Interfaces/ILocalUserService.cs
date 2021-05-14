using System.Threading.Tasks;

namespace TradeSaber.Interfaces
{
    public interface ILocalUserService
    {
        Task SetToken(string? token);
        Task<string?> GetToken();
    }
}