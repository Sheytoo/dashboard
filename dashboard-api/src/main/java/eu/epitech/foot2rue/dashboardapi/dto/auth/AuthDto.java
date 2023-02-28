package eu.epitech.foot2rue.dashboardapi.dto.auth;

import lombok.Data;

import java.util.List;

@Data
public class AuthDto {

    private String token;
    private Integer id;
    private String email;
    private String firstName;
    private String lastName;
    private List<String> roles;
}