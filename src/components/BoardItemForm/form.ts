import {object, string} from 'yup';

export const defaultValues = {
    field: '',
};

export const validation = object().shape({
    field: string().required('This field is required'),
});
