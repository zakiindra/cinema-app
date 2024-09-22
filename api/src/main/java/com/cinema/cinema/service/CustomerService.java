package com.cinema.cinema.service;

import com.cinema.cinema.model.CreditCard;
import com.cinema.cinema.model.Customer;
import com.cinema.cinema.repository.CreditCardRepository;
import com.cinema.cinema.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CreditCardRepository creditCardRepository;

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