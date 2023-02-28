package eu.epitech.foot2rue.dashboardapi.service.impl;

import eu.epitech.foot2rue.dashboardapi.dto.widget.InputWidgetDto;
import eu.epitech.foot2rue.dashboardapi.dto.widget.WidgetDto;
import eu.epitech.foot2rue.dashboardapi.exception.ResourceNotFoundException;
import eu.epitech.foot2rue.dashboardapi.model.User;
import eu.epitech.foot2rue.dashboardapi.model.Widget;
import eu.epitech.foot2rue.dashboardapi.model.WidgetType;
import eu.epitech.foot2rue.dashboardapi.repository.UserRepository;
import eu.epitech.foot2rue.dashboardapi.repository.WidgetRepository;
import eu.epitech.foot2rue.dashboardapi.repository.WidgetTypeRepository;
import eu.epitech.foot2rue.dashboardapi.service.WidgetService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WidgetServiceImpl implements WidgetService {

    @Autowired
    private ModelMapper modelMapper;

    private final WidgetRepository widgetRepository;

    private final WidgetTypeRepository widgetTypeRepository;

    private final UserRepository userRepository;

    public WidgetServiceImpl(WidgetRepository widgetRepository, WidgetTypeRepository widgetTypeRepository, UserRepository userRepository) {
        this.widgetRepository = widgetRepository;
        this.widgetTypeRepository = widgetTypeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<WidgetDto> findAll() {
        return widgetRepository.findAll().stream().map(widget -> modelMapper.map(widget, WidgetDto.class)).collect(Collectors.toList());
    }

    @Override
    public WidgetDto findById(Integer id) {
        Widget widget = widgetRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Widget"));
        return modelMapper.map(widget, WidgetDto.class);
    }

    @Override
    public WidgetDto create(InputWidgetDto widget) {
        WidgetType widgetType = widgetTypeRepository.findById(widget.getTypeId()).orElseThrow(() -> new ResourceNotFoundException("WidgetType"));
        User user = userRepository.findById(widget.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User"));
        Widget widgetToCreate = new Widget();
        widgetToCreate.setType(widgetType);
        widgetToCreate.setUser(user);
        widgetToCreate.setParameters(widget.getParameters());
        return modelMapper.map(widgetRepository.save(widgetToCreate), WidgetDto.class);
    }

    @Override
    public WidgetDto update(Integer id, InputWidgetDto widget) {
        Widget widgetToUpdate = widgetRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Widget"));
        if (widget.getTypeId() != null) {
            WidgetType widgetType = widgetTypeRepository.findById(widget.getTypeId()).orElseThrow(() -> new ResourceNotFoundException("WidgetType"));
            widgetToUpdate.setType(widgetType);
        }
        if (widget.getUserId() != null) {
            User user = userRepository.findById(widget.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User"));
            widgetToUpdate.setUser(user);
        }
        widgetToUpdate.setParameters((widget.getParameters() != null) ? widget.getParameters() : widgetToUpdate.getParameters());
        return modelMapper.map(widgetRepository.save(widgetToUpdate), WidgetDto.class);
    }

    @Override
    public WidgetDto delete(Integer id) {
        Widget widgetToDelete = widgetRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Widget"));
        widgetRepository.delete(widgetToDelete);
        return modelMapper.map(widgetToDelete, WidgetDto.class);
    }
}
