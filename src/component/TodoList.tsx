import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { Itask } from "../Interfaces";
import TodoTask from "../component/TodoTask";
import { ToastContainer, toast } from "react-toastify";
function TodoList() {
  const inputElement = useRef<HTMLInputElement>(null);
  const [task, setTask] = useState<string>(""); //cong viec hien tai
  const [todos, settodos] = useState<Itask[]>([]);

  const handleAddtodo = (todo: string): void => {
    if (task.length > 0) {
      const newTask = { id: Date.now(), task: task,complete:false};
      settodos([...todos, newTask]);
      setTask("");
      inputElement.current?.focus();
    } else {
      toast.warn("Length of task > 0");
    }
  };
  //getdata from localStorage
  useEffect(() => {
    const arr = localStorage.getItem("todos");
    if (arr) settodos(JSON.parse(arr));
  }, []);
  //setdata for localStorage
  useEffect(() => {
    const arrayJSON = JSON.stringify(todos);
    localStorage.setItem("todos", arrayJSON);
    // console.log(todos)
  }, [todos]);
  //hàm xóa
  const deleteTask = (id: number) => {
    settodos(
      todos &&
        todos?.filter((item) => {
          return item.id !== id;
        })
    );
  };
  //Modify function todo
  const modifyTodo = (item: Itask,taskmodfy:string) => {
    settodos(todos.map((taskItem) => {
      if (taskItem.id === item.id) {
        return {
          ...taskItem,
          task: taskmodfy,
        };
      }
      return taskItem;
    }));
    // console.log(todoupdate)
    inputElement.current?.focus();
  };
  //modify complete todo
  const completeTodo = (item: Itask) => {
    settodos(todos.map((taskItem) => {
      if (taskItem.id === item.id) {
        return {
          ...taskItem,
          complete: !item.complete,
        };
      }
      return taskItem;
    }));
    // console.log(todoupdate)
  };

  const handlechange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "todo") {
      setTask(e.target.value);
    }
  };

  return (
    <div className="App">
      <div className="h-[100px] flex justify-center bg-orange-700 fixed top-0 right-0 left-0 z-50">
        <div className="flex justify-center h-[30px] mt-7 gap-2">
          <input
            ref={inputElement}
            type="text"
            placeholder="Type todo"
            className="p-2 h-max outline-none"
            name="todo"
            value={task}
            onChange={handlechange}
          />
          <button
            className="font-bold p-2 h-max bg-green-400"
            onClick={() => handleAddtodo(task as string)}
          >
            Add
          </button>
        </div>
      </div>
      <div className="mt-[112px]">
        <h3 className="text-[32px] font-semibold text-center">Todo-list</h3>
      </div>
      <div className="todolist m-auto flex justify-center flex-wrap">
        {todos.map((item: Itask, key: number) => {
          return (
            <div key={key} className="w-full flex justify-center mt-2">
              <TodoTask
                taskItem={item}
                deleteTask={deleteTask}
                modifyTodo={modifyTodo}
                completeTodo={completeTodo}
              />
            </div>
          );
        })}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={500}
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

export default TodoList;
