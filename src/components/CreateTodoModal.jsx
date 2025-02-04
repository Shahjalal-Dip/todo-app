import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { useState } from 'react';
import toast from 'react-hot-toast';


export function CreateTodoModal({ updateTodos }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("0");

    async function createTodoClick() {
        const body = {
            title,
            description,
            deadline,
            priority: parseInt(priority),
        };

        const response = await fetch("https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log(data);
        toast.success("Todo created");

        // Reset input fields
        setTitle("");
        setDescription("");
        setDeadline("");
        setPriority("");
        setIsOpen(false);
        updateTodos();
    }

    return (
        <div className="create-todo-container">
            <br />
            <Button 
                onClick={() => setIsOpen(true)} 
                variant="contained" 
                size="large"
                className="create-todo-button"
            >
                Create
            </Button>

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="modal-container">
                    <div className="modal-content">
                        <h1 className="modal-title">Add a Todo</h1>
                        <br />
                        <TextField 
                            className="todo-input" 
                            placeholder="Title" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)} 
                        />
                        <br />
                        <TextField 
                            className="todo-input" 
                            placeholder="Description" 
                            value={description} 
                            onChange={e => setDescription(e.target.value)} 
                        />
                        <br />
                        <TextField 
                            className="todo-input" 
                            placeholder="Priority" 
                            value={priority} 
                            onChange={e => setPriority(e.target.value)} 
                        />
                        <br />
                        <TextField 
                            className="todo-input" 
                            type="date" 
                            value={deadline} 
                            onChange={e => setDeadline(e.target.value)} 
                        /> 
                        <br />
                        <Button 
                            className="submit-button" 
                            onClick={createTodoClick} 
                            fullWidth 
                            variant="contained" 
                            size="large"
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
