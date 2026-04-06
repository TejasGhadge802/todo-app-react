import './App.css'
import React from "react";
import { Toaster } from "react-hot-toast";

import Todo from "./components/Todo.jsx";


function App() {

  return (
    <div>
      <Toaster></Toaster>
      <Todo />
    </div>
  )
}

export default App
