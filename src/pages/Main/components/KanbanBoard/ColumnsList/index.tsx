import {SortableContext} from '@dnd-kit/sortable';
import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {deleteColumn} from '@/redux/columns/columnsSlice';
import {selectColumns} from '@/redux/columns/selectors';
import {TId} from '@/redux/columns/types';

import Column from '../Column';

const ColumnsList = () => {
    const dispatch = useDispatch();
    const columns = useSelector(selectColumns);

    const columnsIds = useMemo(() => columns.map(column => column.id), [columns]);

    const onDeleteColumn = (columnId: TId) => {
        dispatch(deleteColumn(columnId));
    };

    return (
        <>
            {columns.length ? (
                <div className="flex gap-4 mb-4 sm:mr-4 max-sm:flex-col max-sm:w-full">
                    <SortableContext items={columnsIds}>
                        {columns.map(column => (
                            <Column key={column.id} column={column} onDeleteColumn={onDeleteColumn} />
                        ))}
                    </SortableContext>
                </div>
            ) : null}
        </>
    );
};

export default ColumnsList;
