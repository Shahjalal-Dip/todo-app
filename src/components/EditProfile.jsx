import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function EditProfile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [imageFile, setImageFile] = useState(null);
    
    useEffect(() => {
        async function fetchProfile() {
            const res = await fetch("http://3.109.211.104:8001/profile");
            const data = await res.json();
            setProfile(data);
            setName(data.name);
            setEmail(data.email);
            setPhone(data.phone);
            setProfilePic(data.profile_picture);
        }
        fetchProfile();
    }, []);

    // Function to handle file selection
    function handleFileChange(e) {
        setImageFile(e.target.files[0]);
    }

    // Function to upload image to Cloudinary
    async function uploadImage() {
        if (!imageFile) return null;

        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "unsigned_upload"); // Replace with your Cloudinary preset

        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/demudmw7l/image/upload", // Replace 'your_cloud_name'
                formData
            );
            console.log("Uploaded Image URL:", res.data.secure_url);
            return res.data.secure_url;
        } catch (err) {
            console.error("Image upload failed:", err);
            toast.error("Image upload failed!");
            return null;
        }
    }

    // Function to update profile
    async function updateProfile() {
        const uploadedImageUrl = await uploadImage(); 
        const updatedProfile = {
            name,
            email,
            phone,
            profile_picture: uploadedImageUrl || profilePic // Use uploaded URL or existing
        };
        setProfilePic(uploadedImageUrl)
        
        setName("");
        setEmail("");
        setPhone("");
        
        console.log("Updated Profile Data:", updatedProfile); // Debugging
    
        const res = await fetch("http://3.109.211.104:8001/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProfile)
        });
    
        const data = await res.json();
        toast.success("Profile updated!");
        navigate("/profile");
        console.log("Server Response:", data); // Debugging
    }
    

    if (!profile) return <p>Loading...</p>;

    return (
        <div className="container" style={{ textAlign: "center", padding: "20px" }}>
            <h2>Edit Profile</h2>
            <img 
                src={profilePic || "https://via.placeholder.com/150"} 
                alt="Profile" 
                style={{ width: "150px", height: "150px", borderRadius: "50%" }} 
            />
            <br /><br />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <br /><br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <br /><br />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <br /><br />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
            <br /><br />
            <button onClick={updateProfile} className="primary-button">Update Profile</button>
        </div>
    );
}
