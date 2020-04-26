import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ToDoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css'

const App = () => {
  const todoData = [
    { label: 'Drink Coffe', important: false, id: 1 },
    { label: 'Make Avesome App', important: true, id: 2 },
    { label: 'Have A Lunch', important: false, id: 3 },
  ]

    return (
        <div className="todo-app">
          <AppHeader toDo={1} done={3} />
          <div className="top-panel d-flex">
            <SearchPanel />
            <ItemStatusFilter />
          </div>
          <ToDoList todos={todoData} />
        </div>
    );
};

export default App;