package com.cinema.cinema.service;


import com.cinema.cinema.dto.CreditCardDTO;
import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.CreditCard;
import com.cinema.cinema.model.User;
import com.cinema.cinema.repository.CreditCardRepository;
import com.cinema.cinema.repository.UserRepository;
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
    private EncryptionService encryptionService;

    @Autowired
    private UserRepository userRepository;

    public CreditCard getById(Long id) throws ResourceNotFoundException {
        return creditCardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Credit card not found"));
    }

    @Transactional
    public CreditCardDTO addCreditCard(Long userId, CreditCardDTO creditCardDTO) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() ->new ResourceNotFoundException("User not found"));

        CreditCard creditCard = new CreditCard();
        creditCard.setUser(user);
        creditCard.setCardType(creditCardDTO.getCardType());
        creditCard.setName(creditCardDTO.getName());
        creditCard.setExpirationDate(creditCardDTO.getExpirationDate());

        String cardNumber = creditCardDTO.getCardNumber();
        creditCard.setLastFourDigits(cardNumber.substring(cardNumber.length() - 4));

        creditCard.setEncryptedCardNumber(encryptionService.encrypt(cardNumber));
        creditCard.setEncryptedCvv(encryptionService.encrypt(creditCardDTO.getCvv()));
        creditCard.setEncryptedBillingAddress(encryptionService.encrypt(creditCardDTO.getBillingAddress()));
        creditCardRepository.save(creditCard);

        creditCardDTO.setCardNumber(creditCard.getLastFourDigits());
        creditCardDTO.setCvv("");
        creditCardDTO.setBillingAddress("");

        return creditCardDTO;
    }

    public List<CreditCardDTO> getCreditCards(Long userId) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() ->new ResourceNotFoundException("User not found"));

        return creditCardRepository.findByUser(user)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CreditCard updateCreditCard(Long userId, Long cardId, CreditCardDTO creditCardDTO) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() ->new ResourceNotFoundException("User not found"));

        CreditCard existingCreditCard = creditCardRepository.findByUserAndId(user, cardId)
                .orElseThrow(() ->new ResourceNotFoundException("Card not found for the customer"));

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

    @Transactional
    public void deleteCreditCard(Long userId, Long cardId) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() ->new ResourceNotFoundException("User not found"));

        CreditCard creditCard = creditCardRepository.findByUserAndId(user, cardId)
                .orElseThrow(() ->new ResourceNotFoundException("Card not found for the customer"));

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
