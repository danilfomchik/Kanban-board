import {DndContext, PointerSensor, pointerWithin, useSensor, useSensors} from '@dnd-kit/core';
import {useDispatch} from 'react-redux';

import {deleteColumn} from '@/redux/columns/columnsSlice';
import {TId} from '@/redux/columns/types';
import {useDnd} from '@/services/hooks';

import AddNewColumn from './AddNewColumn';
import ColumnsList from './ColumnsList';
import DragOverlay from './ColumnsList/DragOverlay';

const KanbanBoard = () => {
    const dispatch = useDispatch();
    const {activeColumn, activeTask, handleDragStart, handleDragEnd, handleDragOver} = useDnd();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3, // 3px
            },
        }),
    );

    return (
        <div className="m-auto flex items-center min-h-screen overflow-x-auto p-[40px] max-sm:px-[20px] sm:overflow-y-hidden">
            <DndContext
                sensors={sensors}
                collisionDetection={pointerWithin}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}>
                <div className="flex gap-4 items-center sm:my-auto max-sm:flex-col max-sm:w-full">
                    <ColumnsList />
                    <AddNewColumn />
                </div>

                <DragOverlay
                    activeColumn={activeColumn}
                    activeTask={activeTask}
                    onDeleteColumn={(columnId: TId) => {
                        dispatch(deleteColumn(columnId));
                    }}
                />
            </DndContext>
        </div>
    );
};

export default KanbanBoard;
