package rakkeri.rakkeri_server.service;

import org.springframework.stereotype.Service;
import rakkeri.rakkeri_server.entity.PasswordResetToken;
import rakkeri.rakkeri_server.repository.PasswordResetTokenRepository;


@Service
public class PasswordResetTokenService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    //private final PersonService personService;

    public PasswordResetTokenService(PasswordResetTokenRepository passwordResetTokenRepository) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    public PasswordResetToken save(PasswordResetToken passwordResetToken) {
        return passwordResetTokenRepository.save(passwordResetToken);
    }

    public PasswordResetToken update(PasswordResetToken passwordResetToken) {
        return passwordResetTokenRepository.save(passwordResetToken);
    }
}
