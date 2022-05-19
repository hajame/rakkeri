package rakkeri.rakkeri_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rakkeri.rakkeri_server.entity.PasswordResetToken;

import java.util.List;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    List<PasswordResetToken> findByToken(String token);
}