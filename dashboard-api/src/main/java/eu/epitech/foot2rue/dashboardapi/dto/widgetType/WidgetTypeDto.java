package eu.epitech.foot2rue.dashboardapi.dto.widgetType;

import eu.epitech.foot2rue.dashboardapi.model.Service;
import lombok.Data;

@Data
public class WidgetTypeDto {

    private Integer id;
    private String name;
    private String label;
    private Service service;
}
