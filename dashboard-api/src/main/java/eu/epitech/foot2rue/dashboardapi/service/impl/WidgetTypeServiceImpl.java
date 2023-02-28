package eu.epitech.foot2rue.dashboardapi.service.impl;

import eu.epitech.foot2rue.dashboardapi.exception.ResourceNotFoundException;
import eu.epitech.foot2rue.dashboardapi.exception.WidgetTypeAlreadyExistsException;
import eu.epitech.foot2rue.dashboardapi.model.Service;
import eu.epitech.foot2rue.dashboardapi.model.WidgetType;
import eu.epitech.foot2rue.dashboardapi.repository.ServiceRepository;
import eu.epitech.foot2rue.dashboardapi.repository.WidgetTypeRepository;
import eu.epitech.foot2rue.dashboardapi.service.WidgetTypeService;

import java.util.List;

@org.springframework.stereotype.Service
public class WidgetTypeServiceImpl implements WidgetTypeService {

    private final WidgetTypeRepository widgetTypeRepository;

    private final ServiceRepository serviceRepository;

    public WidgetTypeServiceImpl(WidgetTypeRepository widgetTypeRepository, ServiceRepository serviceRepository) {
        this.widgetTypeRepository = widgetTypeRepository;
        this.serviceRepository = serviceRepository;
    }

    @Override
    public List<WidgetType> findAll() {
        return widgetTypeRepository.findAll();
    }

    @Override
    public WidgetType findById(Integer id) {
        return widgetTypeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WidgetType"));
    }

    @Override
    public WidgetType create(WidgetType widgetType) {
        if (widgetTypeRepository.findByName(widgetType.getName()) != null) {
            throw new WidgetTypeAlreadyExistsException();
        }
        Service service = serviceRepository.findById(widgetType.getService().getId()).orElseThrow(() -> new ResourceNotFoundException("Service"));
        widgetType.setService(service);
        return widgetTypeRepository.save(widgetType);
    }

    @Override
    public WidgetType update(Integer id, WidgetType widgetType) {
        WidgetType widgetTypeToUpdate = widgetTypeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WidgetType"));
        if (widgetTypeRepository.findByName(widgetType.getName()) != null && !widgetTypeRepository.findByName(widgetType.getName()).getId().equals(id)) {
            throw new WidgetTypeAlreadyExistsException();
        }
        if (widgetType.getService() != null) {
            Service service = serviceRepository.findById(widgetType.getService().getId()).orElseThrow(() -> new ResourceNotFoundException("Service"));
            widgetTypeToUpdate.setService(service);
        }
        widgetTypeToUpdate.setName(widgetType.getName() != null ? widgetType.getName() : widgetTypeToUpdate.getName());
        return widgetTypeRepository.save(widgetTypeToUpdate);
    }

    @Override
    public WidgetType delete(Integer id) {
        WidgetType widgetTypeToDelete = widgetTypeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WidgetType"));
        widgetTypeRepository.delete(widgetTypeToDelete);
        return widgetTypeToDelete;
    }
}
