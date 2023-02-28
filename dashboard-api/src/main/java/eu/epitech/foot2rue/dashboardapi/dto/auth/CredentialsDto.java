package eu.epitech.foot2rue.dashboardapi.dto.auth;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class CredentialsDto {

    @NotBlank(message = "{validation.user.email.notBlank}")
    @Email(message = "{validation.user.email.pattern}")
    @Length(max = 255, message = "{validation.user.email.length}")
    private String email;

    @NotBlank(message = "{validation.user.password.notBlank}")
    @Length(min = 4, max = 255, message = "{validation.user.password.length}")
    private String password;

}
