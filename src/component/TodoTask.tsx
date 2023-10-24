import React, { useState, useRef, useEffect } from "react";
import { Itask } from "../Interfaces";
import { toast } from "react-toastify";
interface Props {
  taskItem: Itask;
  deleteTask: (id: number) => void;
  modifyTodo(item: Itask, taskmodfy: string): void;
  completeTodo(item: Itask): void;
}

const TodoTask = ({
  taskItem,
  deleteTask,
  modifyTodo,
  completeTodo,
}: Props) => {
  const [iscomplete, setiscomplete] = useState(taskItem.complete);
  const [ismodify, setismodify] = useState(false);
  const [taskmodfy, settaskmodfy] = useState("");
  const inputMdf = useRef<HTMLInputElement>(null);
  const handlechange = (e: any) => {
    settaskmodfy(e.target.value);
  };

  const handlechangelecomplete = (e: any) => {
    console.log(taskItem.complete);
    setiscomplete(e.target.checked);
  };
  // if(ismodify){
  //   inputMdf?.current?.focus()
  // }
  useEffect(() => {
    inputMdf?.current?.focus();
  }, [ismodify]);
  return (
    <div className="flex gap-2">
      <input
        type="checkbox"
        className={` bg-green-400 w-[20px] text-center font-semibold cursor-pointer`}
        onClick={() => {
          setiscomplete((prev) => !prev);
          completeTodo(taskItem);
          setismodify(false);
        }}
        checked={taskItem.complete}
        onChange={() => handlechangelecomplete}
      />
      {/* ô input để nhập và sửa*/}
      {!ismodify ? (
        <>
          <button
            className={`font-semibold bg-red-400 p-2 w-[300px] text-center cursor-pointer ${
              iscomplete && "line-through-full relative opacity-60"
            }`}
            onDoubleClick={() => {
              setismodify(true);
              settaskmodfy(taskItem.task);
            }}
          >
            {taskItem?.task}
          </button>{" "}
          <button
            className={`${
              iscomplete && "!cursor-not-allowed"
            } p-2 bg-green-400 w-[100px] text-center border-white border-r-2 font-semibold
          // ${iscomplete ? "" : ""}`}
            onClick={() => {
              setismodify(true);
              settaskmodfy(taskItem.task);
            }}
            disabled={iscomplete}
            title={
              iscomplete ? "you can't only modify if task is not completed" : ""
            }
          >
            modify
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            maxLength={20}
            className={`outline-none font-semibold bg-red-400 p-2 w-[300px] text-center cursor-pointer 
        ${iscomplete && "line-through-full relative opacity-60"}`}
            ref={inputMdf}
            value={taskmodfy}
            onChange={handlechange}
            onBlur={() => {
              if (taskmodfy.length > 0) {
                modifyTodo(taskItem, taskmodfy);
                setismodify(false);
              } else {
                toast.warn("Length of task > 0");
              }
            }}
          />
          <button
            className="p-2 bg-green-400 w-[100px] text-center border-white border-r-2 font-semibold"
            // onClick={() => {
            //   console.log(taskmodfy);
            //   if (taskmodfy.length > 0) {
            //     modifyTodo(taskItem, taskmodfy);
            //     console.log(ismodify);
            //     setismodify(false);
            //   } else {
            //     toast.warn("Length of task > 0");
            //   }
            // }}
            title="Done Modify"
          >
            OK!
          </button>
        </>
      )}
      <div>
        {/* <button
          className={`font-semibold bg-red-400 p-2 w-[300px] text-center cursor-pointer ${
            iscomplete && "line-through-full relative opacity-60"
          }`}
          onDoubleClick={() => {
            setismodify(true);
            settaskmodfy(taskItem.task);
          }}
        >
          {taskItem?.task}
        </button> */}
        {/* <button
          className={`${
            iscomplete && "!cursor-not-allowed"
          } p-2 bg-green-400 w-[100px] text-center border-white border-r-2 font-semibold
          // ${iscomplete ? "" : ""}`}
          onClick={() => {
            setismodify(true);
            settaskmodfy(taskItem.task);
          }}
          disabled={iscomplete}
          title={
            iscomplete ? "you can only modify if task is not completed" : ""
          }
        >
          modify
        </button> */}
      </div>

      {!ismodify ? (
        <div>
          {/* <button
            className={`font-semibold bg-red-400 p-2 w-[300px] text-center cursor-pointer ${
              iscomplete && "line-through-full relative opacity-60"
            }`}
            onDoubleClick={() => {
              setismodify(true);
              settaskmodfy(taskItem.task);
            }}
          >
            {taskItem?.task}
          </button>
          <button
            className={`${
              taskItem.complete && "cursor-not-allowed"
            } p-2 bg-green-400 w-[100px] text-center border-white border-r-2 font-semibold`}
            onClick={() => {
              setismodify(true);
              settaskmodfy(taskItem.task);
            }}
            disabled={taskItem.complete}
            title={
              taskItem.complete
                ? "you can only modify if task is not completed"
                : ""
            }
          >
            modify
          </button> */}
        </div>
      ) : (
        <div>
          {/* <input
            type="text"
            maxLength={20}
            className={`outline-none font-semibold bg-red-400 p-2 w-[300px] text-center cursor-pointer }`}
            ref={inputMdf}
            value={taskmodfy}
            onChange={handlechange}
            onBlur={() => {
              if (taskmodfy.length > 0) {
                modifyTodo(taskItem, taskmodfy);
                setismodify(false);
              } else {
                toast.warn("Length of task > 0");
              }
            }}
          /> */}
          {/* <button
            className={`${
              taskItem.complete && "cursor-not-allowed"
            } p-2 bg-green-400 w-[100px] text-center border-white border-r-2 font-semibold`}
            onClick={() => {
              setismodify(true);
              settaskmodfy(taskItem.task);
            }}
            disabled={taskItem.complete}
            title={
              taskItem.complete
                ? "you can only modify if task is not completed"
                : ""
            }
          >
            modify
          </button> */}
          {/* <button
            className="p-2 bg-green-400 w-[100px] text-center border-white border-r-2 font-semibold"
            onClick={() => {
              console.log(taskmodfy);
              if (taskmodfy.length > 0) {
                modifyTodo(taskItem, taskmodfy);
                console.log(ismodify);
                setismodify(false);
              } else {
                toast.warn("Length of task > 0");
              }
            }}
            title="Done Modify"
          >
            OK!
          </button> */}
        </div>
      )}
      <button
        className="p-2 bg-green-400 w-[100px] text-center border-white border-r-2 font-semibold"
        onClick={() => deleteTask(taskItem.id)}
        title="Delete Task"
      >
        delete
      </button>
    </div>
  );
};

export default TodoTask;
