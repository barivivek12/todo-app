import { useState } from 'react'

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title.trim() === '') {
      setError(true)
      return
    }

    onAddTodo(title.trim(), priority)

    setTitle('')
    setPriority('Medium')
    setError(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (error) setError(false)
          }}
          placeholder="What needs to be done?"
          className={`w-full px-4 py-3 rounded-lg border ${
            error
              ? 'border-red-300 focus:ring-red-500'
              : 'border-gray-200 focus:ring-blue-500'
          } focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm`}
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm whitespace-nowrap"
          >
            Add Todo
          </button>
        </div>
      </div>

      {error && (
        <span className="text-red-500 text-sm ml-1">
          Please enter a valid todo.
        </span>
      )}
    </form>
  )
}

export default TodoForm