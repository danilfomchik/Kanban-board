import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useCallback, useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import BoardItemForm from '@/components/BoardItemForm';
import {TFormFields} from '@/components/BoardItemForm/types';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Modal from '@/components/Modal';
import DeleteIconPath from '@/icons/DeleteIcon';
import EditIconPath from '@/icons/EditIcon';
import {deleteTask, editTask} from '@/redux/columns/columnsSlice';
import {useModal} from '@/services/hooks';

import {TTasksProps} from './types';

const Task = ({task}: TTasksProps) => {
    const [isHover, setIsHover] = useState(false);

    const dispatch = useDispatch();

    const {isOpen, handleModalClose, handleModalOpen} = useModal();
    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: task.id,
        data: {type: 'Task', task},
        disabled: isOpen,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        touchAction: 'none',
    };

    const isDraggingStyles = isDragging ? 'opacity-50 border-2 border-sky-500' : '';

    const onDeleteTask = () => {
        dispatch(deleteTask({taskId: task.id}));
    };

    const onEditFormSubmit: SubmitHandler<TFormFields> = useCallback(
        data => {
            handleModalClose();
            setIsHover(false);
            dispatch(
                editTask({
                    taskId: task.id,
                    changedValues: {
                        title: data.field,
                    },
                }),
            );
        },
        [dispatch, task.id, handleModalClose],
    );

    return (
        <div
            className={`flex items-center justify-between min-h-[70px] max-sm:min-h-[40px] p-3 mx-3 rounded-lg bg-columnBackgroundColor border-columnBackgroundColor border-2 cursor-grab hover:border-sky-500 ${isDraggingStyles}`}
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            {!isDragging && (
                <>
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">{task.title}</span>
                    {isHover && (
                        <div className="flex gap-2">
                            <Button
                                className="text-sm p-1.5 max-sm:p-1"
                                icon={
                                    <Icon size="size-4" className="max-sm:size-3">
                                        <EditIconPath />
                                    </Icon>
                                }
                                onClick={handleModalOpen}
                            />
                            <Button
                                className="text-sm p-1.5 max-sm:p-1"
                                icon={
                                    <Icon size="size-4" className="max-sm:size-3">
                                        <DeleteIconPath />
                                    </Icon>
                                }
                                onClick={onDeleteTask}
                            />
                        </div>
                    )}
                </>
            )}

            <Modal open={isOpen} onClose={handleModalClose}>
                <BoardItemForm
                    formTitle="Edit task"
                    defaultValues={{field: task.title}}
                    onSubmit={onEditFormSubmit}
                    handleModalClose={handleModalClose}
                />
            </Modal>
        </div>
    );
};

export default Task;
