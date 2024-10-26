package com.cinema.cinema.service;


import com.cinema.cinema.dto.CreditCardDTO;
import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.CreditCard;
import com.cinema.cinema.model.Customer;
import com.cinema.cinema.repository.CreditCardRepository;
import com.cinema.cinema.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CreditCardService {
    @Autowired
    private CreditCardRepository creditCardRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EncryptionService encryptionService;

    @Transactional
    public CreditCard addCreditCard(Long customerId, CreditCardDTO creditCardDTO) throws ResourceNotFoundException {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() ->new ResourceNotFoundException("Customer not found"));

        CreditCard creditCard = new CreditCard();
        creditCard.setCustomer(customer);
        creditCard.setCardType(creditCardDTO.getCardType());
        creditCard.setName(creditCardDTO.getName());
        creditCard.setExpirationDate(creditCardDTO.getExpirationDate());


        String cardNumber = creditCardDTO.getCardNumber();
        creditCard.setLastFourDigits(cardNumber.substring(cardNumber.length() - 4));

        creditCard.setEncryptedCardNumber(encryptionService.encrypt(cardNumber));
        creditCard.setEncryptedCvv(encryptionService.encrypt(creditCardDTO.getCvv()));
        creditCard.setEncryptedBillingAddress(encryptionService.encrypt(creditCardDTO.getBillingAddress()));


        return creditCardRepository.save(creditCard);
    }

    public List<CreditCardDTO> getCustomerCreditCards(Long customerId) {
        return creditCardRepository.findByCustomerId(customerId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CreditCard updateCreditCard(Long customerId, Long cardId, CreditCardDTO creditCardDTO) throws ResourceNotFoundException {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() ->new ResourceNotFoundException("Customer not found"));

        CreditCard existingCreditCard = creditCardRepository.findByCustomerIdAndId(customerId, cardId)
                .orElseThrow(() ->new ResourceNotFoundException("Card not found for the customer"));

        if (existingCreditCard == null) {
            return null;
        }

        existingCreditCard.setCardType(creditCardDTO.getCardType());
        existingCreditCard.setName(creditCardDTO.getName());
        existingCreditCard.setExpirationDate(creditCardDTO.getExpirationDate());

        String cardNumber = creditCardDTO.getCardNumber();
        existingCreditCard.setLastFourDigits(cardNumber.substring(cardNumber.length() - 4));

        existingCreditCard.setEncryptedCardNumber(encryptionService.encrypt(cardNumber));
        existingCreditCard.setEncryptedCvv(encryptionService.encrypt(creditCardDTO.getCvv()));
        existingCreditCard.setEncryptedBillingAddress(encryptionService.encrypt(creditCardDTO.getBillingAddress()));

        return creditCardRepository.save(existingCreditCard);
    }

    private String maskCardNumber(String cardNumber) {
        return "************" + cardNumber.substring(cardNumber.length() - 4);
    }

    @Transactional
    public void deleteCreditCard(Long customerId, Long cardId) throws ResourceNotFoundException {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() ->new ResourceNotFoundException("Customer not found"));

        CreditCard creditCard = creditCardRepository.findByCustomerIdAndId(customerId, cardId)
                .orElseThrow(() -> new ResourceNotFoundException("Credit card not found"));

        creditCardRepository.delete(creditCard);
    }

    public CreditCardDTO convertToDTO(CreditCard creditCard) {
        CreditCardDTO dto = new CreditCardDTO();
        dto.setId(creditCard.getId());
        dto.setCardType(creditCard.getCardType());
        dto.setName(creditCard.getName());
        dto.setCardNumber(creditCard.getMaskedCardNumber());
        dto.setExpirationDate(creditCard.getExpirationDate());

        return dto;
    }
}
