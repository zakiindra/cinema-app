package com.cinema.cinema.service;

import com.cinema.cinema.model.CreditCard;
import com.cinema.cinema.model.Customer;
import com.cinema.cinema.repository.CreditCardRepository;
import com.cinema.cinema.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CreditCardRepository creditCardRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordService passwordService;

    @Transactional
    public Customer registerUser(String username, String email, String password) {
        Customer customer = new Customer();
        customer.setUsername(username);
        customer.setEmail(email);
        customer.setPassword(passwordService.hashPassword(password));

        emailService.sendRegistrationEmail(email);

        return customerRepository.save(customer);
    }

    public boolean validateUser(String email, String password) {
        Customer customer = customerRepository.findByEmail(email);
        if (customer != null) {
            return passwordService.verifyPassword(password, customer.getPassword());
        }
        return false;
    }


    public Customer addCustomer(Customer customer) {
        // Add validation and password encryption logic here
        return customerRepository.save(customer);
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElse(null);
    }

    // TODO: prevent update username, return bad request if update username
    public Customer updateCustomer(Long id, Customer customer) {
        Customer existingCustomer = getCustomerById(id);

        if (existingCustomer != null) {
            existingCustomer.setPassword(customer.getPassword());
            existingCustomer.setEmail(customer.getEmail());
            existingCustomer.setFirstName(customer.getFirstName());
            existingCustomer.setLastName(customer.getLastName());
            existingCustomer.setAddress(customer.getAddress());
            existingCustomer.setPhoneNumber(customer.getPhoneNumber());
            customerRepository.save(existingCustomer);
        }

        return existingCustomer;
    }

    // TODO: change to findByCustomerId or findAll with example/filter
    public List<CreditCard> getAllCreditCardByCustomerId(Long id) {
        return creditCardRepository.findAll()
                .stream()
                .filter(creditCard -> creditCard
                        .getCustomer()
                        .getId()
                        .equals(id))
                .toList();
    }
}