package eu.epitech.foot2rue.dashboardapi.dto.user;

import eu.epitech.foot2rue.dashboardapi.model.ERole;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class InputUserDto {

    @NotBlank(message = "{validation.user.email.notBlank}")
    @Email(message = "{validation.user.email.pattern}")
    @Length(max = 255, message = "{validation.user.email.length}")
    private String email;

    @NotBlank(message = "{validation.user.firstName.notBlank}")
    @Length(max = 255, message = "{validation.user.firstName.length}")
    private String firstName;

    @NotBlank(message = "{validation.user.lastName.notBlank}")
    @Length(max = 255, message = "{validation.user.lastName.length}")
    private String lastName;

    @NotBlank(message = "{validation.user.password.notBlank}")
    @Length(min = 4, max = 255, message = "{validation.user.password.length}")
    private String password;

    @NotNull(message = "{validation.user.role.notBlank}")
    private List<ERole> roles;
}
