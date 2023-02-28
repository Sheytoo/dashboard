package eu.epitech.foot2rue.dashboardapi.repository;

import eu.epitech.foot2rue.dashboardapi.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Integer> {
}
