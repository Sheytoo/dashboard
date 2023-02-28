package eu.epitech.foot2rue.dashboardapi.dto.flight;

import lombok.Data;

@Data
public class FlightPointDto {

    private AirportDto airport;
    private String terminal;
    private String localTime;
    private String utcTime;
}
