using Blazored.LocalStorage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using MudBlazor;
using MudBlazor.Services;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using TradeSaber.Authorization;
using TradeSaber.Interfaces;
using TradeSaber.Services;
using TradeSaber.Settings;
using TradeSaberSharp;
using TradeSaberSharp.Core;
using TradeSaberSharp.Json;

namespace TradeSaber
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            ISerializer serializer = new SystemTextJsonSerializer(new JsonSerializerOptions(JsonSerializerDefaults.Web));

            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");

            builder.Services.AddBlazoredLocalStorage();
            builder.Services.AddMudServices(config =>
            {
                config.SnackbarConfiguration.PositionClass = Defaults.Classes.Position.BottomLeft;
                config.SnackbarConfiguration.PreventDuplicates = true;
                config.SnackbarConfiguration.SnackbarVariant = Variant.Filled;
                config.SnackbarConfiguration.ShowTransitionDuration = 250;
                config.SnackbarConfiguration.HideTransitionDuration = 250;
                config.SnackbarConfiguration.VisibleStateDuration = 7500;
            });

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
            builder.Services.AddScoped<ILocalUserService, LocalUserService>();
            builder.Services.ConstructSetting<IURLSettings, URLSettings>(builder.Configuration);
            builder.Services.AddScoped(sp => new TradeSaberClient(builder.Configuration["URLSettings:API"], serializer, new HttpClientHttpService(new HttpClient(), serializer)));

            builder.Services.AddAuthorizationCore(options =>
            {
                Array.ForEach(Scopes.AllScopes, scope =>
                    options.AddPolicy(scope,
                        policy => policy.Requirements.Add(new ScopeRequirement(scope))));
            });
            builder.Services.AddScoped<IAuthorizationHandler, RequireScopeHandler>();
            builder.Services.AddScoped<AuthenticationStateProvider, TradeAuthStateProvider>();

            await builder.Build().RunAsync();
        }

    }
}