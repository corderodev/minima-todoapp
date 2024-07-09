import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'minima-todoapp';
  todos: { task: string, done: boolean }[] = [];
  newTodo: string = '';

  constructor() { }

  ngOnInit(): void {
    this.loadTodos();
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push({ task: this.newTodo.trim(), done: false });
      this.newTodo = '';
      this.saveTodos();
    }
  }

  toggleDone(index: number) {
    this.todos[index].done = !this.todos[index].done;
    this.saveTodos();
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }
}
