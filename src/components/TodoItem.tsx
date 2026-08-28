import { useState } from 'react'
import type { Todo } from '../types'

type Props = {
  todo: Todo
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  onEdit: (id: number, newText: string) => void
}

function TodoItem({ todo, onDelete, onToggle, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim() === '') return
    onEdit(todo.id, editText.trim())
    setIsEditing(false)
  }

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-all"
      style={{
        background: 'var(--dark2)',
        border: '1px solid var(--muted)',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--teal)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--muted)')}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 cursor-pointer accent-[#1ebfc1]"
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          className="flex-1 px-2 py-1 rounded outline-none"
          style={{
            background: 'var(--dark)',
            border: '1px solid var(--teal)',
            color: 'var(--white)',
          }}
        />
      ) : (
        <span
          className="flex-1"
          style={{
            color: todo.completed ? 'var(--muted)' : 'var(--white)',
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.text}
        </span>
      )}

      {isEditing ? (
        <button
          onClick={handleSave}
          className="px-3 py-1 rounded text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ background: 'var(--teal)', color: 'var(--dark)' }}
        >
          Valider
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 rounded text-sm transition-all hover:opacity-80"
          style={{ border: '1px solid var(--teal)', color: 'var(--teal)' }}
        >
          Modifier
        </button>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="px-3 py-1 rounded text-sm transition-all hover:opacity-80"
        style={{ border: '1px solid #ff6b6b', color: '#ff6b6b' }}
      >
        Supprimer
      </button>
    </div>
  )
}

export default TodoItem