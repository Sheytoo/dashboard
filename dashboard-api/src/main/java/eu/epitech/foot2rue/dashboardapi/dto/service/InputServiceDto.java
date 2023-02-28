package eu.epitech.foot2rue.dashboardapi.dto.service;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class InputServiceDto {

    @NotBlank(message = "{validation.service.name.notBlank}")
    @Length(max = 255, message = "{validation.service.name.length}")
    private String name;

    @NotBlank(message = "{validation.service.label.notBlank}")
    @Length(max = 255, message = "{validation.service.label.length}")
    private String label;

    @NotBlank(message = "{validation.service.description.notBlank}")
    @Length(max = 255, message = "{validation.service.description.length}")
    private String description;

    @NotBlank(message = "{validation.service.imageUrl.notBlank}")
    @Length(max = 255, message = "{validation.service.imageUrl.length}")
    @Pattern(regexp = "^(http|https)://.*", message = "{validation.service.imageUrl.pattern}")
    private String imageUrl;
}
