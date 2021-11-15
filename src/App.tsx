import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'css', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>('all');

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        let copy = [...tasks];
        setTasks(copy);
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter( t => t.id !== id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };

        setTasks([newTask, ...tasks])
    }
    
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodolist = tasks;

    if(filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    if(filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <Todolist changeTaskStatus={changeStatus} changeFilter={changeFilter} addTask={addTask} removeTask={removeTask} tasks={tasksForTodolist} filter={filter} title={"What to learn"}/>
        </div>
    );
}

export default App;
