using TradeSaber.Interfaces;

namespace TradeSaber.Settings
{
    public class URLSettings : IURLSettings
    {
        public string API { get; set; } = null!;
        public string Media { get; set; } = null!;
    }
}