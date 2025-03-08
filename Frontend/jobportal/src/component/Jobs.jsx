import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Jobs.module.css"
import { FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign, FaClock } from "react-icons/fa";
import NavBar from "./NavBar";

function Jobs()
{
    const [details,alterdetails]=useState([]);
    const [token,altertoken]=useState(localStorage.getItem("token")||"");
    const [keyword,alterKeyword]=useState("");
    const [location,alterlocation]=useState("");

    useEffect(()=>
    {
        const fetch=async () => {
            try {
                const response=await axios.get("http://localhost:8080/job",{
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json"
                    }
                });
                getImage(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    },[])

    function getImage(jobs)
    {
        const imgdetails=[...jobs];
        const fetch=async () => {
            for(let i=0;i<imgdetails.length;i++)
            {
                const img=imgdetails[i];
                try {
                    const response=await axios.get(`http://localhost:8080/job/${img.id}`,
                        {
                            responseType:"blob",
                            headers:
                            {
                                Authorization:`Bearer ${token}`,
                                "Content-Type":"application/json"
                            }
                        }
                    );
                    const imageUrl=URL.createObjectURL(response.data);
                    imgdetails[i]={...imgdetails[i],imageUrl}
                } catch (error) {
                    console.log(error);
                }
            }
            alterdetails(imgdetails);
        }
        if(jobs.length>0)
        {
            fetch();
        }
    }

    function change(e){
        alterKeyword(e.target.value);
    }

    function getData(e)
    {
        e.preventDefault();
        const fetch=async () => {
            try {
                const response=await axios.get(`http://localhost:8080/job/profile/${keyword}`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json"
                    }
                });
                getImage(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    }

    function changeLocation(e)
    {
        alterlocation(e.target.value);
    }

    function getDataByLoc(e)
    {
        e.preventDefault();
        const fetch=async () => {
            try {
                const response=await axios.get(`http://localhost:8080/job/location/${location}`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json"
                    }
                });
                getImage(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    }

    const tags=details.map((detail)=>
    <Link to={`/job/${detail.id}`} className={style.text} key={detail.id}>
        <div className={style.div}>
            <img src={detail.imageUrl} alt={detail.imgname} className={style.img} />
            <p className={style.job}>{detail.job}</p>
            <p className={style.name}>{detail.compname}</p>
            <div className={style.flex}>
                <p className={style.loc}><FaMapMarkerAlt/>{detail.location}</p>
                <p className={style.salary}><FaRupeeSign/>{detail.salary}</p>
                <p className={style.date}>Starting At : {new Date(detail.start).toLocaleDateString()}</p>
            </div>
        </div>
    </Link>)



    return(
        <>
            <NavBar/>
            <div className={style.search}>
                <h1 className={style.heading}>Search</h1>
                <h3 className={style.jobser}>Jobs</h3>
                <input className={style.input1} type="text" onChange={change} placeholder="eg : content writing" />
                <button className={style.button1} onClick={getData}>Search By Jobs</button>
                <h3 className={style.locser}>Location</h3>
                <input className={style.input2} type="text" onChange={changeLocation} placeholder="eg : tamil nadu" />
                <button className={style.button2} onClick={getDataByLoc}>Search By Location</button>
            </div>
            <div className={style.jobs}>{tags}</div>
        </>
    )
}

export default Jobs;