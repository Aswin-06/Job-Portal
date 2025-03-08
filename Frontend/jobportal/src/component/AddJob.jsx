import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddJob()
{
    const [details,alterdetails]=useState({compname:"",address:"",location:"",type:"",job:"",salary:"",about:"",start:"",apply:"",skills:[""]});
    const [imgdetails,alterImgdetails]=useState(null);
    const [skill,alterskill]=useState("");
    const [skills,changeSkill]=useState([])
    const [token,altertoken]=useState(localStorage.getItem("token")||"");
    const navigate=useNavigate();

    useEffect(()=>
    {
        if(token=="")
            {
                navigate("/login")
            }
    },[])

    const updateimg=(e)=>
    {
        alterImgdetails(e.target.files[0]);
    }

    const updatedetails=(e)=>
    {
        const {name,value}=e.target;
        alterdetails({...details,[name]:value});
    }

    const updateskill=(e)=>
    {
        alterskill(e.target.value);
    }

    const add=(e)=>
    {
        if(skill!="")
        {
            changeSkill([...skills,skill]);
            alterskill("");
        }
    }

    function upload(e)
    {
        e.preventDefault();
        const updatedDetails = { ...details, skills };
        const data=new FormData();
        data.append("data",new Blob([JSON.stringify(updatedDetails)],{type:"application/json"}));
        data.append("img",imgdetails);
        try {
            axios.post("http://localhost:8080/job",data,
                {
                    headers:{
                        Authorization:`Bearer ${token}`,
                    }
                }
            )
        } catch (error) {
            console.log(error);
        }

    }

    return(
        <>
            <input type="text" name="compname" id="compname" placeholder="company name" onChange={updatedetails}/>
            <input type="text" name="address" id="address" placeholder="address" onChange={updatedetails}/>
            <input type="text" name="location" id="location" placeholder="location" onChange={updatedetails}/>
            <input type="text" name="type" id="type" placeholder="type" onChange={updatedetails}/>
            <input type="number" name="salary" id="salary" placeholder="salary" onChange={updatedetails}/>
            <input type="text" name="about" id="about" placeholder="about" onChange={updatedetails}/>
            <input type="date" name="start" id="start" placeholder="start date" onChange={updatedetails}/>
            <input type="date" name="apply" id="apply" placeholder="last date" onChange={updatedetails}/>
            <input type="text" name="skill" id="skill" placeholder="skills" onChange={updateskill}/>
            <input type="text" name="job" id="job" placeholder="job" onChange={updatedetails} />
            <button onClick={add}>add</button>
            <input type="file" onChange={updateimg}/>
            <button onClick={upload}>upload</button>
            <h2>{skills}</h2>
        </>
    )
}

export default AddJob;