import { useState, useEffect } from 'react'
import Task from './Task'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch('http://3.19.239.239:8000/tasks');
            const data = await res.json();
            setTasks(data);
        };

        fetchTasks();
    }, []);

    const addTask = async () => {
        const res = await fetch('http://3.19.239.239:8000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: Date.now().toString(), name: taskName }),
        });
        const data = await res.json();
        setTasks([...tasks, data]);
        setTaskName("");
    };

    const deleteTask = async (id) => {
        await fetch(`http://3.19.239.239:8000/tasks/${id}`, { method: 'DELETE' });
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <input
                type="text"
                placeholder="Add task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
            <div>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} onDelete={deleteTask} />
                ))}
            </div>
        </div>
    );
}

export default App
