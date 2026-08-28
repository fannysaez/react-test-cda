import type { Todo } from '../types'
import TodoItem from './TodoItem'

type Props = {
  todos: Todo[]
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  onEdit: (id: number, newText: string) => void
}

function TodoList({ todos, onDelete, onToggle, onEdit }: Props) {
  if (todos.length === 0) {
return <p className="mt-4 italic text-gray-400">Aucune tâche pour le moment.</p>  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default TodoList