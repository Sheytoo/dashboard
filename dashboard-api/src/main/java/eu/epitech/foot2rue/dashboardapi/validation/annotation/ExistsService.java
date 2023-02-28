package eu.epitech.foot2rue.dashboardapi.validation.annotation;

import eu.epitech.foot2rue.dashboardapi.validation.ExistsServiceValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = {ExistsServiceValidator.class})
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ExistsService {

    String message() default "Service does not exist.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
