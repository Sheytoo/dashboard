package eu.epitech.foot2rue.dashboardapi.service;

import eu.epitech.foot2rue.dashboardapi.model.User;

import java.util.List;

public interface UserService {

    List<User> findAll();

    User findById(Integer id);

    User create(User user);

    User update(Integer id, User user);

    User delete(Integer id);
}
