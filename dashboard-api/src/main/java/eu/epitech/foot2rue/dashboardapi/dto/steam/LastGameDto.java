package eu.epitech.foot2rue.dashboardapi.dto.steam;

import lombok.Data;

@Data
public class LastGameDto {

    private Integer appid;
    private String name;
    private String iconUrl;
    private Integer playtime2weeks;
    private Integer playtimeForever;
    private String username;
}
