using System;
using System.Threading.Tasks;
using TradeSaberSharp.Models;

namespace TradeSaber.Interfaces
{
    public interface ILocalUserService
    {
        User? ActiveUser { get; }
        Action? OnUpdate { set; }

        Task SetToken(string? token);
        Task<string?> GetToken();
    }
}