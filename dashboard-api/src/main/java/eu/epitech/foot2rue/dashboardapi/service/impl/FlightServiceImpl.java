package eu.epitech.foot2rue.dashboardapi.service.impl;

import eu.epitech.foot2rue.dashboardapi.dto.flight.AirportDto;
import eu.epitech.foot2rue.dashboardapi.dto.flight.FlightPointDto;
import eu.epitech.foot2rue.dashboardapi.dto.flight.FlightStatusDto;
import eu.epitech.foot2rue.dashboardapi.exception.IllegalDateFormatException;
import eu.epitech.foot2rue.dashboardapi.service.FlightService;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class FlightServiceImpl implements FlightService {

    @Value("${flight.api.key}")
    private String apiKey;

    private final OkHttpClient client = new OkHttpClient();

    @Override
    public FlightStatusDto getFlightStatus(String flightNumber, String date) {
        if (!date.matches("\\d{4}-\\d{2}-\\d{2}")) {
            throw new IllegalDateFormatException();
        }
        Request request = new Request.Builder()
                .url("https://aerodatabox.p.rapidapi.com/flights/number/" + flightNumber + "/" + date)
                .get()
                .addHeader("X-RapidAPI-Key", apiKey)
                .addHeader("X-RapidAPI-Host", "aerodatabox.p.rapidapi.com")
                .build();
        try {
            Response response = client.newCall(request).execute();
            JSONArray jsonArray = new JSONArray(response.body().string());
            JSONObject json = jsonArray.getJSONObject(0);

            FlightPointDto departure = getFlightPoint(json.getJSONObject("departure"));
            FlightPointDto arrival = getFlightPoint(json.getJSONObject("arrival"));

            FlightStatusDto flightStatusDto = new FlightStatusDto();
            flightStatusDto.setFlightNumber(json.getString("number"));
            flightStatusDto.setAirline(json.getJSONObject("airline").getString("name"));
            flightStatusDto.setAircraftModel(json.getJSONObject("aircraft").getString("model"));
            flightStatusDto.setDeparture(departure);
            flightStatusDto.setArrival(arrival);
            return flightStatusDto;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private FlightPointDto getFlightPoint(JSONObject json) {
        FlightPointDto flightPointDto = new FlightPointDto();
        flightPointDto.setAirport(getAirport(json));
        if (json.has("terminal")) {
            flightPointDto.setTerminal(json.getString("terminal"));
        }
        flightPointDto.setLocalTime(json.getString("scheduledTimeLocal"));
        flightPointDto.setUtcTime(json.getString("scheduledTimeUtc"));
        return flightPointDto;
    }

    private AirportDto getAirport(JSONObject json) {
        AirportDto airport = new AirportDto();
        airport.setCode(json.getJSONObject("airport").getString("iata"));
        airport.setName(json.getJSONObject("airport").getString("shortName"));
        airport.setCity(json.getJSONObject("airport").getString("municipalityName"));
        airport.setCountryCode(json.getJSONObject("airport").getString("countryCode"));
        return airport;
    }
}
