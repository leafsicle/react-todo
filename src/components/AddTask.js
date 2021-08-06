import { useState } from 'react'

const AddTask = () => {
  // const [text, setText] = (useState = '')
  // const [day, setDay] = (useState = '')
  // const [reminder, setReminder] = (useState = false)

  return (
    <form action='' className='add-form'>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          placeholder='Add Task'
          //value={text}
          // onChange={e => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Day and Time</label>
        <input
          type='text'
          placeholder='Add day and time'
          //value={day}
          // onChange={e => setDay(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set reminder?</label>
        <input
          type='checkbox'
          // /value={reminder}
          // onChange={e => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input className='btn btn-block' type='submit' value='Save Task ' />
    </form>
  )
}
export default AddTask
