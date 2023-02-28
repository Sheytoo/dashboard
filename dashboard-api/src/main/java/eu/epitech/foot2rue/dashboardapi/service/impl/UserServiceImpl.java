package eu.epitech.foot2rue.dashboardapi.service.impl;

import eu.epitech.foot2rue.dashboardapi.exception.EmailAlreadyExistsException;
import eu.epitech.foot2rue.dashboardapi.exception.ResourceNotFoundException;
import eu.epitech.foot2rue.dashboardapi.exception.UserAlreadySubscribedException;
import eu.epitech.foot2rue.dashboardapi.exception.UserNotSubscribedException;
import eu.epitech.foot2rue.dashboardapi.model.Service;
import eu.epitech.foot2rue.dashboardapi.model.User;
import eu.epitech.foot2rue.dashboardapi.repository.ServiceRepository;
import eu.epitech.foot2rue.dashboardapi.repository.UserRepository;
import eu.epitech.foot2rue.dashboardapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Set;

@org.springframework.stereotype.Service
public class UserServiceImpl implements UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final ServiceRepository serviceRepository;

    public UserServiceImpl(UserRepository userRepository, ServiceRepository serviceRepository) {
        this.userRepository = userRepository;
        this.serviceRepository = serviceRepository;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User"));
    }

    @Override
    public User create(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException();
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User update(Integer id, User user) {
        User userToUpdate = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User"));
        if (userRepository.findByEmail(user.getEmail()).isPresent() && !userToUpdate.getEmail().equals(user.getEmail())) {
            throw new EmailAlreadyExistsException();
        }
        userToUpdate.setEmail(user.getEmail() != null ? user.getEmail() : userToUpdate.getEmail());
        userToUpdate.setFirstName(user.getFirstName() != null ? user.getFirstName() : userToUpdate.getFirstName());
        userToUpdate.setLastName(user.getLastName() != null ? user.getLastName() : userToUpdate.getLastName());
        userToUpdate.setPassword(user.getPassword() != null ? passwordEncoder.encode(user.getPassword()) : userToUpdate.getPassword());
        userToUpdate.setRoles(user.getRoles() != null ? user.getRoles() : userToUpdate.getRoles());
        return userRepository.save(userToUpdate);
    }

    @Override
    public User delete(Integer id) {
        User userToDelete = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User"));
        userRepository.delete(userToDelete);
        return userToDelete;
    }
}
