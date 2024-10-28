//package com.cinema.cinema.service;
//
//import com.cinema.cinema.model.Customer;
//import com.cinema.cinema.model.Otp;
//import com.cinema.cinema.model.VerificationToken;
//import com.cinema.cinema.repository.CustomerRepository;
//import com.cinema.cinema.repository.OtpRepository;
//import com.cinema.cinema.repository.VerificationTokenRepository;
//import jakarta.mail.MessagingException;
//import jakarta.transaction.Transactional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.UUID;

//@Service
//public class CustomerService {
//
//    @Autowired
//    private CustomerRepository customerRepository;
//
//    @Autowired
//    private VerificationTokenRepository tokenRepository;
//
//    @Autowired
//    private EmailService emailService;
//
//    @Autowired
//    private PasswordService passwordService;
//
//    @Autowired
//    private OtpRepository otpRepository;
//
//    // TODO: add validation
//    @Transactional
//    public Customer addCustomer(Customer customer)  {
//        customer.setPassword(passwordService.hashPassword(customer.getPassword()));
//        customer.setActive(false);
//        customerRepository.save(customer);
//
//        String token = UUID.randomUUID().toString();
//        VerificationToken verificationToken = new VerificationToken();
//        verificationToken.setCustomer(customer);
//        verificationToken.setToken(token);
//        verificationToken.setExpirationTime(LocalDateTime.now().plusDays(1));
//        tokenRepository.save(verificationToken);
//
//        try {
//            emailService.sendVerificationEmail(customer.getEmail(), token);
//        } catch (MessagingException e) {
//            System.out.println(e);
//        }
//        return customer;
//    }
//
//    public Customer getCustomerById(Long id) {
//        return customerRepository.findById(id)
//                .orElse(null);
//    }
//
//    public Customer getByUsername(String username) {
//        return customerRepository.findByUsername(username);
//    }
//
//    public Customer getByEmail(String email) {
//        return customerRepository.findByEmail(email);
//    }
//
//    public boolean validatePassword(Customer customer, String password) {
//        return passwordService.verifyPassword(password, customer.getPassword());
//    }
//
//    public Customer updateCustomer(Long id, Customer customer) {
//        Customer existingCustomer = getCustomerById(id);
//
//        if (customer.getPassword() != null && !customer.getPassword().equals("")) {
//            existingCustomer.setPassword(passwordService.hashPassword(customer.getPassword()));
//        }
//
//        if (existingCustomer != null) {
//            existingCustomer.setFirstName(customer.getFirstName());
//            existingCustomer.setLastName(customer.getLastName());
//            existingCustomer.setEmail(customer.getEmail());
//            existingCustomer.setAddress(customer.getAddress());
//            existingCustomer.setPhoneNumber(customer.getPhoneNumber());
//            existingCustomer.setSubscribePromo(customer.getSubscribePromo());
//            customerRepository.save(existingCustomer);
//        }
//
//        emailService.sendProfileUpdatedEmail(existingCustomer.getEmail(), existingCustomer.getFirstName());
//
//        return existingCustomer;
//    }
//}
