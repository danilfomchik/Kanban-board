import {MouseEvent, PropsWithChildren} from 'react';

export interface IOnCloseModalEvent extends MouseEvent<HTMLDivElement> {
    target: EventTarget & HTMLDivElement;
}

export type TModalProps = PropsWithChildren<{
    open: boolean;
    onClose?: () => void;
    className?: string;
}>;
