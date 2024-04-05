import React, { useMemo, useState } from "react";
import TestChildTodo from "./TestChildTodo";

const TestParentTodo = () => {
  const [text, setText] = useState("");
  const [task, setTask] = useState("");

  console.log("JUelfjddffffffffd");

  return (
    <div>
      Hello world
      <input value={task} onChange={(e)=> setTask(e.target.value) } />
      <TestChildTodo text={text} setText={setText} />
    </div>
  );
};

export default TestParentTodo;
