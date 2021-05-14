using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace TradeSaber
{
    public static class Utilities
    {
        public static IServiceCollection ConstructSetting<TSettingsInterface, TSettingsModel>(this IServiceCollection services, IConfiguration configuration, string? name = null) where TSettingsModel : class, TSettingsInterface where TSettingsInterface : class
        {
            services.Configure<TSettingsModel>(configuration.GetSection(name ?? typeof(TSettingsModel).Name));
            services.AddSingleton<TSettingsInterface>(sp => sp.GetRequiredService<IOptions<TSettingsModel>>().Value);
            return services;
        }

        public static bool TryGetQueryString<T>(this NavigationManager navManager, string key, out T value)
        {
            var uri = navManager.ToAbsoluteUri(navManager.Uri);
            if (QueryHelpers.ParseQuery(uri.Query).TryGetValue(key, out var valueFromQueryString))
            {
                if (typeof(T) == typeof(int) && int.TryParse(valueFromQueryString, out var valueAsInt))
                {
                    value = (T)(object)valueAsInt;
                    return true;
                }

                if (typeof(T) == typeof(string))
                {
                    value = (T)(object)valueFromQueryString.ToString();
                    return true;
                }

                if (typeof(T) == typeof(decimal) && decimal.TryParse(valueFromQueryString, out var valueAsDecimal))
                {
                    value = (T)(object)valueAsDecimal;
                    return true;
                }
            }
            value = default!;
            return false;
        }
    }
}