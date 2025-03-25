export const baseUrl = "https://dummyjson.com/";

// Not used in this project
export const getAll = async () => {
  const url = "todos";

  try {
    const response = await fetch(baseUrl + url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const todos = await response.json();
    return todos;
  } catch (error) {
    throw new Error(`Error fetching todos: ${error}`);
  }
};

export const fetchTodos = async () => {
  const response = await fetch(baseUrl + "todos");
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const todos = await response.json();
  return todos;
};

export const createTodo = async (newTodo: {
  completed: boolean;
  todo: string;
  userId: number;
}) => {
  const response = await fetch(baseUrl + "todos/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};

export const fetchTodoById = async (todoId: string) => {
  const response = await fetch(baseUrl + `todos/${todoId}`);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const todo = await response.json();
  return todo;
};

export const deleteTodo = async (todoId: string) => {
  const response = await fetch(baseUrl + `todos/${todoId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};

export const fetchInfiniteTodos = async ({
  limit = 10,
  skip,
}: {
  limit: number;
  skip: number;
}) => {
  const response = await fetch(baseUrl + `todos?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const todos = await response.json();
  return todos;
};
