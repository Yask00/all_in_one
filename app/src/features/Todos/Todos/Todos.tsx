import { ReactElement } from "react";
import "./Todos.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchInfiniteTodos } from "../../../api/api";
import { Todo as TodoInt } from "../../../types/interfaces";
import Todo from "../Todo/Todo";
import React from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { useTranslation, Trans } from "react-i18next";

const Todos = (): ReactElement => {
  const { t } = useTranslation();
  const limitPerLoad: number = 30;

  // const { isPending, error, data } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: fetchTodos,
  //   refetchOnWindowFocus: false,
  //   retryOnMount: false,
  // });

  // const [loading, setLoading] = useState<boolean>(true);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: ({ pageParam }) => fetchInfiniteTodos(pageParam),
    initialPageParam: { limit: limitPerLoad, skip: 0 },
    getNextPageParam: (e) => {
      return e.skip + limitPerLoad < e.total
        ? { limit: limitPerLoad, skip: e.skip + limitPerLoad }
        : undefined;
    },
    refetchOnWindowFocus: false,
    retryOnMount: false,
  });

  // if (isPending) {
  //   return <>"Loading..."</>;
  // }
  // if (error) {
  //   return <>'An error has occurred: ' + {error.message}</>;
  // }

  // return (
  //   <>
  //     <h1 className="text-3xl font-bold underline text-center mb-4 pt-3">
  //       Todos:
  //     </h1>
  //     <div className="todos__list mb-6">
  //       {data.todos.map((todo: TodoInt) => (
  //         <Todo todo={todo} key={todo.id} />
  //       ))}
  //     </div>
  //   </>
  // );

  return status === "pending" ? (
    <Spinner />
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <h1 className="text-3xl font-bold underline text-center mb-4 pt-3">
        <Trans i18nKey={"todos.header"}></Trans>&nbsp;
        {t("todos.headerText")}:
      </h1>
      <div className="todos__list mb-6">
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.todos.map((todo: TodoInt) => {
              return <Todo todo={todo} key={todo.id} />;
            })}
          </React.Fragment>
        ))}
      </div>

      <button
        className="todos__list_add-btn"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
      </button>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default Todos;
