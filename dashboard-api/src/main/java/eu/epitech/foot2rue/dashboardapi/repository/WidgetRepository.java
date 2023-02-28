package eu.epitech.foot2rue.dashboardapi.repository;

import eu.epitech.foot2rue.dashboardapi.model.Widget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WidgetRepository extends JpaRepository<Widget, Integer> {

    List<Widget> findAllByUserId(Integer userId);

}
