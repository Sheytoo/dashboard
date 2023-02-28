package eu.epitech.foot2rue.dashboardapi.dto.user;

import eu.epitech.foot2rue.dashboardapi.model.Role;
import lombok.Data;

import java.util.Set;

@Data
public class UserDto {

    private Integer id;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private Set<Role> roles;
}