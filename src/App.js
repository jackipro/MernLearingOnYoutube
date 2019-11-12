import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./component/navbar.component";
import ExercisesList from "./component/exercise-list.component.js";
import EditExercises from "./component/edit-exercise.component";
import CreateExercises from "./component/create-exercise.component";
import CreateUser from "./component/create-user.component";
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" exact component={EditExercises} />
        <Route path="/create" exact component={CreateExercises} />
        <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
