package com.aswin.jobportal.controller;

import com.aswin.jobportal.model.Cus;
import com.aswin.jobportal.model.User;
import com.aswin.jobportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class SecurityController {

    private UserService service;
    @Autowired
    public SecurityController(UserService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public String login(@RequestBody Cus user)
    {
        return service.verify(user);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user)
    {
        if(service.add(user))
        {
            return new ResponseEntity<>("success", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("failure",HttpStatus.BAD_REQUEST);
    }

}
