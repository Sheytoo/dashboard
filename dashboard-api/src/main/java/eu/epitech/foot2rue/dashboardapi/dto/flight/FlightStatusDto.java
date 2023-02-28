package eu.epitech.foot2rue.dashboardapi.dto.flight;

import lombok.Data;

@Data
public class FlightStatusDto {

    private String flightNumber;
    private String airline;
    private String aircraftModel;
    private FlightPointDto departure;
    private FlightPointDto arrival;

}
