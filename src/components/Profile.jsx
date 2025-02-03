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
                const response = await fetch(`http://3.109.211.104:8001/profile/${username}`);
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
        <div className="container" style={{ padding: "20px", border: "1px solid black", borderRadius: "10px" }}>
            <h2>{profile.name || "User"}</h2>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
            <p>Username: {profile.username}</p>
            {profile.profile_picture ? <img src={profile.profile_picture} alt="Profile" width={100} /> : <p>No Image</p>}
            <button onClick={() => navigate("/edit-profile")} className="danger-button">Edit Profile</button>
        </div>
    );
}
