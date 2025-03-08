package com.aswin.jobportal.controller;

import com.aswin.jobportal.model.JobDetails;
import com.aswin.jobportal.model.UserDetails;
import com.aswin.jobportal.service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
public class JobController {
    @Autowired
    UserDetailsService service;

    @PostMapping("/userdetails")
    public void addDetails(UserDetails user)
    {
        service.addDetails(user);
    }

    @PostMapping("/job")
    public void addJobDetails(@RequestPart("data") JobDetails detail, @RequestPart("img") MultipartFile file){

        service.addJobDetails(detail,file);
    }

    @GetMapping("/jobs")
    public List<JobDetails> getJobs()
    {
        return service.getJobs();
    }

    @PutMapping("/jobs")
    public void updatejobs(@RequestBody JobDetails details)
    {
        service.updatejobs(details);
    }

    @GetMapping("/internship")
    public List<JobDetails> getIntern()
    {
        return service.getIntern("internship");
    }

    @GetMapping("/intern/{id}")
    public byte[] getImg(@PathVariable int id)
    {
        return service.getImg(id);
    }

    @GetMapping("/job")
    public List<JobDetails> getJob()
    {
        return service.getJob();
    }

    @GetMapping("/job/{id}")
    public byte[] jobImage(@PathVariable int id)
    {
        return service.jobImage(id);
    }

    @GetMapping("/intern/profile/{keyword}")
    public List<JobDetails> getInternByProfile(@PathVariable String keyword)
    {
        System.out.println(keyword);
        return service.getInternByProfile(keyword);
    }

    @GetMapping("/intern/location/{keyword}")
    public List<JobDetails> getDetails(@PathVariable String keyword)
    {
        return service.getDetailsByLocation(keyword);
    }

    @GetMapping("/job/profile/{keyword}")
    public List<JobDetails> getJobByProfile(@PathVariable String keyword)
    {
        return service.getJobByProfile(keyword);
    }

    @GetMapping("/job/location/{keyword}")
    public List<JobDetails> getJobByLoc(@PathVariable String keyword)
    {
        return service.getJobByLoc(keyword);
    }

    @GetMapping("/jobdetail/{id}")
    public JobDetails getDetailById(@PathVariable int id)
    {
        return service.getDetailById(id);
    }
}
