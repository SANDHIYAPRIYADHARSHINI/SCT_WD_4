import React ,{useState} from 'react'

function ToDoList() {
    const [tasks, setTasks] = useState(["Task 1", "Task 2", "Task 3"]);
    const [newTask, setNewTask] = useState('');
    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleAddTask() {
        if (newTask.trim() !== '') {
            setTasks(t=>[...t, newTask]);
            setNewTask('');
        }
    }

    function handleDeleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    return (<div className="todo-list">
        <h1> ToDo List </h1>

        <div>
            <input type="text"
                value={newTask}
                onChange={handleInputChange}
                placeholder="Enter a new task..."
            />
            <button className="add-button" onClick={handleAddTask}>Add</button>
        </div>
        <ol>
            {tasks.map((task, index) => (
                <li key={index}>
                    <span className="task-text">{task}</span>
                    <button className="delete-button" 
                    onClick={() => handleDeleteTask(index)}>Delete</button>
                    <button className="move-up-button"
                    onClick={() => moveTaskUp(index)}>👆</button>
                    <button className="move-down-button"
                    onClick={() => moveTaskDown(index)}>👇</button>
                </li>
            ))}
        </ol>
    </div>);
}
export default ToDoList