import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

const initialTodos = [
  {
    id: 1,
    title: 'Complete GitHub assignment',
    completed: false,
    priority: 'Medium',
    category: 'Work',
  },
  {
    id: 2,
    title: 'Review pull request',
    completed: true,
    priority: 'Low',
    category: 'Work',
  },
  {
    id: 3,
    title: 'Fix login page layout',
    completed: false,
    priority: 'High',
    category: 'Work',
  },
  {
    id: 4,
    title: 'Update project documentation',
    completed: false,
    priority: 'Medium',
    category: 'Other',
  },
  {
    id: 5,
    title: 'Write unit tests',
    completed: true,
    priority: 'High',
    category: 'Work',
  },
  {
    id: 6,
    title: 'Deploy the application',
    completed: false,
    priority: 'High',
    category: 'Work',
  },
]

function App() {
  const [todos, setTodos] = useState(initialTodos)

  const addTodo = (title, priority, category) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
      priority,
      category,
    }

    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const editTodo = (id, updatedData) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updatedData }
          : todo
      )
    )
  }

  // Todo statistics
  const totalTodos = todos.length

  const completedTodos = todos.filter(
    (todo) => todo.completed
  ).length

  const activeTodos = todos.filter(
    (todo) => !todo.completed
  ).length

  const highPriorityTodos = todos.filter(
    (todo) => todo.priority === 'High'
  ).length

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Todo Manager
          </h1>

          <p className="text-lg text-gray-500">
            Manage your tasks and stay productive.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <TodoForm onAddTodo={addTodo} />
        </div>

        {/* Todo Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-900">
              {totalTodos}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold text-blue-600">
              {activeTodos}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {completedTodos}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-sm text-gray-500">High Priority</p>
            <p className="text-2xl font-bold text-red-600">
              {highPriorityTodos}
            </p>
          </div>
        </div>

        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />
      </div>
    </div>
  )
}

export default App