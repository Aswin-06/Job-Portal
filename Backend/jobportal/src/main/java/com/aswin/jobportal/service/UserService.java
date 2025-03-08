package com.aswin.jobportal.service;

import com.aswin.jobportal.model.Cus;
import com.aswin.jobportal.model.User;
import com.aswin.jobportal.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private AuthenticationManager manager;
    private UserRepo repo;
    @Autowired
    private JwtService service;

    @Autowired
    public UserService(AuthenticationManager manager, UserRepo repo) {
        this.manager = manager;
        this.repo = repo;
    }

    public boolean add(User user) {
        User temp=repo.findByUsername(user.getUsername());
        BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);
        if(temp!=null)
        {
            return false;
        }
        else {
            user.setPassword(encoder.encode(user.getPassword()));
            repo.save(user);
        }
        return true;
    }

    public String verify(Cus user) {
        Authentication auth=manager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
        if(auth.isAuthenticated())
        {
            return service.generate(user.getUsername());
        }
        return "failure";
    }
}
