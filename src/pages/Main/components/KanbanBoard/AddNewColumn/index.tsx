import {useCallback} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import BoardItemForm from '@/components/BoardItemForm';
import {TFormFields} from '@/components/BoardItemForm/types';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Modal from '@/components/Modal';
import AddIconPath from '@/icons/AddIconPath';
import {createNewColumn} from '@/redux/columns/columnsSlice';
import {useModal} from '@/services/hooks';

const AddNewColumn = () => {
    const dispatch = useDispatch();
    const {isOpen, handleModalClose, handleModalOpen} = useModal();

    const onCreateNewColumn: SubmitHandler<TFormFields> = useCallback(
        data => {
            dispatch(createNewColumn({columnName: data.field}));
            handleModalClose();
        },
        [dispatch, handleModalClose],
    );

    return (
        <>
            <Button
                icon={
                    <Icon size="size-6">
                        <AddIconPath />
                    </Icon>
                }
                text="Add column"
                onClick={handleModalOpen}
                className="h-[60px] w-full sm:w-[350px]"
            />

            <Modal open={isOpen} onClose={handleModalClose}>
                <BoardItemForm
                    actionType="add"
                    formTitle="Add new column"
                    onSubmit={onCreateNewColumn}
                    handleModalClose={handleModalClose}
                />
            </Modal>
        </>
    );
};

export default AddNewColumn;
