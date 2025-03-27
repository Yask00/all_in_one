import { ReactElement } from "react";
import "./AddTodo.scss";
import { useMutation } from "@tanstack/react-query";
import { createTodo } from "../../../api/api";
import React from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { toast } from "react-toastify";

const AddTodo = (): ReactElement => {
  const completedRef = React.useRef<HTMLInputElement>(null);
  const todoRef = React.useRef<HTMLInputElement>(null);

  const mutation = useMutation<
    { completed: boolean; todo: string; userId: number },
    Error,
    { completed: boolean; todo: string; userId: number }
  >({
    mutationFn: (newTodo) => createTodo(newTodo),
    onSuccess: () => {
      todoRef.current!.value = "";
      completedRef.current!.checked = false;
      toast.success("Todo added");
    },
  });

  // TODO: use react-hook-form to create a form to add a todo and make it more beautiful
  // Validation: todo is required
  return (
    <div className="add-todo">
      <>
        {mutation.isError ? (
          <div>An error occurred: {mutation.error.message}</div>
        ) : null}

        {/* {mutation.isSuccess ? <div>Todo added!</div> : null} */}

        {mutation.isPending ? <Spinner /> : null}

        <form className="form-inline">
          <label htmlFor="todo">Todo:</label>
          <input
            ref={todoRef}
            type="text"
            id="todo"
            placeholder="Enter todo"
            name="todo"
          />
          <label>
            <input ref={completedRef} type="checkbox" name="completed" />{" "}
            Completed?
          </label>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate({
                completed: completedRef.current?.checked || false,
                todo: todoRef.current?.value || "",
                userId: 1,
              });
            }}
          >
            Create Todo
          </button>
        </form>
      </>
    </div>
  );
};

export default AddTodo;
