package eu.epitech.foot2rue.dashboardapi.service;

import eu.epitech.foot2rue.dashboardapi.dto.me.InputWidgetMeDto;
import eu.epitech.foot2rue.dashboardapi.dto.service.ServiceDto;
import eu.epitech.foot2rue.dashboardapi.dto.user.UserDto;
import eu.epitech.foot2rue.dashboardapi.dto.widget.WidgetDto;

import java.util.List;

public interface MeService {

    UserDto me();

    List<ServiceDto> subscribeToService(Integer serviceId);

    List<ServiceDto> unsubscribeFromService(Integer serviceId);

    List<ServiceDto> findAllSubscribedServices();

    List<WidgetDto> findAllWidgets();

    WidgetDto createWidget(InputWidgetMeDto inputWidgetMeDto);

}
