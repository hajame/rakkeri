package rakkeri.rakkeri_server.entity;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;


@Entity(name = "Person")
@Table(
        name = "person",
        uniqueConstraints = {
                @UniqueConstraint(name = "person_username_unique", columnNames = "username")
        }
)
public class Person {

    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "person_sequence")
    @SequenceGenerator(name = "person_sequence", sequenceName = "person_sequence", allocationSize = 1)
    @Column(name = "id", updatable = false)
    private Long id;
    @Column(name = "username", nullable = false, columnDefinition = "VARCHAR(255)")
    private String username;
    @Column(name = "email", nullable = false, columnDefinition = "VARCHAR(255)")
    private String email;
    @Column(name = "password", nullable = false, columnDefinition = "VARCHAR(511)")
    private String password;

    public Person(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
