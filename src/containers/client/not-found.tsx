type TNotFoundProps = {
  locale?: string;
};

const NotFound = ({ locale = "vi" }: TNotFoundProps) => {
  return <div>NOT FOUND in {locale}</div>;
};

export default NotFound;
