import React from 'react';
import { useGetTodos, useGetMoreTodos } from './http';
import { Header, Todo, Loader } from './components';
import './App.css';
var config = require('./config.json');

const getSortingStrategy = ({ sortValue }) => {
  switch (sortValue) {
    case 'title':
      return (todos) => todos.sort((a, b) => a.title.localeCompare(b.title));
    case 'completed':
      return (todos) => todos.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? -1 : 1));
    default:
      return (todos) => todos.sort((a, b) => a.id - b.id);
  }
};

export default function App() {
  const { data, isLoading, error } = useGetTodos(40);
  const [todos, setTodos] = React.useState([]);
  const [sortValue, setSortValue] = React.useState('');
  const { mutateAsync: addTodos, isLoading: isMoreDataLoading } = useGetMoreTodos();

  React.useEffect(() => {
    if (!data) return;
    setTodos(data.results);
  }, [data]);

  const sortedTodos = React.useMemo(() => {
    return getSortingStrategy({ sortValue })(todos);
  }, [todos, sortValue]);

  const addMoreData = () => {
    addTodos(10).then((r) => {
      setTodos([...todos, ...r.results]);
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className='app'>
      <Header
        todos={todos}
        data={data}
        config={config}
        sortValue={sortValue}
        onSortChange={setSortValue}
        onToggleAll={(areAllTodosCompleted) => {
          setTodos(
            todos.map((todo) => ({
              ...todo,
              completed: !areAllTodosCompleted,
            }))
          );
        }}
      />

      <div className='grid'>
        {sortedTodos.map((todo, idx) => (
          <Todo
            key={todo.login.uuid}
            todo={todo}
            config={config}
            isCompleted={todo.completed === undefined ? false : todo.completed}
            onChange={() => {
              setTodos((curr) => {
                return curr.map((item, i) => (i === idx ? { ...item, completed: !item.completed } : item));
              });
            }}
          />
        ))}
      </div>

      {isMoreDataLoading ? 'More Data Loading' : <></>}
      <button className='btnPrimary' onClick={addMoreData}>
        Add More
      </button>
    </div>
  );
}
