import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    async function loginClick() {
        const body = {
            "username": username, 
            "password": pass
        }  
        const r = await fetch("https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const j = await r.json();
        if(j["access_token"]) {
            localStorage.setItem("username", username);
            toast.success("Logged in");
            navigate("/dashboard");
        }
        else {
            toast.error(j["detail"]);
        }
    }

    return <>
        <div className='container' style={{display:'flex', justifyContent:'center', alignItems: 'center', height: '80vh',width:'30vw'}}>
            <div>
                <div style={{fontSize:"40px", textAlign:'center'}}>Login</div>
                <br/>
                <br/>
                <div>
                    <TextField className='logintextField' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <br/>
                    <br/>
                    <TextField className='logintextField' type="password" placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)}  />
                </div>
                <br/>
                <br/>
                <center>
                    <Button style={{backgroundColor:"blue",color:"white"}} onClick={loginClick} variant="outlined" size='large'>Login</Button>
                </center>
                <br/>
                <div style={{marginLeft:"18px"}}>
                   Do not have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    </>
}

export { Login }