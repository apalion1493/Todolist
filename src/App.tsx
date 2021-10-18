import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

function App() {
    const tasks_1: TaskType [] = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'css', isDone: true},
        {id: 3, title: 'react', isDone: false}
    ];

    const tasks_2: TaskType [] = [
        {id: 1, title: 'Film 1', isDone: true},
        {id: 2, title: 'Film 2', isDone: true},
        {id: 3, title: 'Film 3', isDone: true}
    ];

    return (
        <div className="App">
            <Todolist tasks={tasks_1} title={"What to learn"}/>
            <Todolist tasks={tasks_2} title={"Movies"}/>
        </div>
    );
}

export default App;
