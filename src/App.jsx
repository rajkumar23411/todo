import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm/TodoForm";
import { TodoProvider } from "./context";
import TodoItem from "./components/TodoItem/TodoItem";

const App = () => {
    const [todos, setTodos] = useState([]);
    const addTodo = (todo) => {
        setTodos([{ id: Date.now(), date: Date.now(), ...todo }, ...todos]);
    };
    const updateTodo = (id, todo) => {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...todo, date: Date.now() } : t))
        );
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    const toggleTodoStatus = (id) => {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id
                    ? {
                          ...t,
                          completed: !t.completed,
                      }
                    : t
            )
        );
    };

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"));

        if (todos && todos.length > 0) {
            setTodos(todos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    return (
        <TodoProvider
            value={{ todos, addTodo, deleteTodo, updateTodo, toggleTodoStatus }}
        >
            <div className="h-screen w-screen flex items-center flex-col py-10">
                <h1 className="font-sans font-medium text-3xl tracking-tight">
                    Manage your todos here.
                </h1>
                <TodoForm />
                {todos.length <= 0 ? (
                    <div className="mt-28">
                        <h1 className="font-medium text-3xl text-gray-700">
                            You don't have any task till now
                        </h1>
                    </div>
                ) : (
                    <div className="mt-20">
                        <div className="py-8 flex items-center gap-4">
                            <h1 className="font-medium text-lg">
                                Total added tasks: {todos.length}
                            </h1>
                            <h1 className="font-medium text-lg">
                                Total completed tasks:{" "}
                                {todos.filter((t) => t.completed).length}
                            </h1>
                            <h1 className="font-medium text-lg">
                                Total pending tasks:{" "}
                                {todos.filter((t) => !t.completed).length}
                            </h1>
                        </div>
                        <div className="grid grid-cols-4 gap-6">
                            {todos.map((todo) => (
                                <TodoItem key={todo.id} todo={todo} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </TodoProvider>
    );
};

export default App;
