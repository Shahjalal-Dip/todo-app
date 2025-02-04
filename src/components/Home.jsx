import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>🚀 Welcome to the Todo App!</h1>
            <p>Organize your tasks efficiently and track your progress.</p>
            <button className="primary-button" onClick={() => navigate("/login")}>
                Get Started
            </button>
        </div>
    );
}

export { Home };
