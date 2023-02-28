package eu.epitech.foot2rue.dashboardapi.dto.crypto;

import lombok.Data;

import java.util.List;

@Data
public class CryptoCurrentMarketDto {

    private String name;
    private String symbol;
    private String icon;
    private Double price;
    private Double priceChange24h;
    private List<Object> chartData;
}
