package rakkeri.rakkeri_server.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import rakkeri.rakkeri_server.entity.Person;

public class UserWithoutTokenDTO {
    @JsonProperty("id")
    private Long id;
    private String username;

    public UserWithoutTokenDTO() {
    }

    public UserWithoutTokenDTO(Long id, String username) {
        this.id = id;
        this.username = username;
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

    @Override
    public String toString() {
        return "UserWithoutTokenDTO{" +
                "id=" + id +
                ", username='" + username + '\'' +
                '}';
    }

    public static UserWithoutTokenDTO toDTO(Person person) {
        return new UserWithoutTokenDTO(person.getId(), person.getUsername());
    }
}
