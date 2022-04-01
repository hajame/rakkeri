package rakkeri.rakkeri_server.entity;

import javax.persistence.*;


@Entity(name = "Person")
@Table(
        name = "person",
        uniqueConstraints = {
                @UniqueConstraint(name = "person_username_unique", columnNames = "username")
        }
)
public class Person {

    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id", updatable = false)
    private Long id;
    @Column(name = "username", nullable = false, columnDefinition = "VARCHAR(255)")
    private String username;
    @Column(name = "email", nullable = false, columnDefinition = "VARCHAR(255)")
    private String email;
    @Column(name = "password_hash", nullable = false, columnDefinition = "VARCHAR(511)")
    private String passwordHash;

    public Person(String username, String email, String passwordHash) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    public Person() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", passwordHash='" + passwordHash + '\'' +
                '}';
    }
}
