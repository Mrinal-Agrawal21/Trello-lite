import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SplitText from "./components/SplitText";
import DecryptedText from "./components/DecryptedText";
import Sidebar from './components/Sidebar';
import { IoMdAddCircle } from "react-icons/io";
import { FaPlus, FaTrash } from "react-icons/fa";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

// Draggable Card Component
const DraggableCard = ({ item, index, listType, onRemove, onMove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: `${listType}-${index}`, content: item, sourceList: listType, sourceIndex: index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-white text-black flex justify-between p-2 rounded-full cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
      key={index}
    >
      <h1 className='text-gray-700'>{item}</h1>
      <button onClick={() => onRemove(index)} className='bg-red-500 text-white p-2 rounded-full'>
        <FaTrash />
      </button>
    </div>
  );
};

// Droppable Section Component
const DroppableSection = ({ title, items, inputValue, onInputChange, onAdd, onRemove, listType, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div 
      ref={drop}
      className={`flex flex-col gap-4 rounded-2xl w-1/4 ${
        listType === 'todo' ? 'bg-[rgba(0,0,0,0.45)]' : 
        listType === 'inProgress' ? 'bg-blue-500' : 'bg-green-500'
      } ${isOver ? 'ring-2 ring-white ring-opacity-50' : ''}`}
    >
      <div className="flex flex-row justify-center items-center mt-5 gap-2">
        <input 
          value={inputValue} 
          onChange={onInputChange} 
          type="text" 
          className="w-1/2 p-2 border-b-2 text-white bg-transparent border-white outline-none" 
          placeholder="Add new item..."
        />
        <button onClick={onAdd} className="bg-white text-black p-2 rounded-full">
          <FaPlus />
        </button>
      </div>
      <div className='flex flex-col gap-4 p-4'>
        {items.map((item, index) => (
          <DraggableCard
            key={`${listType}-${index}`}
            item={item}
            index={index}
            listType={listType}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  
  const [todoInput, setTodoInput] = useState('');
  const [inProgressInput, setInProgressInput] = useState('');
  const [doneInput, setDoneInput] = useState('');

  const addTodo = () => {
    if (todoInput.trim()) {
      setTodo([...todo, todoInput.trim()]);
      setTodoInput('');
    }
  };

  const addInProgress = () => {
    if (inProgressInput.trim()) {
      setInProgress([...inProgress, inProgressInput.trim()]);
      setInProgressInput('');
    }
  };

  const addDone = () => {
    if (doneInput.trim()) {
      setDone([...done, doneInput.trim()]);
      setDoneInput('');
    }
  };

  const removeTodo = (index) => {
    setTodo(todo.filter((_, i) => i !== index));
  };

  const removeInProgress = (index) => {
    setInProgress(inProgress.filter((_, i) => i !== index));
  };

  const removeDone = (index) => {
    setDone(done.filter((_, i) => i !== index));
  };

  const handleDrop = (item, targetList) => {
    const { content, sourceList, sourceIndex } = item;
    
    // Remove from source list
    if (sourceList === 'todo') {
      setTodo(todo.filter((_, i) => i !== sourceIndex));
    } else if (sourceList === 'inProgress') {
      setInProgress(inProgress.filter((_, i) => i !== sourceIndex));
    } else if (sourceList === 'done') {
      setDone(done.filter((_, i) => i !== sourceIndex));
    }
    
    // Add to target list
    if (targetList === 'todo') {
      setTodo([...todo, content]);
    } else if (targetList === 'inProgress') {
      setInProgress([...inProgress, content]);
    } else if (targetList === 'done') {
      setDone([...done, content]);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex  justify-center bg-[url('./assets/bg.mp4')] bg-cover bg-center gap-4 h-screen">
        <Sidebar />
        
        <div className="flex flex-row p-2 gap-4 w-full justify-center">
          {/* Todo */}
          <DroppableSection
            title="Todo"
            items={todo}
            inputValue={todoInput}
            onInputChange={(e) => setTodoInput(e.target.value)}
            onAdd={addTodo}
            onRemove={removeTodo}
            listType="todo"
            onDrop={(item) => handleDrop(item, 'todo')}
          />
          {/* In Progress */}
          <DroppableSection
            title="In Progress"
            items={inProgress}
            inputValue={inProgressInput}
            onInputChange={(e) => setInProgressInput(e.target.value)}
            onAdd={addInProgress}
            onRemove={removeInProgress}
            listType="inProgress"
            onDrop={(item) => handleDrop(item, 'inProgress')}
          />
          {/* Done */}
          <DroppableSection
            title="Done"
            items={done}
            inputValue={doneInput}
            onInputChange={(e) => setDoneInput(e.target.value)}
            onAdd={addDone}
            onRemove={removeDone}
            listType="done"
            onDrop={(item) => handleDrop(item, 'done')}
          />
        </div>
      </div>
    </DndProvider>
  )
}

export default App
