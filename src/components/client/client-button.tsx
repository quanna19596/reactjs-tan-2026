import { Button, type TButtonProps } from "@/shadcn/ui/button";

type TClientButtonProps = TButtonProps<{}>;

const ClientButton = (props: TClientButtonProps) => {
  return <Button {...props} />;
};

export default ClientButton;
