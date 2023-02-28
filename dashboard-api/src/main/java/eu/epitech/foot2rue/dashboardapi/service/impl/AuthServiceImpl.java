package eu.epitech.foot2rue.dashboardapi.service.impl;

import eu.epitech.foot2rue.dashboardapi.dto.auth.AuthDto;
import eu.epitech.foot2rue.dashboardapi.dto.auth.RegisterDto;
import eu.epitech.foot2rue.dashboardapi.exception.EmailAlreadyExistsException;
import eu.epitech.foot2rue.dashboardapi.jwt.JwtUtil;
import eu.epitech.foot2rue.dashboardapi.model.Role;
import eu.epitech.foot2rue.dashboardapi.model.User;
import eu.epitech.foot2rue.dashboardapi.repository.RoleRepository;
import eu.epitech.foot2rue.dashboardapi.repository.UserRepository;
import eu.epitech.foot2rue.dashboardapi.service.AuthService;
import eu.epitech.foot2rue.dashboardapi.model.ERole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public AuthDto login(String email, String password) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = jwtUtil.generateJwtToken(auth);
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        AuthDto authDto = new AuthDto();
        authDto.setToken(token);
        authDto.setId(userDetails.getId());
        authDto.setEmail(userDetails.getUsername());
        authDto.setFirstName(userDetails.getFirstName());
        authDto.setLastName(userDetails.getLastName());
        authDto.setRoles(roles);
        return authDto;
    }

    @Override
    public AuthDto register(RegisterDto registerDto) {
        if (userRepository.existsByEmail(registerDto.getEmail())) throw new EmailAlreadyExistsException();
        String hashedPassword = passwordEncoder.encode(registerDto.getPassword());
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.ROLE_USER);
        roles.add(userRole);
        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setPassword(hashedPassword);
        user.setRoles(roles);
        userRepository.save(user);
        return login(registerDto.getEmail(), registerDto.getPassword());
    }
}
