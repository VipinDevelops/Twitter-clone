import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TfiClose } from "react-icons/tfi";
import Button from "../Button";
import { BsTwitter } from "react-icons/bs";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, actionLabel, footer, disabled }) => {
  const handleClose = useCallback(() => {
    if (disabled) return;
    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative w-full h-full mx-auto my-6 lg:w-3/6 lg:max-w-3xl lg:h-auto">
          <div className="relative flex flex-col w-full h-full bg-black border-0 shadow-lg outline-none lg:rounded-3xl lg:h-auto focus:outline-none ">
            <div className="flex flex-row p-3">
              <button
                className="p-1 text-white transition rounded-full hover:bg-gray-500/10 w-14 h-14"
                onClick={handleClose}
              >
                <TfiClose className="mx-auto" size={20} strokeWidth="1.25" />
              </button>
              <div className="mx-auto text-white">
                <BsTwitter size={40} />
              </div>
            </div>

            <h3 className="text-3xl font-semibold text-center text-white">{title}</h3>

            <div className="relative flex-auto p-10">{body}</div>

            <div className="flex flex-col gap-2 p-10">
              <Button disabled={disabled} label={actionLabel} secondary fullWidth large onClick={handleSubmit} />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
