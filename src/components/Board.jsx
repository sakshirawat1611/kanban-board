import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors,closestCorners } from '@dnd-kit/core'
import { useState } from 'react'
import Column from './Column'
import { ClipboardList, Loader, CheckCircle, Plus, RotateCcw, Search } from 'lucide-react'
import TaskCard from './TaskCard'

const initialTasks =[
    { id: 1, text: 'Buy groceries', status: 'todo' }, { id: 2, text: 'Build kanban board', status: 'inprogress' },{ id: 3, text: 'Read a book', status: 'done' },
]

function Board({ darkMode }) {
    const [tasks, setTasks] = useState(initialTasks)
    const [inputText, setInputText] = useState('')
    const [priority, setPriority] = useState('medium')
    const [searchQuery, setSearchQuery] = useState('')
    const [activeTask, setActiveTask] = useState(null)

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance:3}
        }))

    const addTask = () => {
        if (inputText.trim() === '') return
        const newTask = { 
            id: Date.now(), text: inputText, status: 'todo',priority: priority
        }
        setTasks([...tasks, newTask])
        setInputText('')
        setPriority('medium')
    }
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id))
    }
    const moveTask = (id, newStatus) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task
        ))
    }
    const editTask = (id, newText) => {
        if (newText.trim() === '') return
        setTasks(tasks.map(task => task.id === id ? { ...task, text: newText }:task
        ))
    }
    const handleDragStart = (event) => {
        const { active } = event 
        const task = tasks.find(t => t.id === active.id)
        setActiveTask(task)
    }
    const handleDragEnd = (event) => { const { active, over } = event 
    setActiveTask(null)
    if (!over) return 
    const taskId = active.id 
    const newStatus = over.id 
    setTasks(tasks.map(task =>task.id === taskId ? { ...task, status: newStatus } : task))}
    
    const resetBoard = () => {
        if (window.confirm('Are you sure you want to reset the board?')) {
            setTasks(initialTasks)
        }
    }
    const columns = [
        { id: 'todo',title: 'To Do', icon: <ClipboardList size={20} /> },
        { id: 'inprogress', title: 'In Progress', icon: <Loader size={20} /> },
        { id: 'done',title: 'Done', icon: <CheckCircle size={20} /> },
    ]
    return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    <div>
        <div className="input-row">
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: '10px 12px', borderRadius: '8px', border: darkMode ? '1px solid #334155' : '1px solid #cbd5e1', backgroundColor: darkMode ? '#1e293b' : 'white', color: darkMode ? 'white' : '#1e293b', fontSize: '14px', cursor: 'pointer', outline: 'none' }}>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
                </select>

                <input type="text" placeholder="Search tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: '10px 16px', borderRadius: '8px', border: darkMode ? '1px solid #334155' : '1px solid #cbd5e1', backgroundColor: darkMode ? '#1e293b' : 'white', color: darkMode ? 'white' : '#1e293b', fontSize: '14px', outline: 'none',width: '200px'}}/>

                <input type="text" className="task-input" placeholder="Enter a new task..." value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTask()}style={{ border: darkMode ? '1px solid #334155' : '1px solid #cbd5e1', backgroundColor: darkMode ? '#1e293b' : 'white', color: darkMode ? 'white' : '#1e293b', borderRadius: '8px',
                }}/>

                <button onClick={addTask} style={{ backgroundColor: '#03044a', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 16px', cursor: 'pointer',display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap'
                }} >
                    <Plus size={18} />Add Task
                    </button>
                    <button onClick={resetBoard} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '14px', fontWeight: '600',whiteSpace: 'nowrap'
                    }}>
                        <RotateCcw size={16} />Reset
                        </button>
                        </div>
                        <div className="board-container">
                            {columns.map(column => (
                            <Column key={column.id} title={column.title} icon={column.icon} tasks={tasks.filter(task => task.status === column.id && task.text.toLowerCase().includes(searchQuery.toLowerCase()))} deleteTask={deleteTask} moveTask={moveTask} columnId={column.id} darkMode={darkMode} editTask={editTask} />
                            ))}
                            </div>
                            </div>
                            <DragOverlay> {activeTask ?(
                                <TaskCard task={activeTask} darkMode={darkMode} deleteTask={() => {}} moveTask={() => {}} editTask={() => {}} columnId={activeTask.status}/> ) : null}
                                </DragOverlay>
                                </DndContext>                       
                            )
                        }
                        export default Board