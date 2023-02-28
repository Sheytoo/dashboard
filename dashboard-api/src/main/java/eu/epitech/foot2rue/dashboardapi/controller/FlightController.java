package eu.epitech.foot2rue.dashboardapi.controller;

import eu.epitech.foot2rue.dashboardapi.dto.flight.FlightStatusDto;
import eu.epitech.foot2rue.dashboardapi.service.FlightService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping("/api/flight")
@Api(tags = {"Flight"})
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @GetMapping("/status")
    @ApiOperation("Get flight status for a flight number and a date")
    @ApiResponse(code = 400, message = "Illegal date format", response = Error.class)
    public FlightStatusDto getFlightStatus(@RequestParam String flightNumber, @RequestParam String date) {
        return flightService.getFlightStatus(flightNumber, date);
    }
}
