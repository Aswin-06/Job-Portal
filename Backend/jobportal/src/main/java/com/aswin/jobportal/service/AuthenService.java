package com.aswin.jobportal.service;

import com.aswin.jobportal.model.User;
import com.aswin.jobportal.repository.UserRepo;
import com.aswin.jobportal.securityconfig.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthenService implements UserDetailsService {

    UserRepo repo;

    @Autowired
    public AuthenService(UserRepo repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=repo.findByUsername(username);
        if(user==null)
        {
            throw new UsernameNotFoundException("wrong username");
        }
        return new UserPrincipal(user);
    }
}
