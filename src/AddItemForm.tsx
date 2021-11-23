import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <button onClick={addItem}>+</button>
        </div>
    )
}