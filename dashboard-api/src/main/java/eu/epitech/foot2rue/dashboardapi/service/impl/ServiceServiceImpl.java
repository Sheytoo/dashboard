package eu.epitech.foot2rue.dashboardapi.service.impl;

import eu.epitech.foot2rue.dashboardapi.exception.ResourceNotFoundException;
import eu.epitech.foot2rue.dashboardapi.model.Service;
import eu.epitech.foot2rue.dashboardapi.model.Widget;
import eu.epitech.foot2rue.dashboardapi.model.WidgetType;
import eu.epitech.foot2rue.dashboardapi.repository.ServiceRepository;
import eu.epitech.foot2rue.dashboardapi.repository.WidgetRepository;
import eu.epitech.foot2rue.dashboardapi.repository.WidgetTypeRepository;
import eu.epitech.foot2rue.dashboardapi.service.ServiceService;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {

    private final ServiceRepository serviceRepository;

    private final WidgetTypeRepository widgetTypeRepository;

    public ServiceServiceImpl(ServiceRepository serviceRepository, WidgetTypeRepository widgetTypeRepository) {
        this.serviceRepository = serviceRepository;
        this.widgetTypeRepository = widgetTypeRepository;
    }

    @Override
    public List<Service> findAll() {
        return serviceRepository.findAll();
    }

    @Override
    public Service findById(Integer id) {
        return serviceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Service"));
    }

    @Override
    public Service create(Service service) {
        return serviceRepository.save(service);
    }

    @Override
    public Service update(Integer id, Service service) {
        Service serviceToUpdate = serviceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Service"));
        serviceToUpdate.setName(service.getName() != null ? service.getName() : serviceToUpdate.getName());
        serviceToUpdate.setDescription(service.getDescription() != null ? service.getDescription() : serviceToUpdate.getDescription());
        return serviceRepository.save(serviceToUpdate);
    }

    @Override
    public void delete(Integer id) {
        Service serviceToDelete = serviceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Service"));
        serviceRepository.delete(serviceToDelete);
    }

    @Override
    public List<WidgetType> findWidgetTypesByServiceId(Integer id) {
        Service service = serviceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Service"));
        List<WidgetType> widgetTypes = new ArrayList<>();
        widgetTypeRepository.findAll().forEach(widgetType -> {
            if (widgetType.getService().getId().equals(service.getId())) {
                widgetTypes.add(widgetType);
            }
        });
        return widgetTypes;
    }
}
