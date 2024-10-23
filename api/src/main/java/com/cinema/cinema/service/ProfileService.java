//package com.cinema.cinema.service;
//
//import com.cinema.cinema.model.CreditCard;
//import com.cinema.cinema.model.Customer;
//import com.cinema.cinema.repository.CreditCardRepository;
//import com.cinema.cinema.repository.CustomerRepository;
//
//import jakarta.transaction.Transactional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class ProfileService {
//
//
//    @Autowired
//    private CustomerRepository customerRepository;
//
//    public Customer getCustomerByEmail(String email) {
//        return customerRepository.findByEmail(email);
//    }
//
//    public boolean updateCustomer(Customer updatedCustomer) {
//
//        Customer existingCustomer = customerRepository.findByEmail(updatedCustomer.getEmail());
//        if (existingCustomer != null) {
//            existingCustomer.setFirstName(updatedCustomer.getFirstName());
//            existingCustomer.setLastName(updatedCustomer.getLastName());
//            existingCustomer.setAddress(updatedCustomer.getAddress());
//
//            if (updatedCustomer.getPassword() != null && !updatedCustomer.getPassword().isEmpty()) {
//                existingCustomer.setPassword(updatedCustomer.getPassword());
//            }
//            customerRepository.save(existingCustomer);
//            return true;
//        }
//        return false;
//    }
//}
