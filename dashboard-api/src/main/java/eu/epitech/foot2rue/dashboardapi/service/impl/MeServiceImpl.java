package eu.epitech.foot2rue.dashboardapi.service.impl;

import eu.epitech.foot2rue.dashboardapi.dto.me.InputWidgetMeDto;
import eu.epitech.foot2rue.dashboardapi.dto.service.ServiceDto;
import eu.epitech.foot2rue.dashboardapi.dto.user.UserDto;
import eu.epitech.foot2rue.dashboardapi.dto.widget.InputWidgetDto;
import eu.epitech.foot2rue.dashboardapi.dto.widget.WidgetDto;
import eu.epitech.foot2rue.dashboardapi.exception.ResourceNotFoundException;
import eu.epitech.foot2rue.dashboardapi.exception.UserAlreadySubscribedException;
import eu.epitech.foot2rue.dashboardapi.exception.UserNotSubscribedException;
import eu.epitech.foot2rue.dashboardapi.model.Service;
import eu.epitech.foot2rue.dashboardapi.model.User;
import eu.epitech.foot2rue.dashboardapi.model.WidgetType;
import eu.epitech.foot2rue.dashboardapi.repository.ServiceRepository;
import eu.epitech.foot2rue.dashboardapi.repository.UserRepository;
import eu.epitech.foot2rue.dashboardapi.repository.WidgetRepository;
import eu.epitech.foot2rue.dashboardapi.repository.WidgetTypeRepository;
import eu.epitech.foot2rue.dashboardapi.service.MeService;
import eu.epitech.foot2rue.dashboardapi.service.WidgetService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class MeServiceImpl implements MeService {

    @Autowired
    private ModelMapper modelMapper;

    private final UserRepository userRepository;

    private final ServiceRepository serviceRepository;

    private final WidgetRepository widgetRepository;

    private final WidgetTypeRepository widgetTypeRepository;

    private final WidgetService widgetService;

    public MeServiceImpl(UserRepository userRepository, ServiceRepository serviceRepository, WidgetRepository widgetRepository, WidgetTypeRepository widgetTypeRepository, WidgetService widgetService) {
        this.userRepository = userRepository;
        this.serviceRepository = serviceRepository;
        this.widgetRepository = widgetRepository;
        this.widgetTypeRepository = widgetTypeRepository;
        this.widgetService = widgetService;
    }

    @Override
    public UserDto me() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return modelMapper.map(userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new ResourceNotFoundException("User")), UserDto.class);
    }

    @Override
    public List<ServiceDto> subscribeToService(Integer serviceId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new ResourceNotFoundException("User"));
        Service service = serviceRepository.findById(serviceId).orElseThrow(() -> new ResourceNotFoundException("Service"));
        if (user.getServices().contains(service)) {
            throw new UserAlreadySubscribedException();
        }
        user.getServices().add(service);
        userRepository.save(user);
        return findAllSubscribedServices();
    }

    @Override
    public List<ServiceDto> unsubscribeFromService(Integer serviceId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new ResourceNotFoundException("User"));
        Service service = serviceRepository.findById(serviceId).orElseThrow(() -> new ResourceNotFoundException("Service"));
        if (!user.getServices().contains(service)) {
            throw new UserNotSubscribedException();
        }
        user.getServices().remove(service);
        userRepository.save(user);
        widgetRepository.findAllByUserId(user.getId()).forEach(widget -> {
            if (widget.getType().getService().getId().equals(serviceId)) {
                widgetRepository.delete(widget);
            }
        });
        return findAllSubscribedServices();
    }

    @Override
    public List<ServiceDto> findAllSubscribedServices() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new ResourceNotFoundException("User"));
        List<Service> services = new ArrayList<>(user.getServices());
        return services.stream().map(service -> modelMapper.map(service, ServiceDto.class)).toList();
    }

    @Override
    public List<WidgetDto> findAllWidgets() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new ResourceNotFoundException("User"));
        return widgetRepository.findAllByUserId(user.getId()).stream().map(widget -> modelMapper.map(widget, WidgetDto.class)).toList();
    }

    @Override
    public WidgetDto createWidget(InputWidgetMeDto inputWidgetMeDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new ResourceNotFoundException("User"));
        WidgetType widgetType = widgetTypeRepository.findById(inputWidgetMeDto.getTypeId()).orElseThrow(() -> new ResourceNotFoundException("WidgetType"));
        Service service = serviceRepository.findById(widgetType.getService().getId()).orElseThrow(() -> new ResourceNotFoundException("Service"));
        if (!user.getServices().contains(service)) {
            throw new UserNotSubscribedException();
        }
        InputWidgetDto inputWidgetDto = new InputWidgetDto();
        inputWidgetDto.setParameters(inputWidgetMeDto.getParameters());
        inputWidgetDto.setTypeId(inputWidgetMeDto.getTypeId());
        inputWidgetDto.setUserId(user.getId());
        return widgetService.create(inputWidgetDto);
    }
}
