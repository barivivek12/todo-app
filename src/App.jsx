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