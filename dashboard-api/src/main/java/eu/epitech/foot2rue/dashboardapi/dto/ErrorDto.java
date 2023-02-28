package eu.epitech.foot2rue.dashboardapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class ErrorDto {

    private Integer status;
    private String message;
    private List<Map<String, String>> errors;
}
