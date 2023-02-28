package eu.epitech.foot2rue.dashboardapi.service.impl;

import eu.epitech.foot2rue.dashboardapi.dto.steam.LastGameDto;
import eu.epitech.foot2rue.dashboardapi.dto.steam.SteamLookupDto;
import eu.epitech.foot2rue.dashboardapi.exception.SteamIdInvalidException;
import eu.epitech.foot2rue.dashboardapi.service.SteamService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SteamServiceImpl implements SteamService {

    @Value("${steam.api.key}")
    private String apiKey;

    @Value("${steam.api.key.lookup}")
    private String apiKeyLookup;

    @Value("${steam.id64}")
    private String steamId64;

    @Override
    public LastGameDto getLastGame(String steamId) {
        if (steamId == null || steamId.isEmpty() || !steamId.matches("[0-9]{17}")) {
            throw new SteamIdInvalidException();
        }

        final String url = "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" + apiKey + "&steamid=" + steamId + "&format=json";
        final String urlUser = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + apiKey + "&steamids=" + steamId;

        try {
            RestTemplate restTemplate = new RestTemplate();
            String result = restTemplate.getForObject(url, String.class);
            JSONObject json = new JSONObject(result);
            String resultUser = restTemplate.getForObject(urlUser, String.class);
            JSONObject jsonUser = new JSONObject(resultUser);

            LastGameDto lastGameDto = new LastGameDto();
            lastGameDto.setAppid(json.getJSONObject("response").getJSONArray("games").getJSONObject(0).getInt("appid"));
            lastGameDto.setName(json.getJSONObject("response").getJSONArray("games").getJSONObject(0).getString("name"));
            lastGameDto.setIconUrl("https://cdn.cloudflare.steamstatic.com/steam/apps/" + lastGameDto.getAppid() + "/header.jpg");
            lastGameDto.setPlaytime2weeks(json.getJSONObject("response").getJSONArray("games").getJSONObject(0).getInt("playtime_2weeks"));
            lastGameDto.setPlaytimeForever(json.getJSONObject("response").getJSONArray("games").getJSONObject(0).getInt("playtime_forever"));
            lastGameDto.setUsername(jsonUser.getJSONObject("response").getJSONArray("players").getJSONObject(0).getString("personaname"));

            return lastGameDto;
        } catch (Exception e) {
            throw new SteamIdInvalidException();
        }
    }

    @Override
    public SteamLookupDto getSteamLookup(String identifier) {
        if (identifier == null || identifier.isEmpty()) {
            throw new SteamIdInvalidException();
        }

        RestTemplate restTemplate = new RestTemplate();
        String steamId = identifier;

        if (!identifier.matches("[0-9]{17}") && !identifier.matches("\\[U:[0-9]:[0-9]+\\]") && !identifier.matches("STEAM_[0-9]:[0-9]:[0-9]+")) {
            final String url = "https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" + apiKey + "&vanityurl=" + identifier;
            String result = restTemplate.getForObject(url, String.class);
            JSONObject json = new JSONObject(result);
            steamId = json.getJSONObject("response").getString("steamid");
        }

        final String urlLookup = "https://steamidapi.uk/v2/convert.php?myid=" + steamId64 + "&apikey=" + apiKeyLookup + "&input=" + steamId;
        String resultLookup = restTemplate.getForObject(urlLookup, String.class);
        JSONObject jsonLookup = new JSONObject(resultLookup);

        final String url = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + apiKey + "&steamids=" + jsonLookup.getJSONObject("converted").getString("steamid64");
        String result = restTemplate.getForObject(url, String.class);
        JSONObject json = new JSONObject(result);

        SteamLookupDto steamLookupDto = new SteamLookupDto();
        steamLookupDto.setSteamId64(jsonLookup.getJSONObject("converted").getString("steamid64"));
        steamLookupDto.setSteamId(jsonLookup.getJSONObject("converted").getString("steamid"));
        steamLookupDto.setSteamId3(jsonLookup.getJSONObject("converted").getString("steam3"));
        steamLookupDto.setProfileUrl(json.getJSONObject("response").getJSONArray("players").getJSONObject(0).getString("profileurl"));
        steamLookupDto.setAvatar(json.getJSONObject("response").getJSONArray("players").getJSONObject(0).getString("avatarfull"));
        steamLookupDto.setUsername(json.getJSONObject("response").getJSONArray("players").getJSONObject(0).getString("personaname"));
        steamLookupDto.setCreatedTimestamp(json.getJSONObject("response").getJSONArray("players").getJSONObject(0).getBigInteger("timecreated"));
        steamLookupDto.setLastLogOffTimestamp(json.getJSONObject("response").getJSONArray("players").getJSONObject(0).getBigInteger("lastlogoff"));
        return steamLookupDto;
    }
}
