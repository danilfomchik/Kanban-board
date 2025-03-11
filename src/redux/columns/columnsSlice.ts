import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {uid} from 'uid';

import {defaultColumns} from '@/services/constants';
import {StorageKeys} from '@/services/types';

import {SliceNames} from '../types';
import {
    TAddTaskAction,
    TColumn,
    TColumnsState,
    TCreateColumnAction,
    TDeleteColumnAction,
    TDeleteTaskAction,
    TEditTaskAction,
    TReorderTasksAction,
    TSetActiveColumnAction,
    TSetActiveTaskAction,
    TSetColumnTitleAction,
    TSetColumnsAction,
} from './types';

const reducers = {
    setColumns: (state: TColumnsState, action: PayloadAction<TSetColumnsAction['payload']>) => {
        state.columns = action.payload;
        localStorage.setItem(StorageKeys.colums, JSON.stringify(action.payload));
    },
    setActiveColumn: (state: TColumnsState, action: PayloadAction<TSetActiveColumnAction['payload']>) => {
        state.activeColumn = action.payload;
    },
    createNewColumn: (state: TColumnsState, action: PayloadAction<TCreateColumnAction['payload']>) => {
        const newColumn: TColumn = {
            id: uid(16),
            title: action.payload.columnName,
        };

        state.columns.push(newColumn);
        localStorage.setItem(StorageKeys.colums, JSON.stringify(state.columns));
    },
    deleteColumn: (state: TColumnsState, action: PayloadAction<TDeleteColumnAction['payload']>) => {
        const updatedColumns = state.columns.filter(column => column.id !== action.payload);

        const updatedTasks = state.tasks.filter(task => task.columnId !== action.payload);

        state.tasks = updatedTasks;
        state.columns = updatedColumns;

        if (updatedColumns.length > 0) {
            localStorage.setItem(StorageKeys.colums, JSON.stringify(updatedColumns));
        } else {
            localStorage.removeItem(StorageKeys.colums);
        }
    },
    updateColumnTitle: (state: TColumnsState, action: PayloadAction<TSetColumnTitleAction['payload']>) => {
        const {columnId, newTitle} = action.payload;
        const updatedColumns = state.columns.map(column => {
            if (column.id === columnId) {
                return {...column, title: newTitle};
            }
            return column;
        });

        state.columns = updatedColumns;
        localStorage.setItem(StorageKeys.colums, JSON.stringify(updatedColumns));
    },
    addTask: (state: TColumnsState, action: PayloadAction<TAddTaskAction['payload']>) => {
        state.tasks.push(action.payload);

        localStorage.setItem(StorageKeys.tasks, JSON.stringify(state.tasks));
    },
    setActiveTask: (state: TColumnsState, action: PayloadAction<TSetActiveTaskAction['payload']>) => {
        state.activeTask = action.payload;
    },
    deleteTask: (state: TColumnsState, action: PayloadAction<TDeleteTaskAction['payload']>) => {
        const {taskId} = action.payload;

        const updatedTasks = state.tasks.filter(task => task.id !== taskId);

        state.tasks = updatedTasks;

        if (updatedTasks.length > 0) {
            localStorage.setItem(StorageKeys.tasks, JSON.stringify(updatedTasks));
        } else {
            localStorage.removeItem(StorageKeys.tasks);
        }
    },
    editTask: (state: TColumnsState, action: PayloadAction<TEditTaskAction['payload']>) => {
        const {taskId, changedValues} = action.payload;

        const updatedTasks = state.tasks.map(task => {
            if (task.id === taskId) {
                return {...task, ...changedValues};
            }

            return task;
        });

        state.tasks = updatedTasks;
        localStorage.setItem(StorageKeys.tasks, JSON.stringify(updatedTasks));
    },
    reorderTasks: (state: TColumnsState, action: PayloadAction<TReorderTasksAction['payload']>) => {
        state.tasks = action.payload;
        localStorage.setItem(StorageKeys.tasks, JSON.stringify(action.payload));
    },
};

const storedColumns = localStorage.getItem(StorageKeys.colums);
const parsedColumns = storedColumns ? JSON.parse(storedColumns) : defaultColumns;

const storedTasks = localStorage.getItem(StorageKeys.tasks);
const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];

const initialState: TColumnsState = {
    columns: parsedColumns,
    tasks: parsedTasks,
    activeColumn: null,
    activeTask: null,
};

const columnsSlice = createSlice({
    name: SliceNames.columnsSlice,
    initialState,
    reducers,
});

export const {
    setColumns,
    setActiveColumn,
    createNewColumn,
    deleteColumn,
    updateColumnTitle,
    addTask,
    setActiveTask,
    deleteTask,
    editTask,
    reorderTasks,
} = columnsSlice.actions;
export default columnsSlice;
