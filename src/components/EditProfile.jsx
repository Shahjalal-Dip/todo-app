import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function EditProfile({ username }) {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({ name: "", email: "", phone: "", username: "", password: "", profile_picture: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newImage, setNewImage] = useState(null);  // Store new image file

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


    async function uploadImage(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "unsigned_upload");  // Replace with Cloudinary preset

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/demudmw7l/image/upload", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            return data.secure_url;  // Get the uploaded image URL
        } catch (err) {
            console.error("Upload failed:", err);
            return null;
        }
    }

    // Handle form submission
    async function handleSubmit(e) {
        e.preventDefault();

        let imageUrl = profile.profile_picture; // Keep existing image
        if (newImage) {
            imageUrl = await uploadImage(newImage);  // Upload new image
            if (!imageUrl) return toast.error("Image upload failed!");
        }

        const updatedProfile = { ...profile, profile_picture: imageUrl };

        try {
            const response = await fetch(`http://3.109.211.104:8001/profile/${username}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProfile)
            });

            if (!response.ok) throw new Error("Failed to update profile");

            toast.success("Profile updated successfully!");
            setProfile(updatedProfile);  // Update UI
        } catch (err) {
            toast.error("Error: " + err.message);
        }
    }

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container" style={{ display: "flex", flexDirection: "column" }}>
            <form onSubmit={handleSubmit} style={{ padding: "20px", border: "1px solid black", borderRadius: "10px" }}>
                <h2>Edit Profile</h2>

                <div className="editSection">
                    <label>Profile Picture:</label>
                    {profile.profile_picture && <img src={profile.profile_picture} alt="Profile" width={100} />}
                    <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
                </div>

                <div className="editSection">
                    <label>Name:</label>
                    <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required />
                </div>
                <div className="editSection">
                    <label>Email:</label>
                    <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />
                </div>

                <div className="editSection">
                    <label>Phone:</label>
                    <input type="phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} required />
                </div>

                <div className="editSection">
                    <label>Username:</label>
                    <input type="text" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} required />
                </div>
                <button className="danger-button" type="submit" >Save Changes</button>
            </form>
        </div>

    );
}


