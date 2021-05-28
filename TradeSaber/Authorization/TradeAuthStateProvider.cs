using Microsoft.AspNetCore.Components.Authorization;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using TradeSaber.Interfaces;

namespace TradeSaber.Authorization
{
    public class TradeAuthStateProvider : AuthenticationStateProvider
    {
        private readonly ILocalUserService _localUserService;

        public TradeAuthStateProvider(ILocalUserService localUserService)
        {
            _localUserService = localUserService;
            _localUserService.OnUpdate = () => NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());

        }

        public override Task<AuthenticationState> GetAuthenticationStateAsync()
        {
            Console.WriteLine("hello yes i am being checked");
            var identity = new ClaimsIdentity(_localUserService.ActiveUser is null ? null : "Bearer");
            if (_localUserService.ActiveUser is not null && _localUserService.ActiveUser.Role is not null)
            {
                Console.WriteLine("hello yes the user has a role");
                foreach (var scope in _localUserService.ActiveUser.Role.Scopes)
                    identity.AddClaim(new Claim("scope", scope));
            }
            return Task.FromResult(new AuthenticationState(new ClaimsPrincipal(identity)));
        }
    }
}