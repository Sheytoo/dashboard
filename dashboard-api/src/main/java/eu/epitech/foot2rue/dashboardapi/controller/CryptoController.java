package eu.epitech.foot2rue.dashboardapi.controller;

import eu.epitech.foot2rue.dashboardapi.dto.crypto.CoinsDto;
import eu.epitech.foot2rue.dashboardapi.dto.crypto.CryptoCurrentMarketDto;
import eu.epitech.foot2rue.dashboardapi.service.CryptoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/crypto")
@Api(tags = {"Crypto"})
public class CryptoController {

    private final CryptoService cryptoService;

    public CryptoController(CryptoService cryptoService) {
        this.cryptoService = cryptoService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @GetMapping("/currentmarket/{coinId}")
    @ApiOperation("Get current market of a crypto")
    public CryptoCurrentMarketDto getCurrentMarket(@PathVariable String coinId, @RequestParam String currency, @RequestParam Integer days) {
        return cryptoService.getCurrentMarket(coinId, currency, days);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @GetMapping("/currencies")
    @ApiOperation("Get all currencies")
    public List<Object> getCurrencies() {
        return cryptoService.getCurrencies();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @GetMapping("/coins")
    @ApiOperation("Get all coins")
    public List<CoinsDto> getCoins() {
        return cryptoService.getCoins();
    }
}
