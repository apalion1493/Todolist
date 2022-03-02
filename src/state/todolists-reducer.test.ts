import {todolistReducer} from './todolists-reducer';
import {v1} from "uuid";
import {FilterValuesType, TodolistType} from '../App';

test('Correct todolist should be removed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodolistType> = [
      {id: todolistId1, title: 'What to learn', filter: 'all'},
      {id: todolistId2, title: 'What to bye', filter: 'all'}
  ];

  const endState = todolistReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1});

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
  expect(endState[0].filter).toBe('all');
});

test('Correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New todolist title';

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to bye', filter: 'all'}
    ];

    const endState = todolistReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle});

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('all');
});

test('Correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New todolist title';

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to bye', filter: 'all'}
    ];

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }

    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('Correct filter of todolist should be changed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = 'completed';

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to bye', filter: 'all'}
    ];

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistReducer(startState, action);

    expect(endState[1].filter).toBe(newFilter);
});