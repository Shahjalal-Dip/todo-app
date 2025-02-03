import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    // useEffect(() => {
    //     async function fetchProfile() {
    //         const res = await fetch("http://3.109.211.104:8001/profile");
    //         const data = await res.json();
    //         setProfile(data);
    //     }
    //     fetchProfile();
    // }, []);
    async function fetchProfile() {
        try {
            const res = await fetch("http://3.109.211.104:8001/user/1"); // Replace with correct API
            const data = await res.json();
            setProfile(data);
            localStorage.setItem("profile", JSON.stringify(data)); // ✅ Store updated profile
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }
    
    useEffect(() => {
        const storedProfile = localStorage.getItem("profile");
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }
        fetchProfile();
    }, []);
    
    if (!profile) return <p>Loading...</p>;

    return (
        <div className="container" style={{ textAlign: "center", padding: "20px" }}>
            <h1>{profile.name}</h1>
            <img 
                src={profile.profile_picture ? profile.profile_picture : "https://via.placeholder.com/150"} 
                alt="Profile" 
                style={{ 
                    width: "150px", 
                    height: "150px", 
                    borderRadius: "50%", 
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
                }} 
            />
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
            <button onClick={() => navigate("/edit-profile")} className="primary-button">Edit Profile</button>
        </div>
    );
}
