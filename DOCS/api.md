* GET TODOS
    ```js
    fetch('https://dummyjson.com/todos')
        .then(res => res.json())
        .then(console.log);
    ```
    ```json
    {
        "todos": [
            {
                "id": 1,
                "todo": "Do something nice for someone I care about",
                "completed": true,
                "userId": 26
            },
            {...},
            {...}
            // 30 items
        ],
        "total": 150,
        "skip": 0,
        "limit": 30
    }
    ```

* GET SINGLE TODO
    ```js
    fetch('https://dummyjson.com/todos/{id}')
        .then(res => res.json())
        .then(console.log);
    ```
    ```json
    {
        "id": 1,
        "todo": "Do something nice for someone I care about",
        "completed": true,
        "userId": 26
    }
    ```

* Limit and skip todos
    ```js
    fetch('https://dummyjson.com/todos?limit=3&skip=10')
        .then(res => res.json())
        .then(console.log);
    ```
    ```json
    {
        "todos": [
            {
                "id": 11, // first 10 items were skipped
                "todo": "Text a friend I haven't talked to in a long time",
                "completed": false,
                "userId": 39
            },
            {
                "id": 12,
                "todo": "Organize pantry",
                "completed": true,
                "userId": 39
            },
            {
                "id": 13,
                "todo": "Buy a new house decoration",
                "completed": false,
                "userId": 16
            }
        ],
        "total": 150,
        "skip": "10",
        "limit": 3
    }
    ```

* Get all todos by user id
    ```js
    /* getting todos of user with id 5 */
    fetch('https://dummyjson.com/todos/user/5')
        .then(res => res.json())
        .then(console.log);
    ```
    ```json
    {
        "todos": [
            {
                "id": 19,
                "todo": "Create a compost pile",
                "completed": true,
                "userId": 5 // user id is 5
            },
            {...},
            {...}
        ],
        "total": 3,
        "skip": 0,
        "limit": 3
    }
    ```

* Add new TODO
    ```js
    fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: 'Use DummyJSON in the project',
            completed: false,
            userId: 5,
            })
        })
        .then(res => res.json())
        .then(console.log);
    ```
    ```json
    {
        "id": 151,
        "todo": "Use DummyJSON in the project",
        "completed": false,
        "userId": 5
    }
    ```

* Update TODO
    ```js
    /* updating completed status of todo with id 1 */
    fetch('https://dummyjson.com/todos/1', {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            completed: false,
        })
    })
    .then(res => res.json())
    .then(console.log);
    ```
    ```json
    {
        "id": "1",
        "todo": "Do something nice for someone I care about",
        "completed": false, // complete status was changed
        "userId": 26
    }
    ```
* Delete TODO
    ```js
    fetch('https://dummyjson.com/todos/1', {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(console.log);
    ```
    ```json
    {
        "id": 1,
        "todo": "Do something nice for someone I care about",
        "completed": true,
        "userId": 26,
        "isDeleted": true,
        "deletedOn": /* ISOTime */
    }
    ```