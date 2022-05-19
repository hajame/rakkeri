package rakkeri.rakkeri_server.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ResetPasswordDTO {
    @JsonProperty("token")
    private String token;
    @JsonProperty("password")
    private String password;

    public ResetPasswordDTO() {
    }

    public ResetPasswordDTO(String token, String password) {
        this.token = token;
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "ResetPasswordDTO{" +
                "token='" + token + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
