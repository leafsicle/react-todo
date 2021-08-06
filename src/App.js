import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Dr. Appointment',
      day: 'Feb 5th at 1430',
      reminder: true,
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1330',
      reminder: true,
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 5th at 1430',
      reminder: false,
    },
  ])

  const addTask = task => {
    console.log(task)

    const id = Math.floor(Math.random() * 10000 + 1)
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
    //This is where I would set 'active' to false if I had a backend implemented
    //task.active ===  false
  }

  const toggleTaskReminder = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    )
  }

  return (
    <div className='container'>
      <Header />
      <AddTask onAdd={addTask} />
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
