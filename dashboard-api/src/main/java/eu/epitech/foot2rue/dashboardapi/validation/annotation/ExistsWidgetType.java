package eu.epitech.foot2rue.dashboardapi.validation.annotation;

import eu.epitech.foot2rue.dashboardapi.validation.ExistsWidgetTypeValidator;

import javax.validation.Constraint;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = {ExistsWidgetTypeValidator.class})
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ExistsWidgetType {

    String message() default "Widget type does not exist.";

    Class<?>[] groups() default {};

    Class<? extends javax.validation.Payload>[] payload() default {};
}