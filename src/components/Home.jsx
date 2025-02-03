import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate(); // Hook to navigate

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh', 
            backgroundColor: '#f4f4f4' 
        }}>
            <h1>🚀 Welcome to the Todo App!</h1>
            <p>Organize your tasks efficiently and track your progress.</p>
            <button className="primary-button" onClick={() => navigate("/login")}>
                Get Started
            </button>
        </div>
    );
}

export { Home };
