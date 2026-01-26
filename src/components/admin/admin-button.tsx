import { Button, type TButtonProps } from "@/shadcn/ui/button";

type TAdminButtonProps = TButtonProps<{}>;

const AdminButton = (props: TAdminButtonProps) => {
  return <Button {...props} />;
};

export default AdminButton;
