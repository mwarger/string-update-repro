import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";

export const Todos = () => {
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const [todos, setTodos] = React.useState();
  const [selectedTodo, setSelectedTodo] = React.useState();

  React.useEffect(() => {
    const fetchTodos = async () => {
      const allTodos = await API.graphql(graphqlOperation(queries.listTodos));
      console.log(allTodos);
      setTodos(allTodos);
    };

    fetchTodos();
  }, []);

  const addTodo = async ({ name, description }) => {
    const todo = await API.graphql(
      graphqlOperation(mutations.createTodo, {
        input: {
          name,
          description,
        },
      })
    );
    console.log("todo", todo);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Todos</h2>
      <div style={{ margin: 5 }}>
        <label>Name: </label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div style={{ margin: 5 }}>
        <label>Description: </label>
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <button onClick={() => addTodo({ name, description })}>Add Todo</button>
      {/* {JSON.stringify(todos)} */}
      <p>Click a todo to edit</p>
      {todos &&
        todos.data.listTodos &&
        todos.data.listTodos.items.map(todo => {
          return (
            <div
              onClick={() => setSelectedTodo(todo)}
              style={{ border: "1px solid gray", padding: 5, margin: 5 }}
            >
              <h3>{todo.name}</h3>
              <p>{todo.description}</p>
            </div>
          );
        })}

      {selectedTodo && <EditTodo {...selectedTodo} />}
    </div>
  );
};

const EditTodo = ({ id, name, description }) => {
  const [todoName, setName] = React.useState(name);
  const [todoDescription, setDescription] = React.useState(description);

  const updateTodo = async ({ name, description }) => {
    const todo = await API.graphql(
      graphqlOperation(mutations.updateTodo, {
        input: {
          id,
          name,
          description: description.length > 0 ? description : undefined,
        },
      })
    );
    console.log("todo", todo);
  };

  return (
    <>
      <div style={{ margin: 5 }}>
        <label>Name: </label>
        <input value={todoName} onChange={e => setName(e.target.value)} />
      </div>
      <div style={{ margin: 5 }}>
        <label>Description: </label>
        <input
          value={todoDescription}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <button
        onClick={() =>
          updateTodo({ name: todoName, description: todoDescription })
        }
      >
        Update Todo
      </button>
    </>
  );
};
