using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using TradeSaber.Interfaces;
using TradeSaber.Services;
using TradeSaber.Settings;

namespace TradeSaber
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");

            builder.Services.AddBlazoredLocalStorage();

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
            builder.Services.AddScoped<ILocalUserService, LocalUserService>();
            builder.Services.ConstructSetting<IURLSettings, URLSettings>(builder.Configuration);

            await builder.Build().RunAsync();
        }

    }
}