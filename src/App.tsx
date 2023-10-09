import React,{useState,ChangeEvent,useEffect,useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import {Itask} from './Interfaces'
import TodoTask from './component/TodoTask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const inputElement =useRef<HTMLInputElement>(null)
  const [task, setTask] = useState<string>('')
  const [todos, settodos] = useState<Itask[]>([])
  const handleAddtodo=(todo:string):void=>{
    if(task.length>0){
      const newTask = {task:task}
      settodos([...todos,newTask])
      setTask('')
      toast.success('Add successfully')
    }else{
      toast.warn('Length of task > 0')
    }
    inputElement.current?.focus()
    
  }

  useEffect(()=>{
    const arr=localStorage.getItem('todos')
    // console.log(JSON.parse(arr||''))
    settodos(JSON.parse(arr||'')) 
  },[])

  useEffect(() => {
    const arrayJSON = JSON.stringify(todos);
    localStorage.setItem('todos',arrayJSON)
    // console.log(todos)
  }, [todos])

  const completeTask=(taskItemToDelete:string)=>{
        settodos(            
            todos?.filter((item)=>{
              return item.task!==taskItemToDelete
            }
        ))
}
  const handlechange=(e:ChangeEvent<HTMLInputElement>):void=>{
    if(e.target.name==="todo"){
      setTask(e.target.value)
    }
  }


  return (
    <div className="App">
      <div className='h-[100px] flex justify-center bg-orange-700 fixed top-0 right-0 left-0 z-50'>
        <div className='flex justify-center h-[30px] mt-7 gap-2'>
          <input ref={inputElement} type="text" placeholder='Type todo' className='p-2 h-max outline-none' name='todo' value={task} onChange={handlechange}/>
          <button className='font-bold bg-gray-300 p-2 h-max' onClick={()=>handleAddtodo(task as string)}>Add</button>
        </div>
      </div>
      <div className='mt-[112px]'>
        <h3 className='text-[32px] font-semibold text-center'>Todo-list</h3>
      </div>
      <div className='todolist m-auto flex justify-center flex-wrap'>
        {todos.map((item:Itask,key:number)=>{
          return <div key={key}  className='w-full flex justify-center mt-2'>
             <TodoTask taskItem={item} completeTask={completeTask}/>
          </div>
        })}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
    <ToastContainer />
    </div>
  );
}

export default App;
