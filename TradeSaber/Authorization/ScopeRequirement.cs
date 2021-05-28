using Microsoft.AspNetCore.Authorization;
using System;

namespace TradeSaber.Authorization
{
    public class ScopeRequirement : IAuthorizationRequirement
    {
        public string Scope { get; }

        public ScopeRequirement(string scope)
        {
            Scope = scope ?? throw new ArgumentNullException(nameof(scope));
        }
    }
}