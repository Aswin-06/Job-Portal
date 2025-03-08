package com.aswin.jobportal.repository;

import com.aswin.jobportal.model.JobDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<JobDetails,Integer> {

    List<JobDetails> findByType(String internship);

    @Query("select p from JobDetails p where lower(p.job) like lower(concat('%',:keyword,'%')) and p.type = 'internship' ")
    public List<JobDetails> findProfile(String keyword);

    @Query("select p from JobDetails p where lower(p.location) like lower(concat('%',:keyword,'%')) and p.type='internship'")
    List<JobDetails> searchByLocation(String keyword);

    @Query("select p from JobDetails p where lower(p.job) like lower(concat('%',:keyword,'%')) and p.type = 'job'")
    List<JobDetails> getJobByProfile(String keyword);

    @Query("select p from JobDetails p where lower(p.location) like lower(concat('%',:keyword,'%')) and p.type='job'")
    List<JobDetails> getJobByLoc(String keyword);
}
