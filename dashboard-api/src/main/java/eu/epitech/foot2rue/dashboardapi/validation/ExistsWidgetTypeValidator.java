package eu.epitech.foot2rue.dashboardapi.validation;

import eu.epitech.foot2rue.dashboardapi.repository.WidgetTypeRepository;
import eu.epitech.foot2rue.dashboardapi.validation.annotation.ExistsWidgetType;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ExistsWidgetTypeValidator implements ConstraintValidator<ExistsWidgetType, Integer> {

    @Autowired
    private WidgetTypeRepository widgetTypeRepository;

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        return widgetTypeRepository.findById(value).isPresent();
    }
}
