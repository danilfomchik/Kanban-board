import {PropsWithChildren} from 'react';

import {TIconProps} from './types';

const Icon = ({size, className = '', children}: PropsWithChildren<TIconProps>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`${size} ${className}`}>
            {children}
        </svg>
    );
};

export default Icon;
