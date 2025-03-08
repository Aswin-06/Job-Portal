import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./Job.module.css"
import NavBar from "./NavBar";
import { FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign, FaClock } from "react-icons/fa";

function Intern()
{
    const {id}=useParams();
    const [jobdetail,alterdetail]=useState({});
    const token=localStorage.getItem("token");
    const navigate =useNavigate();

    useEffect(()=>
    {
        const fetch=async () => {
            try {
                const response= await axios.get(`http://localhost:8080/jobdetail/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json"
                    }
                });
                getImage(response.data);
            } catch (error) {
                
            }
        }
        fetch();
    },[])

    async function getImage(detail)
    {
        try {
            const response=await axios.get(`http://localhost:8080/job/${id}`,{
                responseType:"blob",
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                }
            });
            const imageUrl=URL.createObjectURL(response.data);
            detail={...detail,imageUrl};
            alterdetail(detail);
        } catch (error) {
            
        }
    }

    const tags=jobdetail.skills?.map((skill) => (
            <p className={style.skill}> {skill}</p>
        )
        )

    function apply(e)
    {
        e.preventDefault();
        alert("Applied successful")
        navigate("/internships")
    }
    return(
        <>
            <NavBar/>
            <p className={style.job}>{jobdetail.job}</p>
            <p className={style.compname}>{jobdetail.compname}</p>
            <p className={style.address}><FaMapMarkerAlt/>{jobdetail.address}</p>
            <p className={style.salary}><FaRupeeSign/>{jobdetail.salary}</p>
            <p className={style.about}>{jobdetail.about}</p>
            <p className={style.start}>Starting At : {new Date(jobdetail.start).toLocaleDateString()}</p>
            <p className={style.apply}>Last Date : {new Date(jobdetail.apply).toLocaleDateString()}</p>
            <p className={style.about1}>About : </p>
            <img className={style.img} src={jobdetail.imageUrl} alt={jobdetail.imgname} />
            <p className={style.head}>Skills Required : </p>
            <div className={style.div}>{tags}</div>
            <button className={style.button} onClick={apply}>Apply</button>
            
        </>
    )
}

export default Intern;