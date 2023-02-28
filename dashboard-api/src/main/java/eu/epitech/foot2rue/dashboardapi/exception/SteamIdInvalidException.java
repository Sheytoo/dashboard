package eu.epitech.foot2rue.dashboardapi.exception;

public class SteamIdInvalidException extends RuntimeException {

    public SteamIdInvalidException() {
        super("Steam ID is invalid.");
    }
}
