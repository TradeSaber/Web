using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
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

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
            builder.Services.AddScoped<ILocalUserService, LocalUserService>();
            builder.Services.ConstructSetting<IURLSettings, URLSettings>(builder.Configuration);
            builder.Services.AddScoped(sp => new TradeSaberClient(builder.Configuration["URLSettings:API"], serializer, new HttpClientHttpService(new HttpClient(), serializer)));

            await builder.Build().RunAsync();
        }

    }
}