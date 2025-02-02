function Home() {
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
            <a href="/login">
                <button className="primary-button">Get Started</button>
            </a>
        </div>
    );
}

export { Home };
