import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';

import Button from '@/components/Button';
import CheckIconPath from '@/icons/CheckIcon';
import CloseIconPath from '@/icons/CloseIcon';
import EditIconPath from '@/icons/EditIcon';

import Icon from '../Icon';
import {validation} from './form';
import {TEditFormProps} from './types';

const BoardItemForm = ({actionType = 'edit', formTitle, defaultValues, onSubmit, handleModalClose}: TEditFormProps) => {
    const methods = useForm({
        resolver: yupResolver(validation),
        defaultValues: defaultValues || {field: ''},
        mode: 'onSubmit',
    });

    const {
        register,
        handleSubmit,
        formState: {errors, isDirty},
    } = methods;

    return (
        <div className="modal relative bg-mainBackgroundColor border border-sky-500 rounded-lg md:min-w-96 sm:min-w-56">
            <button
                className="absolute right-2 top-2 text-sm cursor-pointer hover:text-sky-500"
                onClick={handleModalClose}>
                <Icon size="size-5">
                    <CloseIconPath />
                </Icon>
            </button>

            <h3 className="text-lg font-bold p-3 text-center">{formTitle}</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center justify-between gap-[20px] w-auto px-[30px] py-[20px]">
                    <div className="flex flex-col gap-1 w-full">
                        <input
                            {...register('field')}
                            autoFocus
                            placeholder="Fill in the required field"
                            aria-invalid={errors.field ? 'true' : 'false'}
                            className="bg-black w-full focus:border-sky-500 border rounded outline-none px-[15px] py-[10px]"
                        />
                        {errors.field && (
                            <p role="alert" className="text-rose-500 text-xs">
                                {errors.field.message}
                            </p>
                        )}
                    </div>

                    <Button
                        className={`${
                            isDirty && !errors.field && 'border-sky-500 text-sky-500'
                        } text-sm p-2 disabled:hover:border-columnBackgroundColor disabled:text-columnBackgroundColor disabled:hover:text-columnBackgroundColor disabled:cursor-auto`}
                        disabled={!isDirty || !!errors.field}
                        text={actionType === 'edit' ? 'Edit' : 'Add'}
                        icon={
                            <Icon size={actionType === 'edit' ? 'size-5' : 'size-6'}>
                                {actionType === 'edit' ? <EditIconPath /> : <CheckIconPath />}
                            </Icon>
                        }
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default BoardItemForm;
