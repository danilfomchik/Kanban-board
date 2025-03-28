import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import CheckIconPath from '@/icons/CheckIcon';
import CloseIconPath from '@/icons/CloseIcon';
import {updateColumnTitle} from '@/redux/columns/columnsSlice';

import {validation} from './form';
import {TEditTitleFormProps, TFormValues} from './types';

const EditTitleForm = ({column, onCloseEditMode}: TEditTitleFormProps) => {
    const dispatch = useDispatch();
    const methods = useForm<TFormValues>({
        resolver: yupResolver(validation),
        defaultValues: {
            title: column.title,
        },
        mode: 'onSubmit',
    });

    const {
        register,
        handleSubmit,
        formState: {errors, isDirty},
    } = methods;

    const onSubmit: SubmitHandler<TFormValues> = data => {
        dispatch(updateColumnTitle({columnId: column.id, newTitle: data.title}));
        onCloseEditMode();
    };

    const onBlurInput = () => {
        setTimeout(onCloseEditMode, 100);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between gap-[20px] w-auto">
                <div className="flex self-stretch my-[6px]">
                    <input
                        {...register('title')}
                        onBlur={onBlurInput}
                        autoFocus
                        placeholder="Enter column name"
                        aria-invalid={errors.title ? 'true' : 'false'}
                        className="bg-black w-full focus:border-sky-500 border rounded outline-none px-2"
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        className="text-sm p-2"
                        disabled={!isDirty}
                        icon={
                            <Icon size="size-5">
                                <CheckIconPath />
                            </Icon>
                        }
                        type="submit"
                    />
                    <Button
                        className="text-sm p-2"
                        icon={
                            <Icon size="size-5">
                                <CloseIconPath />
                            </Icon>
                        }
                        onClick={onCloseEditMode}
                    />
                </div>
            </div>
            {errors.title && (
                <p role="alert" className="text-rose-500 text-xs">
                    {errors.title.message}
                </p>
            )}
        </form>
    );
};

export default EditTitleForm;
