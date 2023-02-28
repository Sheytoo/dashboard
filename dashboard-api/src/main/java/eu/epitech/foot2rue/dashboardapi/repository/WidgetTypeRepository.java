package eu.epitech.foot2rue.dashboardapi.repository;

import eu.epitech.foot2rue.dashboardapi.model.WidgetType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WidgetTypeRepository extends JpaRepository<WidgetType, Integer> {

    WidgetType findByName(String name);
}