import { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'


const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Workout',
      day: 'April 26th at 12:30pm',
      reminder: true
    },
    {
      id: 2,
      text: 'Do laundry',
      day: 'April 26th at 5:30pm',
      reminder: true
    },
    {
      id: 3,
      text: 'Get a haircut',
      day: 'April 28th at 2pm',
      reminder: false
    }
  ])


  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
     const newTask = { id, ...task }
     setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask =  (id) => { setTasks(tasks.filter((task) => task.id !== id)) 
    alert('Error Deleting This Task')
  }

  // Toggle Reminder
  const toggleReminder =  (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
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
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App