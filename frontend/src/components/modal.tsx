import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ModalProps } from "./types";

export default function Modal({
  call,
  cancelText,
  saveText,
  onSave,
  title,
  content,
  onCancel,
  callTailwind
}: ModalProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <span className={callTailwind} onClick={handleClickOpen}>
        {call}
      </span>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div className="text-brand_text_primary ml-4 border-b border-b-brand_gray pb-1 text-lg sm:text-xl">
            {title}
          </div>
        </DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <div className="w-full flex justify-center gap-5">
            <button
              onClick={() => {
                handleClose();
                onCancel && onCancel();
              }}
              className="text-brand_text_primary font-700 capitalize hover:text-brand_text_primary/70 transition duration-200 tracking-tight sm:text-[18px]"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                handleClose();
                onSave();
              }}
              className="text-brand_text_primary font-700 capitalize hover:text-brand_text_primary/70 transition duration-200 tracking-tight sm:text-[18px]"
            >
              {saveText}
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
