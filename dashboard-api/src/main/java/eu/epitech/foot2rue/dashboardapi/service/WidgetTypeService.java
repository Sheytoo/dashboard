package eu.epitech.foot2rue.dashboardapi.service;

import eu.epitech.foot2rue.dashboardapi.model.WidgetType;

import java.util.List;

public interface WidgetTypeService {

    List<WidgetType> findAll();

    WidgetType findById(Integer id);

    WidgetType create(WidgetType widgetType);

    WidgetType update(Integer id, WidgetType widgetType);

    WidgetType delete(Integer id);
}
