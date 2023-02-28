package eu.epitech.foot2rue.dashboardapi.repository;

import eu.epitech.foot2rue.dashboardapi.model.Role;
import eu.epitech.foot2rue.dashboardapi.model.ERole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findByName(ERole name);
}
