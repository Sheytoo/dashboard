package eu.epitech.foot2rue.dashboardapi.exception;

public class IllegalDateFormatException extends RuntimeException {

    public IllegalDateFormatException() {
        super("Illegal date format. Please use the following format: yyyy-MM-dd");
    }

}
