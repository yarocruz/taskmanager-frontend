
const Task = ({ task, onDelete }) => {
    return (
        <div>
            <h3>
                {task.name} <button onClick={() => onDelete(task.id)}>Delete</button>
            </h3>
        </div>
    );
};

export default Task;
