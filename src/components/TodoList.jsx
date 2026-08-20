import { useState } from 'react'
import TodoItem from './TodoItem'

function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
  activities,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesCategory =
      categoryFilter === 'All' ||
      (todo.category || 'Other') === categoryFilter

    return matchesSearch && matchesCategory
  })

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
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {filteredTodos.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No matching todos
          </h3>

          <p className="text-gray-500">
            Try changing your search or category filter.
          </p>
        </div>
      )}

      {filteredTodos.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => onToggleTodo(todo.id)}
                onDelete={() => onDeleteTodo(todo.id)}
                onEdit={(updatedData) =>
                  onEditTodo(todo.id, updatedData)
                }
                activities={activities[todo.id] || []}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TodoList