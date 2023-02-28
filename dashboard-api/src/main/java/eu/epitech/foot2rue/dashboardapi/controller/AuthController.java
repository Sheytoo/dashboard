package eu.epitech.foot2rue.dashboardapi.controller;

import eu.epitech.foot2rue.dashboardapi.dto.ErrorDto;
import eu.epitech.foot2rue.dashboardapi.dto.auth.AuthDto;
import eu.epitech.foot2rue.dashboardapi.dto.auth.CredentialsDto;
import eu.epitech.foot2rue.dashboardapi.dto.auth.RegisterDto;
import eu.epitech.foot2rue.dashboardapi.service.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Api(tags = {"Auth"})
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    @ApiOperation("Register new user")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Fields validation failed", response = ErrorDto.class),
            @ApiResponse(code = 409, message = "User already exists", response = ErrorDto.class)
    })
    public AuthDto register(@RequestBody @Valid RegisterDto registerDto) {
        return authService.register(registerDto);
    }

    @PostMapping("/login")
    @ApiOperation("Login user")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Fields validation failed", response = ErrorDto.class),
            @ApiResponse(code = 500, message = "Bad credentials", response = ErrorDto.class)
    })
    public AuthDto login(@RequestBody @Valid CredentialsDto registerDto) {
        return authService.login(registerDto.getEmail(), registerDto.getPassword());
    }
}
