import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TaskList from "./pages/Main";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<TaskList />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
