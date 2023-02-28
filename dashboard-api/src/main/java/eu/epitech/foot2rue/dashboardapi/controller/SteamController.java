package eu.epitech.foot2rue.dashboardapi.controller;

import eu.epitech.foot2rue.dashboardapi.dto.steam.LastGameDto;
import eu.epitech.foot2rue.dashboardapi.dto.steam.SteamLookupDto;
import eu.epitech.foot2rue.dashboardapi.service.SteamService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/steam")
@Api(tags = {"Steam"})
public class SteamController {

    private final SteamService steamService;

    public SteamController(SteamService steamService) {
        this.steamService = steamService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @GetMapping("/lastgame/{steamId}")
    @ApiOperation("Get last game played")
    @ApiResponse(code = 400, message = "Steam ID is not valid", response = Error.class)
    public LastGameDto getLastGame(@PathVariable String steamId) {
        return steamService.getLastGame(steamId);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @GetMapping("/lookup/{identifier}")
    @ApiOperation("Get steam lookup")
    @ApiResponse(code = 400, message = "Steam ID is not valid", response = Error.class)
    public SteamLookupDto getSteamLookup(@PathVariable String identifier) {
        return steamService.getSteamLookup(identifier);
    }

}
