package eu.epitech.foot2rue.dashboardapi.dto.widgetType;

import eu.epitech.foot2rue.dashboardapi.validation.annotation.ExistsService;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class InputWidgetTypeDto {

    @NotBlank(message = "{validation.widgetType.name.notBlank}")
    @Length(max = 255, message = "{validation.widgetType.name.length}")
    private String name;

    @NotBlank(message = "{validation.widgetType.label.notBlank}")
    @Length(max = 255, message = "{validation.widgetType.label.length}")
    private String label;

    @NotNull(message = "{validation.widgetType.service.notNull}")
    @ExistsService(message = "{validation.widgetType.service.exists}")
    private Integer serviceId;
}
