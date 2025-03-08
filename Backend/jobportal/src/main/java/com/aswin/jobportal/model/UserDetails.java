package com.aswin.jobportal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.math.BigInteger;

@Entity
public class UserDetails {
    @Id
    private int id;
    private String name;
    private String address;
    private String occupation;
    private int age;
    private BigInteger phno;
    private String email;

    public UserDetails(int id, String name, String address, String occupation, int age, BigInteger phno, String email) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.occupation = occupation;
        this.age = age;
        this.phno = phno;
        this.email = email;
    }

    public UserDetails() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public BigInteger getPhno() {
        return phno;
    }

    public void setPhno(BigInteger phno) {
        this.phno = phno;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
