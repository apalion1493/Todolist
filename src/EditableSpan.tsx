import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('')
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }

    return (
        editMode ?
            <TextField color={"primary"} onBlur={activateViewMode} autoFocus={true} value={title} onChange={onChangeTitleHandler}/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}