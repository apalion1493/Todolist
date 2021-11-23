import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };
    const addItem = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            return;
        }
        props.addItem(newTaskTitle.trim())
        setNewTaskTitle('')
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem()
        }
    };

    return (
        <div className='todolist__wrapper'>
            <div>
                <TextField size={"small"} variant="outlined" value={newTaskTitle}
                           error={!!error}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={error ? 'error' : ''}
                           label={'Title'}
                           helperText={error}
                />
            </div>
            <IconButton color={"primary"} size={"medium"} onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}