import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "./Todo";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { CreateTodoModal } from "./CreateTodoModal";
import toast from 'react-hot-toast';
import { Statistics } from "./Statistics";
// import "./Dashboard.css"; // Import the CSS

export function Dashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    const [todolist, setTodoList] = useState([]);
    const [search, setSearch] = useState("");
    const [filterPriority, setFilterPriority] = useState("");
    const [sortBy, setSortBy] = useState("");

    async function getTodos() {
        const r = await fetch("https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todos");
        const j = await r.json();
        setTodoList(j);
        console.log(j);
    }

    useEffect(() => {
        if (!username) navigate("/login");
        getTodos();
    }, []);

    function logoutClick() {
        localStorage.removeItem("username");
        toast.success("Logged out successfully");
        navigate("/login");
    }

    function sortedAndFilteredTodos() {
        let filtered = todolist.filter(todo => filterPriority === "" ||
            (filterPriority === "high" && todo.priority > 8) ||
            (filterPriority === "medium" && todo.priority > 5 && todo.priority <= 8) ||
            (filterPriority === "low" && todo.priority <= 5))
            .filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));

        if (sortBy === "creation") {
            filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        } else if (sortBy === "deadline") {
            filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        } else if (sortBy === "priority") {
            filtered.sort((a, b) => b.priority - a.priority);
        }

        return filtered;
    }

    return (
        <div className="container">
            <h1>Welcome, {username}!</h1>
            <div className="button-container">
                <Button className="profile-button" variant="contained" size="large" onClick={() => navigate("/profile")}>Profile</Button>
                <Button className="logout-button" variant="contained" size="large" onClick={logoutClick}>Logout</Button>
            </div>
            <form className="taskForm">
                <TextField fullWidth placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
                <select onChange={(e) => setFilterPriority(e.target.value)}>
                    <option value="">All</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                </select>
                <select onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">Sort by</option>
                    <option value="creation">Creation Time</option>
                    <option value="deadline">Deadline</option>
                    <option value="priority">Priority</option>
                </select>
            </form>
            <div className="task-list">
                {sortedAndFilteredTodos().map(todo => <Todo {...todo} key={todo.id} updateTodos={getTodos} />)}
            </div>
            <CreateTodoModal updateTodos={getTodos} />
            <Statistics todos={todolist} />
        </div>
    );
}
