package eu.epitech.foot2rue.dashboardapi.service;

import eu.epitech.foot2rue.dashboardapi.dto.steam.LastGameDto;
import eu.epitech.foot2rue.dashboardapi.dto.steam.SteamLookupDto;

public interface SteamService {

    LastGameDto getLastGame(String steamId);

    SteamLookupDto getSteamLookup(String identifier);
}
