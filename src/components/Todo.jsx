import React from 'react'

const Todo = () => {
  return (
    <div>
      <input type="text" placeholder="Add a new todo" className=' border-b-2 text-white outline-none bg-transparent p-2'/>
      <button className='bg-blue-500 text-white p-2 rounded-md'>Add</button>
    </div>
  )
}

export default Todo
