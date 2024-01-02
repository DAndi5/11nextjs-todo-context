'use client'
import {useState} from "react";
import {Layout} from "@/components/Layout";
import {useTasks} from "@/context/taskContext";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";

const TaskFormPage = () => {

    const [task, setTask] = useState(
        {
            title: "",
            description: "",
        },
    );

    const {createTask} = useTasks();
    const router = useRouter();

    const handleChange = (e:any) => {
        const {name, value} = e.target;
        setTask({...task, [name]: value});
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();

        createTask(task.title, task.description);
        toast.success("Task created successfully");
        router.push("/");
    };

    return (
        <Layout>
            <div className="flex justify-center items-center h-full">
                <form onSubmit={handleSubmit} className="bg-gray-700 p-10 h-2/4">
                    <h1 className="text-3xl mb-7">"CREATE A TASK"</h1>
                    <input
                        value={task.title}
                        onChange={handleChange}
                        type="text"
                        name="title"
                        placeholder="Write a title"
                        className="bg-gray-800 focus:text-gray-100
        focus:outline-none py-3 px-4 mb-5 w-full"
                    />
                    <textarea
                        value={task.description}
                        name="description"
                        onChange={handleChange}
                        rows={2}
                        placeholder="Write a description"
                        className="bg-gray-800 focus:text-gray-100
        focus:outline-none py-3 px-4 mb-5 w-full"
                    />
                    <button
                        className="bg-green-600 hover:bg-green-500 px-4 py-2
        rounded-sm disabled:opacity-30"
                        disabled={!task.title}
                    >
                        Save
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default TaskFormPage;
