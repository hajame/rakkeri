package rakkeri.rakkeri_server.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import rakkeri.rakkeri_server.entity.Person;

import java.util.Properties;

@Service
public class EmailService {

    @Value("${spring.mail.host}")
    private String host;
    @Value("${spring.mail.port}")
    private int port;
    @Value("${spring.mail.username}")
    private String username;
    @Value("${spring.mail.password}")
    private String password;
    @Value("${mail.smtp.auth}")
    private String auth;
    @Value("${mail.smtp.starttls.enable}")
    private String startTLS;

    public JavaMailSender getMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", auth);
        props.put("mail.smtp.starttls.enable", startTLS);

        return mailSender;
    }

    public void sendSimpleMessage(Person person, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(username);
        message.setTo(person.getEmail());
        message.setSubject("Räkkeri password reset link");
        message.setText("Hello " + person.getUsername() + ",\n\n"
                + "You have asked to reset your password for Räkkeri account.\n"
                + "Reset link: https://ohtup-staging.cs.helsinki.fi/rakkeri/reset-password?token=" + token + " \n\n"
                + "This password reset link is valid for 10 minutes.\n"
                + "If you did not request a password reset, please ignore this email.\n\n"
                + "- Räkkeri");
        getMailSender().send(message);
    }


}