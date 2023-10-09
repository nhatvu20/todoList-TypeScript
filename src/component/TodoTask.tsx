import React, { useState } from "react";
import { Itask } from "../Interfaces";

interface Props {
  taskItem?: Itask;
  completeTask(taskItemToDelete: string): void;
}

const TodoTask = ({ taskItem, completeTask }: Props) => {
  const [complete, setcomplete] = useState(false);
  return (
    <div className="flex ">
      <span
        className={`font-semibold bg-red-400 p-2 w-[300px] text-center cursor-pointer ${
          complete && "line-through-full relative"
        }`}
        onClick={() => setcomplete((prev) => !prev)}
      >
        {taskItem?.task}
      </span>
      <button
        className="p-2 bg-green-400 w-[100px] text-center border-white border-r-2 font-semibold"
        onClick={() => completeTask(taskItem?.task || "")}
      >
        X
      </button>
      <button
        className={`p-2 bg-green-400 w-[100px] text-center font-semibold`}
        onClick={() => setcomplete((prev) => !prev)}
      >
        V
      </button>
    </div>
    
  );
};

export default TodoTask;
