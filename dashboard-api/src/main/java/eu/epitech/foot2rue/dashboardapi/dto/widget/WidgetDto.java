package eu.epitech.foot2rue.dashboardapi.dto.widget;

import eu.epitech.foot2rue.dashboardapi.dto.user.UserDto;
import eu.epitech.foot2rue.dashboardapi.dto.widgetType.WidgetTypeDto;
import lombok.Data;

@Data
public class WidgetDto {

    private Integer id;
    private String parameters;
    private WidgetTypeDto type;
    private UserDto user;
}
