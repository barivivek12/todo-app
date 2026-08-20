import { useState } from 'react'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)

  const [editTitle, setEditTitle] = useState(todo.title)
  const [editPriority, setEditPriority] = useState(
    todo.priority || 'Medium'
  )
  const [editCategory, setEditCategory] = useState(
    todo.category || 'Other'
  )

  const priorityStyles = {
    High: 'bg-red-100 text-red-700 border-red-300',
    Medium: 'bg-orange-100 text-orange-700 border-orange-300',
    Low: 'bg-gray-100 text-gray-600 border-gray-300',
  }

  const categoryStyles = {
    Work: 'bg-blue-100 text-blue-700 border-blue-200',
    Personal: 'bg-purple-100 text-purple-700 border-purple-200',
    Other: 'bg-gray-100 text-gray-600 border-gray-200',
  }

  const highPriorityIndicator =
    todo.priority === 'High'
      ? 'border-l-4 border-l-red-500'
      : ''

  const handleEdit = () => {
    if (editTitle.trim() === '') {
      return
    }

    onEdit({
      title: editTitle.trim(),
      priority: editPriority,
      category: editCategory,
    })

    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditPriority(todo.priority || 'Medium')
    setEditCategory(todo.category || 'Other')
    setIsEditing(false)
  }

  const startEditing = () => {
    setEditTitle(todo.title)
    setEditPriority(todo.priority || 'Medium')
    setEditCategory(todo.category || 'Other')
    setIsEditing(true)
  }

  if (isEditing) {
    return (
      <li
        className={`p-5 bg-white ${
          highPriorityIndicator
        }`}
      >
        <div className="flex flex-col gap-3">
          {/* Title */}
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />

          {/* Priority and Category */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>

            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Save / Cancel */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </li>
    )
  }

  return (
    <li
      className={`flex items-center justify-between p-5 transition-colors group ${
        todo.completed
          ? 'bg-gray-100 opacity-75'
          : 'bg-white hover:bg-gray-50'
      } ${highPriorityIndicator}`}
    >
      {/* Todo information */}
      <div className="flex items-center flex-1 min-w-0 gap-4">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onToggle}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            aria-label={`Complete ${todo.title}`}
          />
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <span
            className={`text-lg font-semibold truncate transition-all duration-200 ${
              todo.completed
                ? 'text-gray-400 line-through'
                : 'text-gray-800'
            }`}
          >
            {todo.title}
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                priorityStyles[todo.priority || 'Medium']
              }`}
            >
              {todo.priority || 'Medium'}
            </span>

            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                categoryStyles[todo.category || 'Other']
              }`}
            >
              {todo.category || 'Other'}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-4">
        <button
          onClick={onToggle}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            todo.completed
              ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {todo.completed ? 'Completed' : 'Complete'}
        </button>

        <button
          onClick={startEditing}
          className="px-3 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-sm font-medium transition-colors"
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Delete todo"
          title="Delete"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a1.995 1.995 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </li>
  )
}

export default TodoItem