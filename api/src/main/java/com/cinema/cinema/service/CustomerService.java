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
    private CreditCardRepository creditCardRepository;

    @Autowired
    private EmailService emailService;  

    @Autowired
    private PasswordService passwordService; 

    @Autowired
    private OtpRepository otpRepository; 

    @Transactional
    public Customer registerUser(String firstname, String lastname, String username, String email, String password, Boolean subscribePromo) {
        Customer customer = new Customer();
        customer.setFirstName(firstname);
        customer.setLastName(lastname);
        customer.setUsername(username);
        customer.setEmail(email);
        customer.setPassword(passwordService.hashPassword(password)); 
        customer.setSubscribePromo(subscribePromo);

        emailService.sendRegistrationEmail(email);

        return customerRepository.save(customer);
    }

    public boolean validateUser(String username, String password) {
        Customer customer = customerRepository.findByUsername(username);  
        if (customer != null) {
            return passwordService.verifyPassword(password, customer.getPassword());  
        }
        return false;
    }    

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
    
    public List<CreditCard> getAllCreditCardByCustomerId(Long id) {
        return creditCardRepository.findAll()
                .stream()
                .filter(creditCard -> creditCard
                        .getCustomer()
                        .getId()
                        .equals(id))
                .toList();
    }

    public CreditCard addCreditCard(Long customerId, CreditCard creditCard) {
        Customer customer = getCustomerById(customerId);
        creditCard.setCustomer(customer);

        return creditCardRepository.save(creditCard);
    }

    public CreditCard updateCreditCard(Long customerId, Long cardId, CreditCard creditCard) {
        CreditCard existingCreditCard = creditCardRepository.findById(cardId)
                .orElse(null);

        if (existingCreditCard == null) {
            return null;
        }

        existingCreditCard.setCardType(creditCard.getCardType());
        existingCreditCard.setCardNumber(creditCard.getCardNumber());
        existingCreditCard.setCvv(creditCard.getCvv());
        existingCreditCard.setExpirationDate(creditCard.getExpirationDate());
        existingCreditCard.setName(creditCard.getName());
        existingCreditCard.setBillingAddress(creditCard.getBillingAddress());

        return creditCardRepository.save(creditCard);
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
