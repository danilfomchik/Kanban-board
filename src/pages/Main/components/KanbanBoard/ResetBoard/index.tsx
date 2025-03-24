import {useSelector} from 'react-redux';

import Button from '@/components/Button';
import {resetBoard} from '@/redux/columns/columnsSlice';
import {selectAllTasks, selectColumns} from '@/redux/columns/selectors';
import {useAppDispatch} from '@/redux/store';
import {defaultColumns, defaultTasks} from '@/services/constants';

const ResetBoard = () => {
    const dispatch = useAppDispatch();
    const columns = useSelector(selectColumns);
    const tasks = useSelector(selectAllTasks);

    const isColumnsChanged = JSON.stringify(columns) !== JSON.stringify(defaultColumns);
    const isTasksChanged = JSON.stringify(tasks) !== JSON.stringify(defaultTasks);

    const handleResetBoard = () => {
        dispatch(resetBoard());
    };

    return (
        <Button
            text="Reset board"
            disabled={!isColumnsChanged && !isTasksChanged}
            onClick={handleResetBoard}
            className="h-[60px] w-full sm:w-[350px]"
        />
    );
};

export default ResetBoard;
