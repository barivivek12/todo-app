import { useState } from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No todos yet
        </h3>
        <p className="text-gray-500">
          Get started by adding a task above.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => onToggleTodo(todo.id)}
              onDelete={() => onDeleteTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoList