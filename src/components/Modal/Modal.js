import { Overlay, ModalItem } from './Modal.styled';

export const Modal = ({ onClose, src, alt }) => {
  const onBackdropClick = event => {
    console.log(event.target);
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={onBackdropClick}>
      <ModalItem>
        <img src={src} alt={alt} />
      </ModalItem>
    </Overlay>
  );
};
