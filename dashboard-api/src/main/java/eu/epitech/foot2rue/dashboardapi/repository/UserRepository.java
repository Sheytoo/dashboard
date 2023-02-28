package eu.epitech.foot2rue.dashboardapi.repository;

import eu.epitech.foot2rue.dashboardapi.model.Service;
import eu.epitech.foot2rue.dashboardapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);
}
