package eu.epitech.foot2rue.dashboardapi.controller;

import eu.epitech.foot2rue.dashboardapi.dto.ErrorDto;
import eu.epitech.foot2rue.dashboardapi.dto.user.InputUserDto;
import eu.epitech.foot2rue.dashboardapi.dto.user.UserDto;
import eu.epitech.foot2rue.dashboardapi.model.User;
import eu.epitech.foot2rue.dashboardapi.repository.RoleRepository;
import eu.epitech.foot2rue.dashboardapi.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@Api(tags = {"User"})
public class UserController {

    @Autowired
    private ModelMapper modelMapper;

    private final UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    @ApiOperation("Get all users")
    public List<UserDto> getAllUsers() {
        return userService.findAll().stream().map(user -> modelMapper.map(user, UserDto.class)).collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    @ApiOperation("Get user by id")
    @ApiResponse(code = 404, message = "User not found", response = ErrorDto.class)
    public UserDto getUserById(@PathVariable Integer id) {
        return modelMapper.map(userService.findById(id), UserDto.class);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation("Create new user")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Fields validation failed", response = ErrorDto.class),
            @ApiResponse(code = 409, message = "Email already exists", response = ErrorDto.class)
    })
    public UserDto createUser(@RequestBody @Valid InputUserDto userDto) {
        User user = modelMapper.map(userDto, User.class);
        user.setRoles(userDto.getRoles().stream().map(role -> roleRepository.findByName(role)).collect(Collectors.toSet()));
        return modelMapper.map(userService.create(user), UserDto.class);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or #id == authentication.principal.id")
    @PatchMapping("/{id}")
    @ApiOperation("Update user by id")
    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Fields validation failed", response = ErrorDto.class),
            @ApiResponse(code = 404, message = "User not found", response = ErrorDto.class),
            @ApiResponse(code = 409, message = "Email already exists", response = ErrorDto.class)
    })
    public UserDto updateUser(@PathVariable Integer id, @RequestBody InputUserDto userDto) {
        User user = modelMapper.map(userDto, User.class);
        if (userDto.getRoles() != null) {
            user.setRoles(userDto.getRoles().stream().map(role -> roleRepository.findByName(role)).collect(Collectors.toSet()));
        }
        return modelMapper.map(userService.update(id, user), UserDto.class);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    @ApiOperation("Delete user by id")
    @ApiResponse(code = 404, message = "User not found", response = ErrorDto.class)
    public UserDto deleteUser(@PathVariable Integer id) {
        return modelMapper.map(userService.delete(id), UserDto.class);
    }

}