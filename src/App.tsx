import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
        },
        {
            id: todolistId2,
            title: 'What to bye',
            filter: 'all',
        }
    ]);

    let [tasksObj, settasksObj] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Meat', isDone: false},
        ]
    })



    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            settasksObj({...tasksObj});
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            settasksObj({...tasksObj});
        }
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredtasksObj = tasks.filter( t => t.id !== id);
        tasksObj[todolistId] = filteredtasksObj;
        settasksObj({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let task = {
            id: v1(),
            title: title,
            isDone: false
        };
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        settasksObj({...tasksObj})
    }
    
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function changeTodolistTitle(newTitle: string, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }

    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        settasksObj({...tasksObj});
    }
    
    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists])
        settasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={(title: string) => {addTodolist(title)}}/>
            {
                todolists.map((tl) => {
                    let tasksObjForTodolist = tasksObj[tl.id];

                    if(tl.filter === 'completed') {
                        tasksObjForTodolist = tasksObjForTodolist.filter(t => t.isDone)
                    }

                    if(tl.filter === 'active') {
                        tasksObjForTodolist = tasksObjForTodolist.filter(t => !t.isDone)
                    }

                    return <Todolist key={tl.id}
                                     changeTaskStatus={changeStatus}
                                     changeTodolistTitle={changeTodolistTitle}
                                     changeTaskTitle={changeTaskTitle}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     removeTask={removeTask}
                                     tasks={tasksObjForTodolist}
                                     filter={tl.filter}
                                     title={tl.title}
                                     id={tl.id}
                                     removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
