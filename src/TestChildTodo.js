import React from "react";

const TestChildTodo = ({ text, setText }) => {
  console.log("Hello");
  return (
    <div>
      <input value={text} onChange={(event) => setText(event.target.value)} />
    </div>
  );
};

// const testMemo = (prevProps, nextProps) => {
//   return prevProps === nextProps;
// };


export default TestChildTodo;
