import { ReactElement } from "react";
import "../Todos/Todos.css";
import { useTranslation, Trans } from "react-i18next";
import { useGetTodosInfiniteQuery } from "../todosApiSLice";
import Spinner from "../../../components/Spinner/Spinner";
import Todo from "../Todo/Todo";
import React from "react";
import { Todo as TodoInt } from "../../../types/interfaces";

const TodosRedux = (): ReactElement => {
  const { t } = useTranslation();

  const { data, isFetching, fetchNextPage, hasNextPage } =
    useGetTodosInfiniteQuery({
      limit: 30,
      skip: 0,
    });

  return !data ? (
    <Spinner />
  ) : (
    <>
      <h1 className="text-3xl font-bold underline text-center mb-4 pt-3">
        <Trans i18nKey={"todos.header"}></Trans>&nbsp;
        {t("todos.headerText")}:
      </h1>
      <ul className="todos__list mb-6">
        {data &&
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.todos.map((todo: TodoInt) => {
                return <Todo todo={todo} key={todo.id} />;
              })}
            </React.Fragment>
          ))}
      </ul>
      <button
        className="todos__list_add-btn"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
      >
        {isFetching
          ? "LOADING"
          : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
      </button>
      {/* <div>{isFetching ? "Fetching..." : null}</div> */}
    </>
  );
};

export default TodosRedux;
