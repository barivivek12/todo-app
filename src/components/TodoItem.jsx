import { useState } from 'react'

function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  activities,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

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
        className={`p-5 bg-white ${highPriorityIndicator}`}
      >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />

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
      className={`p-5 transition-colors group ${
        todo.completed
          ? 'bg-gray-100 opacity-75'
          : 'bg-white hover:bg-gray-50'
      } ${highPriorityIndicator}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0 gap-4">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onToggle}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            aria-label={`Complete ${todo.title}`}
          />

          <div className="flex flex-col gap-2 min-w-0">
            <span
              className={`text-lg font-semibold truncate ${
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

        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={onToggle}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              todo.completed
                ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {todo.completed ? 'Completed' : 'Complete'}
          </button>

          <button
            onClick={startEditing}
            className="px-3 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-sm font-medium"
          >
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
            aria-label="Delete todo"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Details / Activity */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>

        {showDetails && (
          <div className="mt-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">
              Activity History
            </h4>

            {activities.length === 0 ? (
              <p className="text-sm text-gray-500">
                No activity recorded.
              </p>
            ) : (
              <div className="space-y-3">
                {[...activities].reverse().map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />

                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {activity.action}
                      </p>

                      <p className="text-xs text-gray-500">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

export default TodoItem