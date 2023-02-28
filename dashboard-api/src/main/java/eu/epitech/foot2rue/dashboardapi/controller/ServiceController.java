package eu.epitech.foot2rue.dashboardapi.controller;

import eu.epitech.foot2rue.dashboardapi.dto.ErrorDto;
import eu.epitech.foot2rue.dashboardapi.dto.service.InputServiceDto;
import eu.epitech.foot2rue.dashboardapi.dto.service.ServiceDto;
import eu.epitech.foot2rue.dashboardapi.dto.widget.WidgetDto;
import eu.epitech.foot2rue.dashboardapi.dto.widgetType.WidgetTypeDto;
import eu.epitech.foot2rue.dashboardapi.model.Service;
import eu.epitech.foot2rue.dashboardapi.service.ServiceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/services")
@Api(tags = {"Service"})
public class ServiceController {

    @Autowired
    private ModelMapper modelMapper;

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping
    @ApiOperation("Get all services")
    public List<ServiceDto> getAllServices() {
        return serviceService.findAll().stream().map(service -> modelMapper.map(service, ServiceDto.class)).collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    @ApiOperation("Get service by id")
    @ApiResponse(code = 404, message = "Service not found", response = ErrorDto.class)
    public ServiceDto getServiceById(@PathVariable Integer id) {
        return modelMapper.map(serviceService.findById(id), ServiceDto.class);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    @ApiOperation("Create service")
    @ApiResponse(code = 400, message = "Fields validation failed", response = ErrorDto.class)
    public ServiceDto createService(@RequestBody InputServiceDto inputServiceDto) {
        Service service = modelMapper.map(inputServiceDto, Service.class);
        return modelMapper.map(serviceService.create(service), ServiceDto.class);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/{id}")
    @ApiOperation("Update service")
    @ApiResponses({
            @ApiResponse(code = 400, message = "Fields validation failed", response = ErrorDto.class),
            @ApiResponse(code = 404, message = "Service not found", response = ErrorDto.class)
    })
    public ServiceDto updateService(@PathVariable Integer id, @RequestBody InputServiceDto inputServiceDto) {
        Service service = modelMapper.map(inputServiceDto, Service.class);
        return modelMapper.map(serviceService.update(id, service), ServiceDto.class);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    @ApiOperation("Delete service")
    @ApiResponse(code = 404, message = "Service not found", response = ErrorDto.class)
    public void deleteService(@PathVariable Integer id) {
        serviceService.delete(id);
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}/widgetTypes")
    @ApiOperation("Get all widget types by service id")
    @ApiResponse(code = 404, message = "Service not found", response = ErrorDto.class)
    public List<WidgetTypeDto> getWidgetTypesByServiceId(@PathVariable Integer id) {
        return serviceService.findWidgetTypesByServiceId(id).stream().map(widgetType -> modelMapper.map(widgetType, WidgetTypeDto.class)).collect(Collectors.toList());
    }
}
