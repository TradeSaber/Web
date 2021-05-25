using Blazored.LocalStorage;
using System.Threading.Tasks;
using TradeSaber.Interfaces;
using TradeSaberSharp;

namespace TradeSaber.Services
{
    public class LocalUserService : ILocalUserService
    {
        private const string _tokenKey = "token";
        private readonly TradeSaberClient _tradeSaberClient;
        private readonly ILocalStorageService _localStorageService;

        public LocalUserService(TradeSaberClient tradeSaberClient, ILocalStorageService localStorageService)
        {
            _tradeSaberClient = tradeSaberClient;
            _localStorageService = localStorageService;
        }

        public async Task<string?> GetToken()
        {
            string? token = await _localStorageService.GetItemAsync<string>(_tokenKey);
            _tradeSaberClient.Token = token;
            return token;
        }

        public async Task SetToken(string? token)
        {
            if (token is null)
            {
                await _localStorageService.RemoveItemAsync(_tokenKey);
                return;
            }
            await _localStorageService.SetItemAsync(_tokenKey, token);
            _tradeSaberClient.Token = await GetToken();
        }
    }
}