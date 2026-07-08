import ConnectedAccountCard from "./ConnectedAccountCard";
import EmptyAccountsState from "./EmptyAccountsState";

export default function ConnectedAccountsList({
  accounts,
  selectedId,
  onSelect,
  onReconnect,
  onTogglePublishing,
  onSync,
  onDeactivate,
  onConnect,
}) {
  if (accounts.length === 0) {
    return <EmptyAccountsState onConnect={onConnect} />;
  }

  return (
    <div className="space-y-4">
      {accounts.map((account) => (
        <ConnectedAccountCard
          key={account.id}
          account={account}
          isSelected={account.id === selectedId}
          onSelect={onSelect}
          onReconnect={onReconnect}
          onTogglePublishing={onTogglePublishing}
          onSync={onSync}
          onDeactivate={onDeactivate}
        />
      ))}
    </div>
  );
}
