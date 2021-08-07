import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)

  useEffect(() => {
    const getTasks = async () => {
      let tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async id => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const addTask = async task => {
    let res = await fetch('http://localhost:5000/tasks/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    let data = await res.json()
    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 10000 + 1)
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  const deleteTask = async id => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })

    // was formerly a static 'remove'
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleTaskReminder = async id => {
    let taskToToggle = await fetchTask(id)
    let updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    let res = setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    )
  }

  return (
    <div className='container'>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleTaskReminder}
        />
      ) : (
        "No tasks have been added. Try hitting the 'add' button"
      )}
    </div>
  )
}

export default App
