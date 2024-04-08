import React, { useEffect, useRef } from "react";
import { useTodo } from "../../context";

const TodoItem = ({ todo }) => {
    const [isTodoEditable, setIsTodoEditable] = React.useState(false);
    const ref = useRef(null);
    const [todoMsg, setTodoMsg] = React.useState(todo.todo);
    const { deleteTodo, toggleTodoStatus, updateTodo } = useTodo();

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false);
    };

    const handleToggleTodoComplete = () => {
        toggleTodoStatus(todo.id);
    };

    useEffect(() => {
        if (isTodoEditable) {
            ref.current.focus();
        }
    }, [isTodoEditable]);

    return (
        <div
            className={`flex flex-col w-72 h-max rounded-lg p-4 text-black  ${
                todo.completed
                    ? "bg-[#c6e9a7]"
                    : "bg-white border border-black/30"
            }`}
        >
            <input
                type="text"
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
                className={`h-12 w-full bg-transparent focus:outline-none
                } ${
                    todo.completed && !isTodoEditable
                        ? "line-through font-medium"
                        : "font-medium tracking-tight"
                }`}
                ref={ref}
            />
            <small className="text-xs text-gray-600/40 font-medium">
                {todo.date
                    ? `Added on ${new Date(todo.date).toLocaleDateString()} at 
                    ${new Date(todo.date).toLocaleTimeString()}`
                    : ""}
            </small>
            <div className="w-full flex items-center justify-between px-4 mt-10">
                <button
                    className="text-green-500 text-sm font-medium hover:text-green-600 cursor-pointer"
                    onClick={handleToggleTodoComplete}
                >
                    {todo.completed ? "🔴Undone" : "🟢Done"}
                </button>
                {!todo.completed &&
                    (!isTodoEditable ? (
                        <button
                            className="text-blue-500 text-sm font-medium hover:text-blue-600 cursor-pointer"
                            onClick={() => setIsTodoEditable(true)}
                        >
                            ✏️Edit
                        </button>
                    ) : (
                        <button
                            className="text-blue-500 text-sm font-medium hover:text-blue-600 cursor-pointer"
                            onClick={editTodo}
                        >
                            ✔️Save
                        </button>
                    ))}
                {!todo.completed && (
                    <button
                        className="text-red-500 text-sm font-medium hover:text-red-600 cursor-pointer"
                        onClick={() => deleteTodo(todo.id)}
                    >
                        ❌Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default TodoItem;
