import * as React from "react";
import { render } from "react-dom";
import CreateReactClass from "create-react-class";

import "./styles.css";

var TodoItem = CreateReactClass({
  delete: function() {
    this.props.delete(this.props.todo);
  },

  render: function() {
    return (
      <li>
        {this.props.todo}
        <button onClick={this.delete} className="i">
          Poista
        </button>
      </li>
    );
  }
});

var TodoList = CreateReactClass({
  getInitialState: function() {
    var initialList =
      typeof localStorage["todos"] !== "undefined"
        ? JSON.parse(localStorage.getItem("todos"))
        : [];

    return {
      list: initialList,
      inputValue: ""
    };
  },

  updateInputValue: function(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  },

  handleAdd: function() {
    var todos = this.state.list;
    var newInput = this.state.inputValue;
    todos.push(newInput);
    localStorage.setItem("todos", JSON.stringify(todos));
    this.setState({
      list: todos,
      inputValue: ""
    });
  },

  delete: function(todo) {
    var todos = this.state.list;
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    this.setState({
      list: todos
    });
  },

  render: function() {
    var listItems = this.state.list.map(
      function(listValue) {
        return <TodoItem todo={listValue} delete={this.delete} />;
      }.bind(this)
    );

    return (
      <div className="app">
        <h1>Kauppalista</h1>

        <ul>{listItems}</ul>

        <input
          autoFocus="autofocus"
          className="inputBar"
          placeholder="Mitä kaupasta?"
          type="text"
          value={this.state.inputValue}
          onChange={this.updateInputValue}
        />
        <button className="button1" onClick={this.handleAdd}>
          Lisää
        </button>
        <p>&copy; Kankku</p>
      </div>
    );
  }
});

const rootElement = document.getElementById("app");
render(<TodoList />, rootElement);
