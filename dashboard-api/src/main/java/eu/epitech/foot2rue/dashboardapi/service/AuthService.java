package eu.epitech.foot2rue.dashboardapi.service;

import eu.epitech.foot2rue.dashboardapi.dto.auth.AuthDto;
import eu.epitech.foot2rue.dashboardapi.dto.auth.RegisterDto;

public interface AuthService {

    AuthDto login(String email, String password);

    AuthDto register(RegisterDto registerDto);
}