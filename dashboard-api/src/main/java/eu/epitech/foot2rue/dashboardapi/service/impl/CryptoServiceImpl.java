package eu.epitech.foot2rue.dashboardapi.service.impl;

import eu.epitech.foot2rue.dashboardapi.dto.crypto.CoinsDto;
import eu.epitech.foot2rue.dashboardapi.dto.crypto.CryptoCurrentMarketDto;
import eu.epitech.foot2rue.dashboardapi.service.CryptoService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class CryptoServiceImpl implements CryptoService {

    @Override
    public CryptoCurrentMarketDto getCurrentMarket(String coinId, String currency, Integer days) {
        final String url = "https://api.coingecko.com/api/v3/coins/" + coinId + "?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false";
        String result = new RestTemplate().getForObject(url, String.class);
        JSONObject json = new JSONObject(result);

        final String chartUrl = "https://api.coingecko.com/api/v3/coins/" + coinId + "/market_chart?vs_currency=" + currency + "&days=" + days;
        String chartResult = new RestTemplate().getForObject(chartUrl, String.class);
        JSONObject chartJson = new JSONObject(chartResult);

        CryptoCurrentMarketDto cryptoCurrentMarketDto = new CryptoCurrentMarketDto();
        cryptoCurrentMarketDto.setName(json.getString("name"));
        cryptoCurrentMarketDto.setSymbol(json.getString("symbol"));
        cryptoCurrentMarketDto.setIcon(json.getJSONObject("image").getString("large"));
        cryptoCurrentMarketDto.setPrice(json.getJSONObject("market_data").getJSONObject("current_price").getDouble(currency));
        cryptoCurrentMarketDto.setPriceChange24h(json.getJSONObject("market_data").getJSONObject("price_change_24h_in_currency").getDouble(currency));
        cryptoCurrentMarketDto.setChartData(chartJson.getJSONArray("prices").toList());

        return cryptoCurrentMarketDto;
    }

    @Override
    public List<Object> getCurrencies() {
        final String url = "https://api.coingecko.com/api/v3/simple/supported_vs_currencies";
        String result = new RestTemplate().getForObject(url, String.class);
        JSONArray json = new JSONArray(result);
        return json.toList();
    }

    @Override
    public List<CoinsDto> getCoins() {
        final String url = "https://api.coingecko.com/api/v3/coins/list";
        String result = new RestTemplate().getForObject(url, String.class);
        JSONArray json = new JSONArray(result);
        List<CoinsDto> coinsDtoList = new ArrayList<>();
        for (int i = 0; i < json.length(); i++) {
            CoinsDto coinsDto = new CoinsDto();
            coinsDto.setId(json.getJSONObject(i).getString("id"));
            coinsDto.setName(json.getJSONObject(i).getString("name"));
            coinsDto.setSymbol(json.getJSONObject(i).getString("symbol"));
            coinsDtoList.add(coinsDto);
        }
        return coinsDtoList;
    }
}
