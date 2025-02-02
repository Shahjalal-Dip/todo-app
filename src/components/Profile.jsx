import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
export function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            const res = await fetch("http://3.109.211.104:8001/profile");
            const data = await res.json();
            setProfile(data);
        }
        fetchProfile();
    }, []);

    if (!profile) return <p>Loading...</p>;

    function edit(){
        navigate("/EditProfile")
    }
    return (
        <div>
            <h1>{profile.name}</h1>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
            <button onClick={edit}>Edit Profile</button>
        </div>
    );
}
