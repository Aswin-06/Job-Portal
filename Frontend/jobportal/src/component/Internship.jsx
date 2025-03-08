import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign, FaClock } from "react-icons/fa";
import {format} from "date-fns";
import style from "./Internship.module.css"
import NavBar from "./NavBar";

function Internship()
{
    const [details,alterdetails]=useState([]);
    const [token,altertoken]=useState(localStorage.getItem("token")||"");
    const navigate=useNavigate();
    const [keyword,alterKeyword]=useState("")
    const [location,alterlocation]=useState("")

    useEffect(()=>
    {
        const fetch=async (params) => {
            try {
                const response=await axios.get("http://localhost:8080/internship",
                {
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json"
                    }
                }
                );
                getImage(response.data);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetch();

    },[])


    function getImage(internships)
    {
        if(internships.length==0)
        {
            return;
        }
        const updateImg=[...internships]
        const fetch=async () => {
            for(let i=0;i<updateImg.length;i++)
            {
                let detail=updateImg[i];
                try {
                    const response=await axios.get(`http://localhost:8080/intern/${detail.id}`,
                    {
                        responseType:"blob",
                        headers:{
                            Authorization:`Bearer ${token}`,
                            "Content-Type":"application/json"
                        }
                    }
                    );
                    const imageUrl=URL.createObjectURL(response.data);
                    updateImg[i]={...updateImg[i],imageUrl}

                } catch (error) {
                    console.log(error);
                }
            }
            alterdetails(updateImg);
        }
        if(internships.length>0)
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
                const response=await axios.get(`http://localhost:8080/intern/profile/${keyword}`,{
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
                const response=await axios.get(`http://localhost:8080/intern/location/${location}`,{
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
        <Link to={`/intern/${detail.id}`} key={detail.id} style={{textDecoration:"none",color:"black"}}>
            <div className={style.block}>
                <p className={style.job}>{detail.job}</p>
                <p className={style.name}>{detail.compname}</p>
                <img src={detail.imageUrl} className={style.img} alt={detail.imgname}/>
                <div className={style.div}>
                    <p className={style.salary}><FaRupeeSign/>{detail.salary}</p>
                    <p className={style.location}><FaMapMarkerAlt/>{detail.location}</p>
                    <p className={style.date}>Starting At : {format(detail.start, 'dd-MM-yyyy')}</p>
                </div>
                
            </div>
        </Link>)

    return(
        <>
            <NavBar className={style.stick}></NavBar>
            <div className={style.search}>
                <h1 className={style.heading}>Search</h1>
                <h3 className={style.jobser}>Jobs</h3>
                <input className={style.input1} type="text" onChange={change} placeholder="eg : content writing" />
                <button className={style.button1} onClick={getData}>Search By Jobs</button>
                <h3 className={style.locser}>Location</h3>
                <input className={style.input2} type="text" onChange={changeLocation} placeholder="eg : tamil nadu" />
                <button className={style.button2} onClick={getDataByLoc}>Search By Location</button>
            </div>
            <div className={style.intern}>
                {tags}
            </div>
        </>
    )
}

export default Internship;