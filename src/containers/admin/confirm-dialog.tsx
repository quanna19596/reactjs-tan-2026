import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shadcn/ui/alert-dialog";

type TConfirmDialogProps = {
  title: string;
  description: string;
  visible: boolean;
  cancelBtn?: {
    label: string;
    onClick?: () => void;
  };
  submitBtn?: {
    label: string;
    onClick?: () => void;
  };
};

const ConfirmDialog = ({
  title,
  description,
  visible,
  cancelBtn,
  submitBtn,
}: TConfirmDialogProps) => {
  return (
    <AlertDialog open={visible}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelBtn?.onClick}>
            {cancelBtn?.label || "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={submitBtn?.onClick}>
            {submitBtn?.label || "Submit"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
