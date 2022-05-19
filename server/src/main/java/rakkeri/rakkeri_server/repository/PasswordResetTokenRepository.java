package rakkeri.rakkeri_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rakkeri.rakkeri_server.entity.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
}