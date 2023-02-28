package eu.epitech.foot2rue.dashboardapi.dto.auth;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
public class RegisterDto extends CredentialsDto {

    @NotBlank(message = "{validation.user.firstName.notBlank}")
    @Length(max = 255, message = "{validation.user.firstName.length}")
    private String firstName;

    @NotBlank(message = "{validation.user.lastName.notBlank}")
    @Length(max = 255, message = "{validation.user.lastName.length}")
    private String lastName;
}
