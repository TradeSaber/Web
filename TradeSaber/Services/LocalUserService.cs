using Blazored.LocalStorage;
using System.Threading.Tasks;
using TradeSaber.Interfaces;

namespace TradeSaber.Services
{
    public class LocalUserService : ILocalUserService
    {
        private const string _tokenKey = "token";
        private readonly ILocalStorageService _localStorageService;

        public LocalUserService(ILocalStorageService localStorageService)
        {
            _localStorageService = localStorageService;
        }

        public async Task<string?> GetToken()
        {
            return await _localStorageService.GetItemAsync<string>(_tokenKey);
        }

        public async Task SetToken(string? token)
        {
            if (token is null)
            {
                await _localStorageService.RemoveItemAsync(_tokenKey);
                return;
            }
            await _localStorageService.SetItemAsync(_tokenKey, token);
        }
    }
}