package eu.epitech.foot2rue.dashboardapi.service;

import eu.epitech.foot2rue.dashboardapi.dto.flight.FlightStatusDto;

import java.io.IOException;
import java.util.Date;

public interface FlightService {

    FlightStatusDto getFlightStatus(String flightNumber, String date);
}
