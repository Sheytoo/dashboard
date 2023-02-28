package eu.epitech.foot2rue.dashboardapi.controller;

import eu.epitech.foot2rue.dashboardapi.dto.ErrorDto;
import eu.epitech.foot2rue.dashboardapi.dto.me.InputWidgetMeDto;
import eu.epitech.foot2rue.dashboardapi.dto.service.ServiceDto;
import eu.epitech.foot2rue.dashboardapi.dto.user.UserDto;
import eu.epitech.foot2rue.dashboardapi.dto.widget.InputWidgetDto;
import eu.epitech.foot2rue.dashboardapi.dto.widget.WidgetDto;
import eu.epitech.foot2rue.dashboardapi.service.MeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/me")
@Api(tags = {"Me"})
public class MeController {

    @Autowired
    private MeService meService;

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping
    @ApiOperation("Get the current user")
    public UserDto getMe() {
        return meService.me();
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @PostMapping("/subscribe/{serviceId}")
    @ApiOperation("Subscribe to a service")
    @ApiResponses({
            @ApiResponse(code = 404, message = "Service not found", response = ErrorDto.class),
            @ApiResponse(code = 409, message = "User already subscribed to this service", response = ErrorDto.class)
    })
    public List<ServiceDto> subscribeToService(@PathVariable Integer serviceId) {
        return meService.subscribeToService(serviceId);
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @DeleteMapping("/unsubscribe/{serviceId}")
    @ApiOperation("Unsubscribe from a service")
    @ApiResponses({
            @ApiResponse(code = 404, message = "Service not found", response = ErrorDto.class),
            @ApiResponse(code = 409, message = "User not subscribed to this service", response = ErrorDto.class)
    })
    public List<ServiceDto> unsubscribeFromService(@PathVariable Integer serviceId) {
        return meService.unsubscribeFromService(serviceId);
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/services")
    @ApiOperation("Get all subscribed services")
    public List<ServiceDto> getAllSubscribedServices() {
        return meService.findAllSubscribedServices();
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/widgets")
    @ApiOperation("Get all widgets")
    public List<WidgetDto> getAllWidgets() {
        return meService.findAllWidgets();
    }


    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @PostMapping("/widget")
    @ApiOperation("Create a widget")
    @ApiResponses({
            @ApiResponse(code = 404, message = "Resource not found", response = ErrorDto.class),
            @ApiResponse(code = 409, message = "User not subscribed to the service", response = ErrorDto.class)
    })
    public WidgetDto createWidget(@Valid @RequestBody InputWidgetMeDto inputWidgetMeDto) {
        return meService.createWidget(inputWidgetMeDto);
    }

}
