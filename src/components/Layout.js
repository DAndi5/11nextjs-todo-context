import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { useTasks } from "../context/taskContext";

export const Layout = ({ children }) => {
  const { tasks } = useTasks();
  return (
    <div className="h-screen bg-gray-900 text-white">
      <header className="bg-gray-800  flex px-28 py-5 items-center">
        <Link href="/">
            <h1 className="font-black text-lg">Task App</h1>
        </Link>
        <span className="ml-2 text-gray-400 font-bold">{tasks.length} Tasks</span>
        <div className="flex-grow text-right">
            <Link
                href={`/new`}
                className="bg-green-600 hover:bg-green-500
           px-5 py-2 inline-flex items-center text-bold rounded-sm"
            >
                <AiOutlinePlus className="mr-2" />
                Add Task
            </Link>
        </div>
      </header>
      <main className="px-28 py-10 flex items-center">{children}</main>
    </div>
  );
};
