package eu.epitech.foot2rue.dashboardapi.validation;

import eu.epitech.foot2rue.dashboardapi.repository.ServiceRepository;
import eu.epitech.foot2rue.dashboardapi.validation.annotation.ExistsService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ExistsServiceValidator implements ConstraintValidator<ExistsService, Integer> {

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        return serviceRepository.findById(value).isPresent();
    }
}
