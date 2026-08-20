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

const initialActivities = initialTodos.reduce((activities, todo) => {
  activities[todo.id] = [
    {
      id: `${todo.id}-created`,
      action: 'Todo created',
      timestamp: new Date().toLocaleString(),
    },
  ]

  return activities
}, {})

function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [activities, setActivities] = useState(initialActivities)
  const [darkMode, setDarkMode] = useState(false)

  const addActivity = (todoId, action) => {
    const newActivity = {
      id: Date.now(),
      action,
      timestamp: new Date().toLocaleString(),
    }

    setActivities((currentActivities) => ({
      ...currentActivities,
      [todoId]: [
        ...(currentActivities[todoId] || []),
        newActivity,
      ],
    }))
  }

  const addTodo = (title, priority, category) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
      priority,
      category,
    }

    setTodos((currentTodos) => [newTodo, ...currentTodos])

    setActivities((currentActivities) => ({
      ...currentActivities,
      [newTodo.id]: [
        {
          id: `${newTodo.id}-created`,
          action: 'Todo created',
          timestamp: new Date().toLocaleString(),
        },
      ],
    }))
  }

  const toggleTodo = (id) => {
    const todo = todos.find((item) => item.id === id)

    if (!todo) return

    const newCompletedState = !todo.completed

    setTodos((currentTodos) =>
      currentTodos.map((item) =>
        item.id === id
          ? { ...item, completed: newCompletedState }
          : item
      )
    )

    if (newCompletedState) {
      addActivity(id, 'Todo completed')
    }
  }

  const deleteTodo = (id) => {
    addActivity(id, 'Todo deleted')

    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    )
  }

  const editTodo = (id, updatedData) => {
    const oldTodo = todos.find((todo) => todo.id === id)

    if (!oldTodo) return

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updatedData }
          : todo
      )
    )

    addActivity(id, 'Todo edited')

    if (oldTodo.priority !== updatedData.priority) {
      addActivity(id, 'Priority changed')
    }

    if (oldTodo.category !== updatedData.category) {
      addActivity(id, 'Category changed')
    }
  }

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
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                darkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>

          <h1
            className={`text-4xl font-extrabold tracking-tight mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Todo Manager
          </h1>

          <p
            className={`text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            Manage your tasks and stay productive.
          </p>
        </div>

        {/* Todo Form */}
        <div
          className={`rounded-xl shadow-sm border p-6 mb-8 ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
          }`}
        >
          <TodoForm onAddTodo={addTodo} />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">

          <div
            className={`rounded-xl shadow-sm border p-4 text-center ${
              darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-100'
            }`}
          >
            <p
              className={
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }
            >
              Total
            </p>

            <p
              className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {totalTodos}
            </p>
          </div>

          <div
            className={`rounded-xl shadow-sm border p-4 text-center ${
              darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-100'
            }`}
          >
            <p
              className={
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }
            >
              Active
            </p>

            <p className="text-2xl font-bold text-blue-500">
              {activeTodos}
            </p>
          </div>

          <div
            className={`rounded-xl shadow-sm border p-4 text-center ${
              darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-100'
            }`}
          >
            <p
              className={
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }
            >
              Completed
            </p>

            <p className="text-2xl font-bold text-green-500">
              {completedTodos}
            </p>
          </div>

          <div
            className={`rounded-xl shadow-sm border p-4 text-center ${
              darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-100'
            }`}
          >
            <p
              className={
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }
            >
              High Priority
            </p>

            <p className="text-2xl font-bold text-red-500">
              {highPriorityTodos}
            </p>
          </div>
        </div>

        {/* Todo List */}
        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
          activities={activities}
        />
      </div>
    </div>
  )
}

export default App