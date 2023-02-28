package eu.epitech.foot2rue.dashboardapi.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String resource) {
        super("%s not found.".formatted(resource));
    }
}
