package eu.epitech.foot2rue.dashboardapi.service;

import eu.epitech.foot2rue.dashboardapi.dto.crypto.CoinsDto;
import eu.epitech.foot2rue.dashboardapi.dto.crypto.CryptoCurrentMarketDto;

import java.util.List;

public interface CryptoService {

    CryptoCurrentMarketDto getCurrentMarket(String coinId, String currency, Integer days);

    List<Object> getCurrencies();

    List<CoinsDto> getCoins();
}
