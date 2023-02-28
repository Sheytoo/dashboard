package eu.epitech.foot2rue.dashboardapi.service;

import eu.epitech.foot2rue.dashboardapi.model.Service;
import eu.epitech.foot2rue.dashboardapi.model.Widget;
import eu.epitech.foot2rue.dashboardapi.model.WidgetType;

import java.util.List;

public interface ServiceService {

    List<Service> findAll();

    Service findById(Integer id);

    Service create(Service service);

    Service update(Integer id, Service service);

    void delete(Integer id);

    List<WidgetType> findWidgetTypesByServiceId(Integer id);
}
