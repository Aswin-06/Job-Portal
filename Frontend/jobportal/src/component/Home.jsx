import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import style from "./Home.module.css"
import { format } from "date-fns";

function Home()
{
    const [token,alterToken]=useState(localStorage.getItem("token")||"");
    const [jobdata,alterData]=useState([]);
    const [interndata,alterintern]=useState([])
    const navigate=useNavigate();

    useEffect(()=>
    {
        const fetch=async () => {
            try {
                const response=await axios.get("http://localhost:8080/internship",{
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json"
                    }
                });
                fetchimage(response.data,1);
                const res=await axios.get("http://localhost:8080/job",{
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json"
                    }
                })
                fetchimage(res.data,2);
            } catch (error) {
                console.log(error);
                navigate("/login")
            }
        }
        fetch()
    },[])

    async function fetchimage(details,a)
    {
        
        if(details.length===0)
        {
            return;
        }
        for(let i=0;i<details.length;i++)
        {
            try {
                const response=await axios.get(`http://localhost:8080/intern/${details[i].id}`,{
                    responseType:"blob",
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json"
                    }
                })
                const imageUrl=URL.createObjectURL(response.data);
                details[i]={...details[i],imageUrl};
            } catch (error) {
                console.log(error);
            }
        }
        if(a===1)
        {
            alterintern(details);
        }
        else
        {
            alterData(details);
        }
    }
    
    const tags=jobdata.map((detail)=>
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
                    <p className={style.type}>Job</p>
                </div>
            </Link>)

    const tags1=interndata.map((detail)=>
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
                <p className={style.type}>Internship</p>
            </div>
        </Link>)

    return(
        <>
            <NavBar/>
            <h1 className={style.head1}><b>Latest Internships</b></h1>
            <div className={style.intern}>
                {tags1}
            </div>
            <h1 className={style.head2}><b>Latest Jobs</b></h1>
            <div className={style.jobs}>{tags}</div>
        </>
    )
}

export default Home;