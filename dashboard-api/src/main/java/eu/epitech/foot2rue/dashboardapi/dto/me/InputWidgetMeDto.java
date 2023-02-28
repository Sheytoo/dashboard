package eu.epitech.foot2rue.dashboardapi.dto.me;

import eu.epitech.foot2rue.dashboardapi.validation.annotation.ExistsWidgetType;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class InputWidgetMeDto {

    @NotBlank(message = "{validation.widget.parameters.notBlank}")
    private String parameters;

    @NotNull(message = "{validation.widget.type.notNull}")
    @ExistsWidgetType(message = "{validation.widget.type.exists}")
    private Integer typeId;
}
