package eu.epitech.foot2rue.dashboardapi.exception;

public class WidgetTypeAlreadyExistsException extends RuntimeException {

    public WidgetTypeAlreadyExistsException() {
        super("Widget type already exists");
    }
}
