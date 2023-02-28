package eu.epitech.foot2rue.dashboardapi.dto.service;

import lombok.Data;

@Data
public class ServiceDto {

    private Integer id;
    private String name;
    private String label;
    private String description;
    private String imageUrl;
}
