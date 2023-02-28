package eu.epitech.foot2rue.dashboardapi.dto.flight;

import lombok.Data;

@Data
public class AirportDto {

    private String code;
    private String name;
    private String city;
    private String countryCode;
}
