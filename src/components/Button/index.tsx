import {twMerge} from 'tailwind-merge';

import {TButtonProps} from './types';

const Button = ({icon = null, text = '', className, ...restProps}: TButtonProps) => {
    const classes = twMerge(
        `h-auto w-auto p-3 flex justify-center items-center gap-2 cursor-pointer border border-columnBackgroundColor rounded-lg bg-mainBackgroundColor transition hover:border-sky-500 hover:text-sky-500 disabled:hover:border-columnBackgroundColor disabled:text-columnBackgroundColor disabled:hover:text-columnBackgroundColor disabled:cursor-auto ${
            className ?? ''
        }`,
    );

    return (
        <button className={classes} {...restProps}>
            {icon}
            {text}
        </button>
    );
};

export default Button;
