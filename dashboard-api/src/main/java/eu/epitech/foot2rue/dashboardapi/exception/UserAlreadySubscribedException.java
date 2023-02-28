package eu.epitech.foot2rue.dashboardapi.exception;

public class UserAlreadySubscribedException extends RuntimeException {

    public UserAlreadySubscribedException() {
        super("User already subscribed to this service");
    }
}
