package eu.epitech.foot2rue.dashboardapi.service;

import eu.epitech.foot2rue.dashboardapi.dto.widget.InputWidgetDto;
import eu.epitech.foot2rue.dashboardapi.dto.widget.WidgetDto;

import java.util.List;

public interface WidgetService {

    List<WidgetDto> findAll();

    WidgetDto findById(Integer id);

    WidgetDto create(InputWidgetDto widget);

    WidgetDto update(Integer id, InputWidgetDto widget);

    WidgetDto delete(Integer id);
}
