import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css"

function Login()
{
    const [userdata,alterUserdata]=useState({username:"",password:""});
    const [token,alterToken]=useState("");
    const navigate=useNavigate();

    function update(event)
    {
        const {name,value}=event.target;
        alterUserdata({...userdata,[name]:value});
    }

    function log(event)
    {
        event.preventDefault();
        const fetch=async () => {
            try
            {
                const response=await axios.post("http://localhost:8080/login",userdata);
                alterToken(response.data);
                localStorage.setItem("token",response.data);
                navigate('/',{state:{value:response.data}});
            }
            catch(error)
            {
                console.log(error);
            }
        }
        fetch();
    }

    function create()
    {
        try {
            axios.post("http://localhost:8080/register",userdata);
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <>
            <div className={style.div}>
                <h1 className={style.head}>User Login</h1>
                <p className={style.user}>Username</p>
                <input type="text" placeholder="username" name="username" onChange={update} className={style.input1}/>
                <p className={style.password}>Password</p>
                <input type="text" placeholder="password" name="password" onChange={update} className={style.input2}/>
                <button className={style.login} onClick={log}>Login</button>
                <button className={style.create} onClick={create}>Create</button>
            </div>
        </>
    )
}

export default Login;