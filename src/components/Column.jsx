import TaskCard from './TaskCard'
import { useDroppable } from '@dnd-kit/core'

function Column({ title, icon, tasks, deleteTask, moveTask, columnId, darkMode, editTask }) {
    const { setNodeRef } = useDroppable({ id: columnId })
    const columnColors = { 
        todo:{ light: '#dbeafe', dark: '#1e3a5f' },
        inprogress: { light: '#fef9c3', dark: '#3b2f00' }, 
        done:{ light: '#dcfce7', dark: '#14532d' },
    }

    const color = columnColors[columnId]

    return (
    <div ref={setNodeRef} className="column" style={{ backgroundColor: darkMode ? color.dark : color.light, borderRadius: '12px', padding: '16px', transition: 'all 0.3s ease'}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: darkMode ? 'white' : '#1e293b'}}>
            {icon}
            
            <h2 style={{ fontSize: '16px', fontWeight: '600' }}>{title}</h2>
            <span style={{ marginLeft: 'auto', backgroundColor: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)', borderRadius: '12px', padding: '2px 10px',fontSize: '13px', fontWeight: '700',color: darkMode ? 'white' : '#1e293b'}}>
                {tasks.length}
                </span>
                </div>
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} deleteTask={deleteTask} moveTask={moveTask} columnId={columnId} darkMode={darkMode} editTask={editTask} />))}
                    {tasks.length === 0 && (
                        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', marginTop: '40px'}}> No tasks here
                        </div>
                    )}
                    </div>
                    )
                }
                export default Column