package rakkeri.rakkeri_server.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity(name = "PasswordResetToken")
@Table(name = "password_reset_token")
public class PasswordResetToken {

    @Id
    @Column(name = "person_id")
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person person;

    @Column(name = "token")
    private String token;

    @Column(name = "expiration_date")
    private Timestamp expirationDate;


    public PasswordResetToken(Person person, String token, Timestamp expirationDate) {
        this.person = person;
        this.token = token;
        this.expirationDate = expirationDate;
    }

    public PasswordResetToken() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Timestamp getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Timestamp expirationDate) {
        this.expirationDate = expirationDate;
    }
}