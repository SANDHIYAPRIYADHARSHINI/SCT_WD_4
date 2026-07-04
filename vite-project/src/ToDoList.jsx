import React, { useState } from 'react';
import './ToDoList.css';

function ToDoList() {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Task 1", completed: false, dueDate: '', dueTime: '' },
        { id: 2, text: "Task 2", completed: false, dueDate: '', dueTime: '' },
        { id: 3, text: "Task 3", completed: false, dueDate: '', dueTime: '' },
    ]);
    const [newTask, setNewTask] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editTime, setEditTime] = useState('');

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleAddTask() {
        if (newTask.trim() !== '') {
            const task = {
                id: Date.now(),
                text: newTask,
                completed: false,
                dueDate: newDate,
                dueTime: newTime,
            };
            setTasks(t => [...t, task]);
            setNewTask('');
            setNewDate('');
            setNewTime('');
        }
    }

    function handleAddKeyDown(event) {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    }

    function handleDeleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function handleToggleComplete(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = {
            ...updatedTasks[index],
            completed: !updatedTasks[index].completed,
        };
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

    function startEditing(task) {
        setEditingId(task.id);
        setEditText(task.text);
        setEditDate(task.dueDate);
        setEditTime(task.dueTime);
    }

    function cancelEditing() {
        setEditingId(null);
        setEditText('');
        setEditDate('');
        setEditTime('');
    }

    function saveEdit(index) {
        if (editText.trim() === '') return;
        const updatedTasks = [...tasks];
        updatedTasks[index] = {
            ...updatedTasks[index],
            text: editText,
            dueDate: editDate,
            dueTime: editTime,
        };
        setTasks(updatedTasks);
        cancelEditing();
    }

    function handleEditKeyDown(event, index) {
        if (event.key === 'Enter') {
            saveEdit(index);
        } else if (event.key === 'Escape') {
            cancelEditing();
        }
    }

    // Formats dueDate/dueTime for a short, readable display badge
    function formatDueBadge(dueDate, dueTime) {
        if (!dueDate && !dueTime) return null;
        let label = '';
        if (dueDate) {
            const d = new Date(`${dueDate}T${dueTime || '00:00'}`);
            label = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        }
        if (dueTime) {
            const [h, m] = dueTime.split(':');
            const d = new Date();
            d.setHours(Number(h), Number(m));
            label += (label ? ' · ' : '') + d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
        }
        return label;
    }

    return (
        <div className="todo-list">
            <h1>ToDo List</h1>

            <div className="add-task-row">
                <input
                    type="text"
                    className="task-input"
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyDown={handleAddKeyDown}
                    placeholder="Enter a new task..."
                />
                <div className="datetime-inputs">
                    <input
                        type="date"
                        className="date-input"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                    />
                    <input
                        type="time"
                        className="time-input"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                    />
                </div>
                <button className="add-button" onClick={handleAddTask}>Add</button>
            </div>

            <ol>
                {tasks.map((task, index) => {
                    const isEditing = editingId === task.id;
                    const dueBadge = formatDueBadge(task.dueDate, task.dueTime);

                    return (
                        <li key={task.id} className={task.completed ? 'completed' : ''}>
                            {isEditing ? (
                                <div className="edit-row">
                                    <input
                                        type="text"
                                        className="edit-text-input"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        onKeyDown={(e) => handleEditKeyDown(e, index)}
                                        autoFocus
                                    />
                                    <input
                                        type="date"
                                        className="edit-date-input"
                                        value={editDate}
                                        onChange={(e) => setEditDate(e.target.value)}
                                    />
                                    <input
                                        type="time"
                                        className="edit-time-input"
                                        value={editTime}
                                        onChange={(e) => setEditTime(e.target.value)}
                                    />
                                    <button className="save-button" onClick={() => saveEdit(index)}>Save</button>
                                    <button className="cancel-button" onClick={cancelEditing}>Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <input
                                        type="checkbox"
                                        className="complete-checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleComplete(index)}
                                    />
                                    <div className="task-info">
                                        <span className="task-text">{task.text}</span>
                                        {dueBadge && <span className="due-badge">{dueBadge}</span>}
                                    </div>
                                    <button className="edit-button" onClick={() => startEditing(task)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDeleteTask(index)}>Delete</button>
                                    <button className="move-up-button" onClick={() => moveTaskUp(index)}>👆</button>
                                    <button className="move-down-button" onClick={() => moveTaskDown(index)}>👇</button>
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

export default ToDoList;