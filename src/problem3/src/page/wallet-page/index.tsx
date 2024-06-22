import React, {useMemo} from "react";
import WalletRow from "../../component/wallet-row"; // Import WalletRow from correct path
import {usePrices, useWalletBalances} from "../../utils"; // Adjust path as needed

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // Added blockchain field for clarity
}

interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    // Define props specific to WalletPage, extending base HTMLDivElement props
}

const WalletPage: React.FC<Props> = ({children, ...rest}) => {
    const balances = useWalletBalances();
    const prices = usePrices();

    // Function to determine priority based on blockchain type
    const getPriority = (blockchain: string): number => {
        switch (blockchain) {
            case "Osmosis":
                return 100;
            case "Ethereum":
                return 50;
            case "Arbitrum":
                return 30;
            case "Zilliqa":
            case "Neo":
                return 20;
            default:
                return -99;
        }
    };

    // Memoized and sorted balances based on priority
    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: {
                amount: number
            }) => balance.amount > 0) // Filter out balances with zero or negative amounts
            .sort((lhs: { blockchain: string }, rhs: { blockchain: string }) => {
                const leftPriority = getPriority(lhs.blockchain);
                const rightPriority = getPriority(rhs.blockchain);
                return rightPriority - leftPriority; // Sort in descending order of priority
            });
    }, [balances]);

    // Format balances for display
    const rows = sortedBalances.map((balance: FormattedWalletBalance) => {
        const formattedBalance: FormattedWalletBalance = {
            ...balance,
            formatted: balance.amount.toFixed(),
        };

        const usdValue = prices[balance.currency] * balance.amount;

        return (
            <WalletRow
                className={classes.row}
                key={balance.currency} // Assuming currency is unique for each balance
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={formattedBalance.formatted}
            />
        );
    });

    return <div {...rest}>{rows}</div>;
};

export default WalletPage;
