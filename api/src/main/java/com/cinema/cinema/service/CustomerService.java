package com.cinema.cinema.service;

import com.cinema.cinema.model.CreditCard;
import com.cinema.cinema.model.Customer;
import com.cinema.cinema.model.Otp; 
import com.cinema.cinema.repository.CreditCardRepository;
import com.cinema.cinema.repository.CustomerRepository;
import com.cinema.cinema.repository.OtpRepository; 
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmailService emailService;  

    @Autowired
    private PasswordService passwordService; 

    @Autowired
    private OtpRepository otpRepository;

    public Customer addCustomer(Customer customer) {
        customer.setPassword(passwordService.hashPassword(customer.getPassword()));
        customerRepository.save(customer);
        emailService.sendRegistrationEmail(customer.getEmail());;
        return customer;
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElse(null);
    }

    public Customer getByUsername(String username) {
        return customerRepository.findByUsername(username);
    }

    public Customer getByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    public boolean validatePassword(Customer customer, String password) {
        return passwordService.verifyPassword(password, customer.getPassword());
    }

    public Customer updateCustomer(Long id, Customer customer) {
        Customer existingCustomer = getCustomerById(id);

        if (customer.getPassword() != null && !customer.getPassword().equals("")) {
            existingCustomer.setPassword(passwordService.hashPassword(customer.getPassword()));
        }

        if (existingCustomer != null) {
            existingCustomer.setFirstName(customer.getFirstName());
            existingCustomer.setLastName(customer.getLastName());
            existingCustomer.setEmail(customer.getEmail());
            existingCustomer.setAddress(customer.getAddress());
            existingCustomer.setPhoneNumber(customer.getPhoneNumber());
            existingCustomer.setSubscribePromo(customer.getSubscribePromo());
            customerRepository.save(existingCustomer);
        }

        emailService.sendProfileUpdatedEmail(existingCustomer.getEmail(), existingCustomer.getFirstName());

        return existingCustomer;
    }

    @Transactional
    public boolean forgotPassword(String email, int otp, String newPassword) {
        

        System.out.println("In FORGOT FUNC");
        Customer customer = customerRepository.findByEmail(email);
        if (customer == null) {
            return false; 
        }
    
        
        Otp otpRecord = otpRepository.findById(email).orElse(null);
        if (otpRecord != null && otpRecord.getOtp() == otp) {
            
            customer.setPassword(passwordService.hashPassword(newPassword)); // Hash the new password
            customerRepository.save(customer); // Save updated customer
            System.out.println("PASSWORD UPDATED");
    
            
            otpRepository.delete(otpRecord);
            System.out.println("otp deleted");
    
            return true; 
        }
    
        return false; 
    }
}
