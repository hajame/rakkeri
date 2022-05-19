package rakkeri.rakkeri_server.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import rakkeri.rakkeri_server.entity.PasswordResetToken;
import rakkeri.rakkeri_server.repository.PasswordResetTokenRepository;

import java.sql.Timestamp;
import java.time.Clock;
import java.time.Instant;
import java.util.List;


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

    public PasswordResetToken findByToken(String token) {
        List<PasswordResetToken> tokens = passwordResetTokenRepository.findByToken(token);
        if (tokens.size() != 1) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password reset token");
        }
        PasswordResetToken passwordResetToken = tokens.get(0);
        Timestamp now = Timestamp.from(Instant.now(Clock.systemUTC()));
        if (passwordResetToken.getExpirationDate().before(now)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password reset token");
        }
        return passwordResetToken;
    }

    public void delete(PasswordResetToken passwordResetToken) {
        passwordResetTokenRepository.delete(passwordResetToken);
    }
}
