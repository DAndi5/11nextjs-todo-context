'use client'
import React, {useEffect, useState} from "react";
import {useTasks} from "@/context/taskContext";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";
import {Dialog} from '@headlessui/react'

type Props = {
    params: {
        id: string;
    };
};

const TaskFormPage = ({params: {id}}: Props) => {
    const [isOpen, setIsOpen] = useState(true);

    const [task, setTask] = useState(
        {
            title: "",
            description: "",
        },
    );

    const {createTask, updateTask, tasks} = useTasks();
    const router = useRouter();

    const handleChange = (e:any) => {
        const {name, value} = e.target;
        setTask({...task, [name]: value});
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (!id) {
            createTask(task.title, task.description);
            toast.success("Task created successfully");
        } else {
            updateTask(id, task);
            toast.success("Task updated successfully");
        }
        router.push("/");
    };

    useEffect(() => {
        if (id) {
            const taskFound = tasks.find((task:any) => task.id === id);
            setTask({title: taskFound.title, description: taskFound.description});
        }
    }, []);
    return (

        <Dialog
            open={isOpen}
            onClose={() => {
                setIsOpen(false);
                router.back();
            }}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

            <div className="fixed inset-0 overflow-y-auto">
                {/* Container to center the panel */}
                <div className="flex min-h-full items-center justify-center p-4">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-10">


                        <div className="flex justify-center items-center h-full">
                            <form onSubmit={handleSubmit}>
                                <h1 className="text-3xl mb-7">{id ? "UPDATE A TASK" : "CREATE A TASK"}</h1>
                                <input
                                    value={task.title}
                                    onChange={handleChange}
                                    type="text"
                                    name="title"
                                    placeholder="Write a title"
                                    className="bg-gray-200 focus:text-gray-1000
        focus:outline-none py-3 px-4 mb-5 w-full"
                                />
                                <textarea
                                    value={task.description}
                                    name="description"
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder="Write a description"
                                    className="bg-gray-200 focus:text-gray-1000
        focus:outline-none py-3 px-4 mb-5 w-full"
                                />
                                <button
                                    className="py-2 button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black rounded-sm disabled:opacity-10"
                                    disabled={!task.title}>
                                    Save
                                </button>
                            </form>
                        </div>

                        <button onClick={() => window.location.reload()}
                                className="py-2 my-2 button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent rounded-sm hover:text-black">
                            View full details
                        </button>

                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
};

export default TaskFormPage;
