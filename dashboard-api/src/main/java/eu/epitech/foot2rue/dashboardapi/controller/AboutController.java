package eu.epitech.foot2rue.dashboardapi.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.io.IOUtils;
import org.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Map;

@RestController
@Api(tags = {"About"})
public class AboutController {

    @GetMapping("/about.json")
    @ApiOperation("Get the about information")
    public Map<String, Object> getAboutJson(HttpServletRequest request) throws IOException {
        String ip = request.getRemoteAddr();
        Instant instant = Instant.now();
        long timeStampSeconds = instant.getEpochSecond();

        ClassPathResource about = new ClassPathResource("about.json");
        String aboutString = IOUtils.toString(about.getInputStream(), StandardCharsets.UTF_8);

        JSONObject aboutJson = new JSONObject(aboutString);
        aboutJson.getJSONObject("client").put("host", ip);
        aboutJson.getJSONObject("server").put("current_time", timeStampSeconds);

        return aboutJson.toMap();
    }
}
