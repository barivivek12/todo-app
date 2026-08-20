function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
      <div 
        className="flex items-center flex-1 min-w-0 gap-4 cursor-pointer" 
        onClick={onToggle}
      >
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={todo.completed}
            readOnly
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </div>
        <span
          className={`text-base truncate transition-all duration-200 ${
            todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
          }`}
        >
          {todo.title}
        </span>
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
        className="opacity-0 group-hover:opacity-100 p-2 ml-4 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all focus:outline-none focus:opacity-100 focus:ring-2 focus:ring-red-500"
        aria-label="Delete todo"
        title="Delete"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  )
}

export default TodoItem
