'use client'
import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState([
        {
            id: "1",
            title: "first task",
            description: "esta es la primera tarea",
        },
    ]);

    const createTask = (title, description) => {
        return setTasks([...tasks, { title, description, id: uuid() }]);
    };

    const updateTask = (id, updatedTask) => {
        setTask([
            ...tasks.map((task) =>
                task.id === id ? { ...task, ...updatedTask } : task
            ),
        ]);
    };

    const deleteTask = (id) =>
        setTasks([...tasks.filter((task) => task.id !== id)]);

    return (
        <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
