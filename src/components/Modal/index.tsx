import {createPortal} from 'react-dom';

import {IOnCloseModalEvent, TModalProps} from './types';

const Modal = ({open, className, onClose, children}: TModalProps) => {
    const onCloseModal = (e: IOnCloseModalEvent) => {
        if (e.target.classList.contains('modal-wrapper')) {
            if (onClose) {
                onClose();
            }
        }
    };
    return (
        <>
            {open
                ? createPortal(
                      <div
                          className={`modal-wrapper fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-columnBackgroundColor bg-opacity-80 ${className ? className : ''}`}
                          onClick={onCloseModal}>
                          {children}
                      </div>,
                      document.body,
                  )
                : null}
        </>
    );
};

export default Modal;
