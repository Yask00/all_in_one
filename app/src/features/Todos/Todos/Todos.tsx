import { ReactElement } from "react";
import "./Todos.css";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../../../api/api";
import { Todo as TodoInt } from "../../../types/interfaces";
import Todo from "../Todo/Todo";

const Todos = (): ReactElement => {
  const { isPending, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    refetchOnWindowFocus: false,
    retryOnMount: false,
  });

  if (isPending) {
    return <>"Loading..."</>;
  }
  if (error) {
    return <>'An error has occurred: ' + {error.message}</>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center mb-4 pt-3">
        Todos:
      </h1>
      <div className="todos__list mb-6">
        {data.todos.map((todo: TodoInt) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </div>
    </>
  );
};

export default Todos;
