import { useMemo, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import AccountsHeader from "../components/accounts/AccountsHeader";
import AccountsKpiCard from "../components/accounts/AccountsKpiCard";
import ConnectPlatformCard from "../components/accounts/ConnectPlatformCard";
import ConnectedAccountsList from "../components/accounts/ConnectedAccountsList";
import AccountDetailPanel from "../components/accounts/AccountDetailPanel";
import AccountAlerts from "../components/accounts/AccountAlerts";
import AccountRecommendations from "../components/accounts/AccountRecommendations";
import QuickAccountActions from "../components/accounts/QuickAccountActions";
import ConnectAccountModal from "../components/accounts/ConnectAccountModal";
import ReconnectAccountModal from "../components/accounts/ReconnectAccountModal";
import {
  accountsKpis,
  connectPlatforms,
  connectedAccounts as initialAccounts,
  accountAlerts,
  accountRecommendations,
  quickAccountActions,
  filterAccounts,
} from "../data/accountsMockData";

export default function AccountsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accounts, setAccounts] = useState(initialAccounts);
  const [selectedId, setSelectedId] = useState(initialAccounts[0]?.id ?? null);
  const [platformFilter, setPlatformFilter] = useState("Todas las plataformas");
  const [connectOpen, setConnectOpen] = useState(false);
  const [connectPlatform, setConnectPlatform] = useState("Instagram");
  const [reconnectAccount, setReconnectAccount] = useState(null);

  const filteredAccounts = useMemo(
    () => filterAccounts(accounts, platformFilter),
    [accounts, platformFilter],
  );

  const selectedAccount = accounts.find((a) => a.id === selectedId) ?? null;

  function openConnect(platform = "Instagram") {
    setConnectPlatform(platform);
    setConnectOpen(true);
  }

  function handleConnect(data) {
    setAccounts((prev) => [
      ...prev,
      {
        id: Date.now(),
        platform: data.platform,
        username: data.internalName.startsWith("@") ? data.internalName : `@${data.internalName.toLowerCase().replace(/\s/g, ".")}`,
        status: "Pendiente",
        followers: "0",
        posts: 0,
        reach: "0",
        sales: 0,
        lastSync: "Pendiente",
        activeForPublishing: false,
        bestContent: "—",
        permissions: ["Leer métricas"],
      },
    ]);
    setConnectOpen(false);
  }

  function handleReconnect(account) {
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === account.id
          ? { ...a, status: "Activa", lastSync: "Ahora", activeForPublishing: true, reconnectReason: undefined }
          : a,
      ),
    );
    setReconnectAccount(null);
  }

  function handleTogglePublishing(id) {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, activeForPublishing: !a.activeForPublishing } : a)),
    );
  }

  function handleSync(id) {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, lastSync: "Ahora" } : a)),
    );
  }

  function handleDeactivate(id) {
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "Desactivada", activeForPublishing: false } : a,
      ),
    );
  }

  function handleQuickAction(actionId) {
    if (actionId === "instagram") openConnect("Instagram");
    else if (actionId === "tiktok") openConnect("TikTok");
    else if (actionId === "sync-all") {
      setAccounts((prev) => prev.map((a) => ({ ...a, lastSync: "Ahora" })));
    } else if (actionId === "permissions" || actionId === "metrics") {
      openConnect();
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-brand-ink">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activePage="cuentas" />

      <div className="lg:pl-[260px]">
        <main className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <AccountsHeader
            onMenuToggle={() => setSidebarOpen(true)}
            onConnect={() => openConnect()}
            platformFilter={platformFilter}
            onPlatformFilterChange={setPlatformFilter}
          />

          <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6" aria-label="Resumen de cuentas">
            {accountsKpis.map((kpi) => (
              <AccountsKpiCard key={kpi.id} {...kpi} />
            ))}
          </section>

          <section className="mb-6">
            <h2 className="mb-4 font-display text-lg font-extrabold text-brand-navy">Conectar nueva cuenta</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {connectPlatforms.map((p) => (
                <ConnectPlatformCard key={p.id} {...p} onConnect={openConnect} />
              ))}
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-[1fr_minmax(280px,320px)]">
            <div>
              <h2 className="mb-4 font-display text-lg font-extrabold text-brand-navy">
                Tus cuentas
                <span className="ml-2 text-sm font-semibold text-brand-ink/45">({filteredAccounts.length})</span>
              </h2>
              <ConnectedAccountsList
                accounts={filteredAccounts}
                selectedId={selectedId}
                onSelect={(a) => setSelectedId(a.id)}
                onReconnect={setReconnectAccount}
                onTogglePublishing={handleTogglePublishing}
                onSync={handleSync}
                onDeactivate={handleDeactivate}
                onConnect={() => openConnect()}
              />
            </div>

            <aside className="space-y-5">
              <AccountDetailPanel
                account={selectedAccount}
                onReconnect={setReconnectAccount}
                onSync={handleSync}
                onDeactivatePublishing={handleTogglePublishing}
              />
              <AccountAlerts alerts={accountAlerts} />
              <QuickAccountActions actions={quickAccountActions} onAction={handleQuickAction} />
              <AccountRecommendations recommendations={accountRecommendations} />
            </aside>
          </div>

          <footer className="mt-10 border-t border-brand-navy/8 pt-6 text-center">
            <a href="#inicio" className="text-sm font-bold text-brand-navy hover:underline">
              ← Volver a la landing
            </a>
          </footer>
        </main>
      </div>

      <ConnectAccountModal
        open={connectOpen}
        defaultPlatform={connectPlatform}
        onClose={() => setConnectOpen(false)}
        onConnect={handleConnect}
      />

      <ReconnectAccountModal
        open={Boolean(reconnectAccount)}
        account={reconnectAccount}
        onClose={() => setReconnectAccount(null)}
        onReconnect={handleReconnect}
      />
    </div>
  );
}
