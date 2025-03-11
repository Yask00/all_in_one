export const baseUrl = "https://dummyjson.com/";

// Use typescript everywhere
// use fetch
// use axios
// use React query
// use RTK Query
export const getAll = async () => {
  const url = "todos";

  try {
    const response = await fetch(baseUrl + url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};
