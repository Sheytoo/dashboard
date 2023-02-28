package eu.epitech.foot2rue.dashboardapi.dto.widget;

import eu.epitech.foot2rue.dashboardapi.validation.annotation.ExistsWidgetType;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class InputWidgetDto {

    @NotBlank(message = "{validation.widget.parameters.notBlank}")
    private String parameters;

    @NotNull(message = "{validation.widget.type.notNull}")
    @ExistsWidgetType(message = "{validation.widget.type.exists}")
    private Integer typeId;

    @NotNull(message = "{validation.widget.user.notNull}")
    private Integer userId;
}
