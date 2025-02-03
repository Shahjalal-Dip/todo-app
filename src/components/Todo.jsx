import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

export function Todo({ title, description, is_completed, priority, id, updateTodos, deadline  }) {
    const [timeLeft, setTimeLeft] = useState("");

    async function deleteClick() {
        const r = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/${id}`, {
            method: "DELETE"
        });
        const j = await r.json();
        toast.success(j.message);
        updateTodos();
    }

    async function completeTodo() {
        const r = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({is_completed:true})
        });
        const j = await r.json();
        console.log(j); // Log the response for debugging
        if (j.success) {
            toast.success("Task marked as completed!");
            updateTodos();
        } else {
            toast.error("Failed to mark task as completed.");
        }
    }

    useEffect(() => {
        function updateCountdown() {
            const now = new Date();
            const deadlineTime = new Date(deadline);
            const diff = deadlineTime - now;

            if (diff > 0) {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeLeft("Time expired!");
            }
        }

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [deadline]);

    return (
        <div className='todo-item' style={{ backgroundColor: priority > 8 ? "rgba(190, 14, 14, 0.3)" : "rgba(0,255,0,0.3)"}}>
            <div style={{fontSize: "25px", textDecoration: is_completed ? "line-through" : "",}}>
                {is_completed ? "✅" : "⌛"} {title}
            </div>
            <div style={{paddingTop:"10px"}}>{description}</div>
            <div>
            <p>Time left: {timeLeft}</p>
           </div>
            <div style={{ display:'flex', width:'100%', justifyContent:"space-between" }}>
                {!is_completed && (
                    <Button variant="contained" color="success" onClick={completeTodo}>Complete</Button>
                )}
                <div onClick={deleteClick} style={{ fontSize: "25px", cursor: "pointer" }}>❌</div>
            </div>
        </div>
    );
}
