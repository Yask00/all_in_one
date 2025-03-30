import { ReactElement } from "react";
import "./AddTodo.scss";
import { useMutation } from "@tanstack/react-query";
import { createTodo } from "../../../api/api";
import Spinner from "../../../components/Spinner/Spinner";
import { useForm, SubmitHandler } from "react-hook-form";
import { Todo } from "../../../types/interfaces";
import { socket } from "../../../api/socket";

type Inputs = {
  todo: string;
  completed: boolean;
};

const AddTodo = (): ReactElement => {
  // const completedRef = React.useRef<HTMLInputElement>(null);
  // const todoRef = React.useRef<HTMLInputElement>(null);

  const mutation = useMutation<Todo, Error, Todo>({
    mutationFn: (newTodo) => createTodo(newTodo),
    onSuccess: () => {
      // todoRef.current!.value = "";
      // completedRef.current!.checked = false;
      resetField("todo");
      resetField("completed");

      socket.emit("add_todo", {
        senderId: "123", // ID of the sender
        receiverId: "456", // ID of the receiver
        message: "Todo added",
      });
    },
  });

  const {
    register,
    resetField,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const submitOptions = {
    todo: {
      required: "Todo is required",
      minLength: {
        value: 4,
        message: "Todo must have at least 4 chars length",
      },
    },
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate({
      todo: data.todo,
      completed: data.completed,
      userId: 1,
    });
  };
  // console.log(watch("todo")); // watch input value by passing the name of it

  return (
    <div className="add-todo-wrapper">
      <div className="add-todo">
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {/* {mutation.isSuccess ? <div>Todo added!</div> : null} */}

          {mutation.isPending ? <Spinner /> : null}

          {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="todo">Todo:</label>
            <input
              /* register your input into the hook by invoking the "register" function */
              {...register(
                "todo",
                submitOptions.todo /*{ required: true, min: 4 } */
              )}
              defaultValue={""}
              // ref={todoRef} with ref is always empty in hook form
              type="text"
              id="todo"
              placeholder="Enter todo"
              name="todo"
            />
            {/* errors will return when field validation fails  */}
            {errors.todo && (
              <span className="error">* This field is required</span>
            )}

            <label>
              <input
                {...register("completed")}
                // ref={completedRef}
                type="checkbox"
                name="completed"
              />{" "}
              Completed?
            </label>
            <button type="submit" className="btn btn--submit">
              Create Todo
            </button>
          </form>
        </>
      </div>
    </div>
  );
};

export default AddTodo;
