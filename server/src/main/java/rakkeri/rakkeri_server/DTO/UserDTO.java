package rakkeri.rakkeri_server.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;

public class UserDTO {
    @JsonProperty("id")
    private Long id;
    private String username;
    private String token;
    private Timestamp tokenExpirationDate;

    public UserDTO() {
    }

    public UserDTO(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    public UserDTO(Long id, String username, String token, Timestamp tokenExpirationDate) {
        this(id, username);
        this.token = token;
        this.tokenExpirationDate = tokenExpirationDate;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Timestamp getTokenExpirationDate() {
        return tokenExpirationDate;
    }

    public void setTokenExpirationDate(Timestamp tokenExpirationDate) {
        this.tokenExpirationDate = tokenExpirationDate;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", token='" + token + '\'' +
                ", tokenExpirationDate=" + tokenExpirationDate +
                '}';
    }
}
