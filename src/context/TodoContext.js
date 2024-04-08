import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo message",
            completed: false,
            date: Date.now(),
        },
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleTodoStatus: (id) => {},
});

export const useTodo = () => {
    return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
