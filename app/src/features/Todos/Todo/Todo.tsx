import { ReactElement } from "react";
import "./Todo.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchTodoById, deleteTodo } from "../../../api/api";
import { NavLink, useNavigate, useParams } from "react-router";
import { Todo as TodoInt } from "../../../types/interfaces";
import Spinner from "../../../components/Spinner/Spinner";
import React from "react";

interface Props {
  todo?: TodoInt;
}

const Todo = ({ todo }: Props): ReactElement => {
  const todoId = useParams<{ id: string }>().id;
  const isFromProps = todo ? true : false;
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

  const result = useQuery({
    queryKey: ["todos", todoId],
    queryFn: () => fetchTodoById(todoId || ""),
    refetchOnWindowFocus: false,
    enabled: !isFromProps,
  });

  const deleteTodoHandler = useMutation({
    mutationFn: () => {
      return deleteTodo(todoId || "");
    },
    onMutate: () => {
      setIsDeleting(true);
    },
    onSuccess: () => {
      setIsDeleting(false);
      alert("Todo deleted!");
      handleRedirect();
    },
  });

  const handleRedirect = () => {
    navigate("/todos");
  };

  const createTodoItem = () => {
    if (!isFromProps && result.isPending) {
      return <Spinner />;
    }
    if (!isFromProps && result.error) {
      return `An error occurred: ${result.error.message}`;
    }

    const finalTodo = isFromProps ? todo : result.data;

    return isFromProps ? (
      <li className="todos__list__item" key={finalTodo.id}>
        <NavLink
          className="w-full h-full flex flex-col justify-between items-center "
          key={finalTodo.id}
          to={`/todos/${finalTodo.id}`}
        >
          <div>ID: {finalTodo.id}</div>
          <div className="text-2xl text-amber-700 text-ellipsis text-center">
            {finalTodo.todo}
          </div>
          <div
            className={
              "todos__list__item--status " +
              (finalTodo.completed
                ? "todos__list__item--active"
                : "todos__list__item--completed")
            }
          >
            {finalTodo.completed ? "completed" : "active"}
          </div>
          <div>userId: {finalTodo.userId}</div>{" "}
        </NavLink>
      </li>
    ) : (
      <>
        {isDeleting && <Spinner />}
        <div className="todo__item__wrapper">
          <div className="todo__item">
            <div>ID: {finalTodo.id}</div>
            <div className="">{finalTodo.todo}</div>
            <div>userId: {finalTodo.userId}</div>{" "}
          </div>
          <button
            className="todo__item__delete"
            onClick={() => {
              deleteTodoHandler.mutate();
            }}
          >
            Delete Todo
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      {createTodoItem()}
      {deleteTodoHandler.isError && (
        <div>An error occurred: {deleteTodoHandler.error.message}</div>
      )}
    </>
  );
};

export default Todo;
