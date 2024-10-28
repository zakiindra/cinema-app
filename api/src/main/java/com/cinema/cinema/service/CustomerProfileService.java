package com.cinema.cinema.service;

import com.cinema.cinema.dto.CustomerDTO;
import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.CustomerProfile;
import com.cinema.cinema.model.User;
import com.cinema.cinema.repository.CustomerProfileRepository;
import com.cinema.cinema.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerProfileService {

    @Autowired
    EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerProfileRepository profileRepository;

    @Autowired
    private UserService userService;

    // TODO: add validation
    @Transactional
    public CustomerDTO addCustomer(CustomerDTO customerDTO) {
        User user = userService.addCustomerUser(customerDTO.getEmail(), customerDTO.getPassword());

        CustomerProfile profile = new CustomerProfile();
        profile.setUser(user);
        profile.setFirstName(customerDTO.getFirstName());
        profile.setLastName(customerDTO.getLastName());
        profile.setAddress(customerDTO.getAddress());
        profile.setPhoneNumber(customerDTO.getPhoneNumber());
        profile.setSubscribePromo(customerDTO.getSubscribePromo());

        profileRepository.save(profile);

        // TODO: better handle response without exposing password
        customerDTO.setPassword(null);

        return customerDTO;

    }

    @Transactional
    public CustomerDTO getProfileByUserId(Long userId) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        CustomerProfile profile = profileRepository.findByUser(user)
                .orElse(null);

        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setEmail(user.getEmail());

        if (profile != null) {
            customerDTO.setFirstName(profile.getFirstName());
            customerDTO.setLastName(profile.getLastName());
            customerDTO.setAddress(profile.getAddress());
            customerDTO.setPhoneNumber(profile.getPhoneNumber());
            customerDTO.setSubscribePromo(profile.getSubscribePromo());
        }

        return customerDTO;
    }

    public CustomerDTO updateProfile(Long userId, CustomerDTO customerDTO) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        CustomerProfile existingProfile = profileRepository.findByUser(user)
                .orElse(new CustomerProfile());

        existingProfile.setFirstName(customerDTO.getFirstName());
        existingProfile.setLastName(customerDTO.getLastName());
        existingProfile.setAddress(customerDTO.getAddress());
        existingProfile.setPhoneNumber(customerDTO.getPhoneNumber());
        existingProfile.setSubscribePromo(customerDTO.getSubscribePromo());
        profileRepository.save(existingProfile);

        emailService.sendProfileUpdatedEmail(user.getEmail(), existingProfile.getFirstName());

        return customerDTO;
    }





}
