'use client'
import Link from "next/link";
import {useTasks} from "@/context/taskContext";
import {Layout} from "@/components/Layout";
import {VscTrash, VscTasklist} from "react-icons/vsc";
import { toast } from "react-hot-toast";

export default function Home() {
  const {tasks, deleteTask} = useTasks();

  return (
      <Layout>
        <div className="justify-center flex">
          {tasks.length === 0 ? (
              <div className="block">
                <h2 className="text-2xl">There are no tasks</h2>
                <VscTasklist size="8rem"/>
              </div>
          ) : (
              <div className="w-full">
                {tasks.map((task:any, i:any) => (
                    <div className="bg-gray-1000  px-20 py-5 m-2 flex flex-wrap">
                      <Link
                          key={task.id}
                          href={`/edit/${task.id}`}
                          className="bg-gray-700 hover:bg-gray-600 item-center cursor-pointer px-20 py-5 m-2 flex justify-start rounded-md"
                      >
                        <span className="text-5xl mr-5">{i + 1}</span>
                        <div className="w-full">
                          <div className="flex justify-between">
                            <h1 className="font-bold">{task.title}</h1>
                          </div>
                          <p className="text-gray-300">{task.description}</p>
                          <span className="text-gray-400">{task.id}</span>
                        </div>
                      </Link>
                      <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteTask(task.id)
                            toast.success("Task deleted successfully");
                          }}
                          className="bg-gray-700 hover:bg-red-600 mx-0 my-2  flex-none flex inline-flex items-center justify-center w-9 h-9 rounded-md   ">
                        <VscTrash/>
                      </button>
                    </div>
                ))}
              </div>
          )}
        </div>
      </Layout>
  )
}
