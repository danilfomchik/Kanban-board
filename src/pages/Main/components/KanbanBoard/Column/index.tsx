import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useCallback, useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {uid} from 'uid';

import BoardItemForm from '@/components/BoardItemForm';
import {TFormFields} from '@/components/BoardItemForm/types';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Modal from '@/components/Modal';
import AddIconPath from '@/icons/AddIconPath';
import DeleteIconPath from '@/icons/DeleteIcon';
import EditIconPath from '@/icons/EditIcon';
import {addTask} from '@/redux/columns/columnsSlice';
import {selectTasksByColumn} from '@/redux/columns/selectors';
import {useModal} from '@/services/hooks';

import ColumnTasksList from './ColumnTasksList';
import EditTitleForm from './EditTitleForm';
import {TColumnProps} from './types';

const Column = ({column, onDeleteColumn}: TColumnProps) => {
    const [isTitleHover, setIsTitleHover] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const dispatch = useDispatch();
    const tasks = useSelector(selectTasksByColumn(column.id), shallowEqual);

    const {isOpen, handleModalClose, handleModalOpen} = useModal();
    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: column.id,
        data: {type: 'Column', column},
        disabled: isEditMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        touchAction: 'none',
    };

    const isDraggingStyles = isDragging ? 'opacity-30 border-2 border-sky-500' : '';

    const onAddNewTaskSubmit: SubmitHandler<TFormFields> = useCallback(
        data => {
            handleModalClose();

            dispatch(
                addTask({
                    id: uid(),
                    title: data.field,
                    columnId: column.id,
                }),
            );
        },
        [column.id, dispatch, handleModalClose],
    );

    return (
        <div
            className={`flex flex-col bg-mainBackgroundColor sm:w-[350px] h-[500px] max-sm:h-[300px] max-h-[500px] max-sm:max-h-[300px] rounded-md ${isDraggingStyles}`}
            style={style}
            ref={setNodeRef}>
            {!isDragging && (
                <>
                    <div
                        {...attributes}
                        {...listeners}
                        onMouseEnter={() => setIsTitleHover(true)}
                        onMouseLeave={() => setIsTitleHover(false)}
                        className="flex items-center justify-between min-h-[75px] bg-mainBackgroundColor text-xl cursor-grab rounded-md rounded-b-none p-3 font-bold border-b-2 border-columnBackgroundColor">
                        <div className="flex items-center gap-2">
                            {isEditMode ? (
                                <EditTitleForm
                                    column={column}
                                    onCloseEditMode={() => {
                                        setIsEditMode(false);
                                    }}
                                />
                            ) : (
                                <>
                                    {column.title}
                                    {isTitleHover && (
                                        <Button
                                            className="text-sm p-2"
                                            icon={
                                                <Icon size="size-5">
                                                    <EditIconPath />
                                                </Icon>
                                            }
                                            onClick={() => {
                                                setIsEditMode(true);
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </div>

                        {!isEditMode && (
                            <Button
                                className="text-sm p-2"
                                icon={
                                    <Icon size="size-5">
                                        <DeleteIconPath />
                                    </Icon>
                                }
                                onClick={() => onDeleteColumn(column.id)}
                            />
                        )}
                    </div>

                    <ColumnTasksList tasks={tasks} />

                    <div className="flex justify-start gap-3 p-3">
                        <div className="flex items-center px-2 py-1 text-sm rounded-md">{tasks?.length}</div>

                        <Button
                            icon={
                                <Icon size="size-6">
                                    <AddIconPath />
                                </Icon>
                            }
                            text="Add task"
                            onClick={handleModalOpen}
                        />
                    </div>
                </>
            )}

            <Modal open={isOpen} onClose={handleModalClose}>
                <BoardItemForm
                    actionType="add"
                    formTitle="Create new task"
                    onSubmit={onAddNewTaskSubmit}
                    handleModalClose={handleModalClose}
                />
            </Modal>
        </div>
    );
};

export default Column;
