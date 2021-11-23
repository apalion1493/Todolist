import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete, DeleteForever} from "@material-ui/icons";

type TodoListPropsType = {
    title: string,
    tasks: TaskType [],
    removeTask: (id: string, todolistId: string) => void,
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodoListPropsType) => {

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    };
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id);
    }

    return (
        <div className="todolist">
            <Typography variant="h6" style={{'fontWeight': 'bold'}}>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton size={"small"} onClick={removeTodolist}>
                    <DeleteForever/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask}/>
            <List>
                {
                    props.tasks.map((t) => {
                        const onRemoveTaskHandler = () => props.removeTask(t.id, props.id);
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        const onChangeTitleHandler = (newValue: string) => props.changeTaskTitle(t.id, newValue, props.id);

                        return (
                            <ListItem divider={true} dense={true} disableGutters={true} className={t.isDone ? 'isDone' : ''} key={t.id}>
                                <Checkbox color={'primary'} inputProps={{ 'aria-label': 'primary checkbox' }} onChange={onChangeStatusHandler} checked={t.isDone}/>
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <IconButton style={{'marginLeft': 'auto'}} size={"small"} onClick={onRemoveTaskHandler}>
                                    <Delete fontSize={"small"}/>
                                </IconButton>
                            </ListItem>
                        )
                    })
                }
            </List>
            <ButtonGroup style={{'marginTop': 'auto', 'justifyContent': 'center'}} size={"small"}>
                <Button variant={"contained"} color={props.filter === 'all' ? 'secondary' : 'primary'} className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</Button>
                <Button variant={"contained"} color={props.filter === 'active' ? 'secondary' : 'primary'} className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</Button>
                <Button variant={"contained"} color={props.filter === 'completed' ? 'secondary' : 'primary'} className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</Button>
            </ButtonGroup>
        </div>
    )
}
