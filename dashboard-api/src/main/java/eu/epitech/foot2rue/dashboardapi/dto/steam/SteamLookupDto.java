package eu.epitech.foot2rue.dashboardapi.dto.steam;

import lombok.Data;

import java.math.BigInteger;

@Data
public class SteamLookupDto {

    private String steamId64;
    private String steamId;
    private String steamId3;
    private String profileUrl;
    private String avatar;
    private String username;
    private BigInteger createdTimestamp;
    private BigInteger lastLogOffTimestamp;
}
