import React from 'react';
import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from "@apollo/client"

const query = gql`
query ExampleQuery {
  getUser {
    Id
    Name
    todos {
      Id
      Description
    }
  }
}
`

function App() {
  const { data, loading } = useQuery(query)
  console.log(data)
  if (loading) return <h1>loading...</h1>

  return (
    <div className="App">
      <table>
        <tbody>
          {
            data.getUser.map((user: {
              Id: number, Name: string,
              todos: [{ Id: string, Description: string }]
            }) => {
              return (
                <div>
                  <h1>{user.Name}</h1>
                  {user.todos.map((todo: { Id: string, Description: string }) => {
                    return <h1>{todo.Id}</h1>; // Fix: Provide the description here
                  })}
                </div>
              );
            })
          }
        </tbody>
      </table>

    </div>
  );
}

export default App;
