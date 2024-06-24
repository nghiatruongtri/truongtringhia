# WalletPage Component README

The `WalletPage` component is responsible for displaying wallet balances with associated information, formatted for
clarity and performance. Here are some considerations and potential improvements for the component:

## Issues and Considerations

### Incorrect Memoization Dependency Array

The `useMemo` hook used to memorize `sortedBalances` includes both `balances` and `prices` in its dependency array.
However, `prices` are not used within `useMemo`, leading to unnecessary recalculations when `prices` change. This can be
optimized by removing `prices` from the dependency array.

### Repeated Function Calls

The `getPriority` function, used to determine blockchain priority during sorting, is called multiple times for each
comparison. This can impact performance, especially with large datasets. Optimizing this by computing the priority once
per item and storing it could improve efficiency.

### Inefficient Filtering and Sorting

The current filtering logic within `useMemo` first filters balances with a specific condition (`balance.amount > 0`) and
then sorts them based on blockchain priority. This separation could be improved by combining filtering and sorting logic
for clarity and performance gains.

### Mapping Twice Over `sortedBalances`

The `sortedBalances` array is currently mapped twice: once to create `formattedBalances` and again to generate `rows`
for rendering. Combining these operations into a single map operation could streamline the code and improve readability.

### Using Index as Key

The `key` prop in `<WalletRow>` components uses the array index (`index`) which can lead to issues with React's
reconciliation process, especially if the list order changes. Using a unique identifier from the data (`balance.id` if
available) would be more appropriate.

### Unnecessary Type Assertions

The `.map` function used on `sortedBalances` does not require explicit type assertions if TypeScript can infer types
correctly from `balances`. Removing unnecessary type assertions can simplify the code and reduce potential errors.