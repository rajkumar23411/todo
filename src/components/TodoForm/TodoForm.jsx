import { useState } from "react";
import { useTodo } from "../../context";

const TodoForm = () => {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo) return;
        addTodo({
            todo,
            completed: false,
        });
        setTodo("");
    };
    return (
        <form
            className="w-[30rem] mt-10 flex bg-white rounded-md h-12 overflow-hidden"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder="Write your todo here..."
                className="w-full bg-transparent h-full pl-2 focus:outline-none border-2 border-black/20 border-r-transparent rounded-l-md"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button
                type="submit"
                className={`w-max h-full ${
                    !todo
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                } text-white px-4`}
            >
                Add
            </button>
        </form>
    );
};

export default TodoForm;
