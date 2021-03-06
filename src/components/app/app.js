import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ToDoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css'

export default class App extends Component {
  constructor() {
    super();

    this.maxId = 0;

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffe'),
        this.createTodoItem('Make Avesome App'),
        this.createTodoItem('Have A Lunch')
      ],
      term: '',
      filter: 'all'
    };

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const newArray = [
          ...todoData.slice(0, idx),
          ...todoData.slice(idx + 1)
        ];

        return {
          todoData: newArray
        }
      })
    };

    this.addItem = (label) => {
      const newItem = this.createTodoItem(label);

      this.setState(({ todoData }) => {
        const newArray = [
          ...todoData,
          newItem
        ];

        return {
          todoData: newArray
        }
      });
    };

    this.toggleProperty = (arr, id, propName) => {
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = {
        ...oldItem,
        [propName]: !oldItem[propName]
      };

      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ];
    }

    this.onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty( todoData, id, 'important')
        }
      });
    };

    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty( todoData, id, 'done')
        }
      });
    };

    this.onSearch = (items, term) => {
      if(term.length === '') {
        return items;
      }

      return items.filter((item) => item.label
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1);
    }

    this.onSearchChange = (term) => {
      this.setState({ term });
    }

    this.onFilterChange = (filter) => {
      this.setState({ filter });
    }

    this.filter = (items, filter) => {
      switch(filter) {
        case 'active':
          return items.filter((item) => !item.done);
        case 'done':
          return items.filter((item) => item.done);
        default:
          return items;
      }
    }
  }

  createTodoItem = function(label) {
    return {
      label: label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }
  
  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(
      this.onSearch(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
        <div className="todo-app">
          <AppHeader toDo={ todoCount } done={ doneCount } />
          <div className="top-panel d-flex">
            <SearchPanel onSearchChange={ this.onSearchChange } />
            <ItemStatusFilter
              filter={ filter }
              onFilterChange={ this.onFilterChange }/>
          </div>

          <ToDoList todos={ visibleItems }
            onDeleted={ this.deleteItem }
            onToggleImportant={ this.onToggleImportant }
            onToggleDone={ this.onToggleDone } />

          <AddItem onAddedItem={ this.addItem } />
        </div>
    );
  }
};