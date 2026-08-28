import { useState} from 'react'

type Props = {
  onAdd: (text: string) => void
}

function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState('')

const handleSubmit = (e: { preventDefault: () => void }) => {
  e.preventDefault()
  if (text.trim() === '') return
  onAdd(text.trim())
  setText('')
}
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-lg mb-6">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Ajouter une tâche..."
        className="flex-1 px-4 py-2 rounded-lg outline-none"
        style={{
          background: 'var(--dark2)',
          border: '1px solid var(--muted)',
          color: 'var(--white)',
        }}
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg font-semibold transition-opacity hover:opacity-80"
        style={{ background: 'var(--teal)', color: 'var(--dark)' }}
      >
        Ajouter
      </button>
    </form>
  )
}

export default TodoForm