package eu.epitech.foot2rue.dashboardapi.exception;

public class UserNotSubscribedException extends RuntimeException {

    public UserNotSubscribedException() {
        super("User is not subscribed to this service");
    }
}
