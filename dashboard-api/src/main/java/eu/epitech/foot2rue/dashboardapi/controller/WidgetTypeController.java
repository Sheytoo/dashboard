package eu.epitech.foot2rue.dashboardapi.controller;

import eu.epitech.foot2rue.dashboardapi.dto.ErrorDto;
import eu.epitech.foot2rue.dashboardapi.dto.widgetType.InputWidgetTypeDto;
import eu.epitech.foot2rue.dashboardapi.dto.widgetType.WidgetTypeDto;
import eu.epitech.foot2rue.dashboardapi.model.WidgetType;
import eu.epitech.foot2rue.dashboardapi.service.WidgetTypeService;
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

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/widgetType")
@Api(tags = {"WidgetType"})
public class WidgetTypeController {

    @Autowired
    private ModelMapper modelMapper;

    private final WidgetTypeService widgetTypeService;

    public WidgetTypeController(WidgetTypeService widgetTypeService) {
        this.widgetTypeService = widgetTypeService;
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping
    @ApiOperation("Get all widgetType")
    public List<WidgetTypeDto> getAllWidgetTypes() {
        return widgetTypeService.findAll().stream().map(widgetType -> modelMapper.map(widgetType, WidgetTypeDto.class)).collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    @ApiOperation("Get widgetType by id")
    @ApiResponse(code = 404, message = "WidgetType not found", response = ErrorDto.class)
    public WidgetTypeDto getWidgetTypeById(@PathVariable Integer id) {
        return modelMapper.map(widgetTypeService.findById(id), WidgetTypeDto.class);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    @ApiOperation("Create a widgetType")
    @ApiResponses({
            @ApiResponse(code = 400, message = "Fields validation failed", response = ErrorDto.class),
            @ApiResponse(code = 409, message = "WidgetType already exists", response = ErrorDto.class)
    })
    public WidgetTypeDto createWidgetType(@RequestBody @Valid InputWidgetTypeDto inputWidgetTypeDto) {
        WidgetType widgetType = modelMapper.map(inputWidgetTypeDto, WidgetType.class);
        return modelMapper.map(widgetTypeService.create(widgetType), WidgetTypeDto.class);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/{id}")
    @ApiOperation("Update a widgetType")
    @ApiResponses({
            @ApiResponse(code = 400, message = "Fields validation failed", response = ErrorDto.class),
            @ApiResponse(code = 404, message = "WidgetType not found", response = ErrorDto.class),
            @ApiResponse(code = 409, message = "WidgetType already exists", response = ErrorDto.class)
    })
    public WidgetTypeDto updateWidgetType(@PathVariable Integer id, @RequestBody InputWidgetTypeDto inputWidgetTypeDto) {
        WidgetType widgetType = modelMapper.map(inputWidgetTypeDto, WidgetType.class);
        return modelMapper.map(widgetTypeService.update(id, widgetType), WidgetTypeDto.class);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    @ApiOperation("Delete a widgetType")
    @ApiResponse(code = 404, message = "WidgetType not found", response = ErrorDto.class)
    public WidgetTypeDto deleteWidgetType(@PathVariable Integer id) {
        return modelMapper.map(widgetTypeService.delete(id), WidgetTypeDto.class);
    }
}
