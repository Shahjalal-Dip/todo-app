import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile({ username }) {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

 
    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev//profile/${username}`);
                if (!response.ok) throw new Error("Failed to load profile");

                const data = await response.json();
                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [username]);

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="profile">
            {profile.profile_picture ? <img src={profile.profile_picture} alt="Profile" width={100} style={{borderRadius:"50%"}}/> : <p>No Image found</p>}
            <h2>{profile.name || "User"}</h2>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
            <p>Username: {profile.username}</p>
            
            <button onClick={() => navigate("/edit-profile")} className="danger-button">Edit Profile</button>
            <button onClick={() => navigate("/dashboard")} className="danger-button">Dashboard</button>
        </div>
    );
}
