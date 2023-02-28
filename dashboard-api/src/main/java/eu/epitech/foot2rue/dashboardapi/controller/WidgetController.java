package eu.epitech.foot2rue.dashboardapi.controller;

import eu.epitech.foot2rue.dashboardapi.dto.ErrorDto;
import eu.epitech.foot2rue.dashboardapi.dto.widget.InputWidgetDto;
import eu.epitech.foot2rue.dashboardapi.dto.widget.WidgetDto;
import eu.epitech.foot2rue.dashboardapi.model.Widget;
import eu.epitech.foot2rue.dashboardapi.service.WidgetService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
@RequestMapping("/api/widgets")
@Api(tags = {"Widget"})
public class WidgetController {

    private final WidgetService widgetService;

    public WidgetController(WidgetService widgetService) {
        this.widgetService = widgetService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    @ApiOperation("Get all widgets")
    public List<WidgetDto> getAllWidgets() {
        return widgetService.findAll();
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    @ApiOperation("Get widget by id")
    @ApiResponse(code = 404, message = "Widget not found", response = ErrorDto.class)
    public WidgetDto getWidgetById(@PathVariable Integer id) {
        return widgetService.findById(id);
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @PostMapping
    @ApiOperation("Create widget")
    @ApiResponse(code = 400, message = "Fields validation failed", response = ErrorDto.class)
    public WidgetDto createWidget(@RequestBody @Valid InputWidgetDto widgetDto) {
        return widgetService.create(widgetDto);
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @PatchMapping("/{id}")
    @ApiOperation("Update widget")
    @ApiResponses({
            @ApiResponse(code = 400, message = "Fields validation failed", response = ErrorDto.class),
            @ApiResponse(code = 404, message = "Widget not found", response = ErrorDto.class)
    })
    public WidgetDto updateWidget(@PathVariable Integer id, @RequestBody InputWidgetDto widgetDto) {
        return widgetService.update(id, widgetDto);
    }

    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    @ApiOperation("Delete widget")
    @ApiResponse(code = 404, message = "Widget not found", response = ErrorDto.class)
    public WidgetDto deleteWidget(@PathVariable Integer id) {
        return widgetService.delete(id);
    }

}
