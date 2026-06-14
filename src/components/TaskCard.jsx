import { useState } from 'react'
import { Trash2, ArrowLeft, ArrowRight, Pencil, Check, Flame, AlertTriangle, ArrowDown } from 'lucide-react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
function TaskCard({ task, deleteTask, moveTask, editTask, columnId, darkMode }) {
  
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id})
  const style = { transform: CSS.Translate.toString(transform),transition: 'transform 0.2s ease', touchAction: 'none' 
  }
  const priorityBorder = {
    high:'3px solid #ef4444', medium:'3px solid #f59e0b', low:'3px solid #22c55e',
  }
  const priorityIcon = {
    high:   <Flame size={12} color="#ef4444" />, 
    medium: <AlertTriangle size={12} color="#f59e0b" />, 
    low:    <ArrowDown size={12} color="#22c55e" />,
  }

  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  return (
  <div ref={setNodeRef} style={{ ...style, backgroundColor: darkMode ? '#1e293b' : 'white', padding: '12px', borderRadius: '8px', marginBottom: '8px', boxShadow: darkMode ? '0 1px 3px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.1)',transition: 'all 0.3s ease', borderLeft: priorityBorder[task.priority] || priorityBorder['medium'], cursor: 'grab'
  }}
  {...attributes}
  {...listeners}>
    
    {isEditing ? (
      <input value={editText} onChange={(e) => setEditText(e.target.value)} onBlur={() => { 
        editTask(task.id, editText) 
        setIsEditing(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          editTask(task.id, editText)
          setIsEditing(false)
        }
      }}
      autoFocus style={{ width: '100%', padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px',marginBottom: '10px', backgroundColor: darkMode ? '#0f172a' : 'white', color: darkMode ? 'white' : '#1e293b', outline: 'none'
      }}/>
    ):(
    <p style={{ marginBottom:'10px', fontSize:'14px', color:darkMode ? '#e2e8f0' : '#1e293b', cursor:'pointer'}} onClick={() => setIsEditing(true)}>
      {task.text}
      </p>
    )}
    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
        {columnId !== 'todo' && (
          <button onClick={() => moveTask(task.id, columnId === 'done' ? 'inprogress' : 'todo')} style={{ backgroundColor: darkMode ? '#334155' : '#e2e8f0', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: darkMode ? 'white' : '#1e293b'
          }}
          >
            <ArrowLeft size={14} />
            </button>
          )}
          {columnId !== 'done' && (
            <button onClick={() => moveTask(task.id, columnId === 'todo' ? 'inprogress' : 'done')} style={{ backgroundColor: darkMode ? '#334155' : '#e2e8f0', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: darkMode ? 'white' : '#1e293b'
            }}
            >
              <ArrowRight size={14} />
              </button>
            )}
            <button onClick={() => setIsEditing(true)} style={{ backgroundColor: darkMode ? '#334155' : '#e2e8f0', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: darkMode ? 'white' : '#1e293b' }}>
              <Pencil size={14} />
              </button>
            <button onClick={() => deleteTask(task.id)} style={{ backgroundColor: darkMode ? '#450a0a' : '#fee2e2', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: '#ef4444' }}
              > 
              <Trash2 size={14} />
              </button>
              </div>
              </div>
              )
            }
            export default TaskCard