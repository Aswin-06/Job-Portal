package com.aswin.jobportal.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class JobDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String compname;
    private String address;
    private String location;
    private String type;
    private int salary;
    private String about;
    private String job;

    private Date start;
    private Date apply;

    private List<String> skills;

    private String imgname;
    @Lob
    private byte[] image;

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public JobDetails(int id, String compname, String address, String location, String type, int salary, String about, String job, Date start, Date apply, List<String> skills, String imgname, byte[] image) {
        this.id = id;
        this.compname = compname;
        this.address = address;
        this.location = location;
        this.type = type;
        this.salary = salary;
        this.about = about;
        this.job = job;
        this.start = start;
        this.apply = apply;
        this.skills = skills;
        this.imgname = imgname;
        this.image = image;
    }

    public JobDetails() {
    }

    public String getCompname() {
        return compname;
    }

    public void setCompname(String compname) {
        this.compname = compname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImgname() {
        return imgname;
    }

    public void setImgname(String imgname) {
        this.imgname = imgname;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getApply() {
        return apply;
    }

    public void setApply(Date apply) {
        this.apply = apply;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }
}
