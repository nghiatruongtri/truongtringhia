interface WalletBalance {}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  // Define props specific to WalletPage, extending base HTMLDivElement props
}

const WalletRow: React.FC<Props> = ({ children, ...rest }) => {
  return <div {...rest}>{}</div>;
};

export default WalletRow;
