package com.aswin.jobportal.service;

import com.aswin.jobportal.model.JobDetails;
import com.aswin.jobportal.model.UserDetails;
import com.aswin.jobportal.repository.JobRepo;
import com.aswin.jobportal.repository.UserDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class UserDetailsService {
    @Autowired
    UserDetailsRepo repo;

    @Autowired
    JobRepo jobRepo;

    public void addDetails(UserDetails user) {
        repo.save(user);
    }

    public void addJobDetails(JobDetails detail, MultipartFile file) {
        try{
            detail.setImgname(file.getOriginalFilename());
            detail.setImage(file.getBytes());
        } catch (IOException e) {
            System.out.println(e);
        }
        jobRepo.save(detail);
    }

    public List<JobDetails> getJobs() {
        return jobRepo.findAll();
    }

    public void updatejobs(JobDetails details) {
        jobRepo.save(details);
    }

    public List<JobDetails> getIntern(String internship) {
        return jobRepo.findByType(internship);
    }

    public byte[] getImg(int id) {
        return jobRepo.findById(id).orElse(new JobDetails()).getImage();
    }

    public List<JobDetails> getJob() {
        return jobRepo.findByType("job");
    }

    public byte[] jobImage(int id) {
        return jobRepo.findById(id).orElse(new JobDetails()).getImage();
    }

    public List<JobDetails> getInternByProfile(String keyword) {
        return jobRepo.findProfile(keyword);
    }

    public List<JobDetails> getDetailsByLocation(String keyword) {
        return jobRepo.searchByLocation(keyword);
    }

    public List<JobDetails> getJobByProfile(String keyword) {
        return jobRepo.getJobByProfile(keyword);
    }

    public List<JobDetails> getJobByLoc(String keyword) {
        return jobRepo.getJobByLoc(keyword);
    }

    public JobDetails getDetailById(int id) {
        return jobRepo.findById(id).orElse(new JobDetails());
    }
}
