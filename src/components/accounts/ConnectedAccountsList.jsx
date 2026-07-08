import ConnectedAccountCard from "./ConnectedAccountCard";
import EmptyAccountsState from "./EmptyAccountsState";

export default function ConnectedAccountsList({ accounts, selectedAccount, onSelectAccount, onConnect, onReconnect }) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-extrabold text-brand-navy">Tus cuentas</h2>
          <p className="mt-1 text-sm text-brand-ink/55">Estado, permisos y datos principales por red conectada.</p>
        </div>
      </div>

      {accounts.length === 0 ? (
        <EmptyAccountsState onConnect={onConnect} />
      ) : (
        <div className="space-y-3">
          {accounts.map((account) => (
            <ConnectedAccountCard
              key={account.id}
              account={account}
              selected={selectedAccount?.id === account.id}
              onSelect={onSelectAccount}
              onReconnect={onReconnect}
            />
          ))}
        </div>
      )}
    </section>
  );
}
