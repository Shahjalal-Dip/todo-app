import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    async function loginClick() {
        const body = {
            "username": username, 
            "password": pass
        }  
        const r = await fetch("http://3.109.211.104:8001/login", {
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
        <div style={{display:'flex', justifyContent:'center', alignItems: 'center', height: '100vh'}}>
            <div>
                <div style={{fontSize:"40px", textAlign:'center'}}>Login</div>
                <br/>
                <br/>
                <div>
                    <TextField placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <br/>
                    <br/>
                    <TextField type="password" placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)}  />
                </div>
                <br/>
                <br/>
                <center>
                    <Button onClick={loginClick} variant="outlined" size='large'>Login</Button>
                </center>
                <br/>
                <br/>
                <div>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    </>
}

export { Login }