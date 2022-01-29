import { useState, useEffect } from 'react'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)

  //on page load, get the tasks via an async fetch
  useEffect(() => {
    const getTasks = async () => {
      let tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //fetch tasks from server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //get a single task by it's id
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

  }

  const deleteTask = async id => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })

    // was formerly a static 'remove' from the UI
    setTasks(tasks.filter(task => task.id !== id))
  }

  //this function is to adjust the reminder for a given task
  const toggleTaskReminder = async id => {
    //from the promise returned from fetchTask, set to a variable
    let taskToToggle = await fetchTask(id)
    // use the spread operator to add the properties of the task
    //once that is done, set the reminder value to the opposite of the tasks reminder value
    let updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    //after changing the task, we have to update it in the DB so we 'PUT' 
    //the value on top of the previous values for this id
    let res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'PUT',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    const data = await res.json()
    
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, reminder: !data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route path='/' 
            exact 
            element={
              <>
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
              </>
            }
          />
          <Route path='/about' element={<About/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
