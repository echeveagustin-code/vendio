import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import AccountAlerts from "../components/accounts/AccountAlerts";
import AccountDetailPanel from "../components/accounts/AccountDetailPanel";
import AccountsHeader from "../components/accounts/AccountsHeader";
import AccountsKpiCard from "../components/accounts/AccountsKpiCard";
import ConnectAccountModal from "../components/accounts/ConnectAccountModal";
import ConnectPlatformCard from "../components/accounts/ConnectPlatformCard";
import ConnectedAccountsList from "../components/accounts/ConnectedAccountsList";
import ReconnectAccountModal from "../components/accounts/ReconnectAccountModal";
import { accountKpis, alerts, connectedAccounts, platforms, recommendations } from "../data/accountsMockData";

export default function AccountsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram");
  const [selectedAccount, setSelectedAccount] = useState(connectedAccounts[0]);
  const [reconnectAccount, setReconnectAccount] = useState(null);

  function openConnect(platform = "Instagram") {
    setSelectedPlatform(platform);
    setConnectOpen(true);
  }

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-brand-ink">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activePage="cuentas" />

      <div className="lg:pl-[260px]">
        <main className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <AccountsHeader onMenuToggle={() => setSidebarOpen(true)} onConnect={() => openConnect()} onSync={() => {}} />

          <section className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6" aria-label="Resumen de cuentas">
            {accountKpis.map((kpi) => (
              <AccountsKpiCard key={kpi.id} {...kpi} />
            ))}
          </section>

          <section className="mb-6">
            <div className="mb-4">
              <h2 className="font-display text-xl font-extrabold text-brand-navy">Conectar nueva cuenta</h2>
              <p className="mt-1 text-sm text-brand-ink/55">Suma nuevas redes y centraliza permisos, programacion y metricas.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {platforms.map((platform) => (
                <ConnectPlatformCard key={platform.id} platform={platform} onConnect={openConnect} />
              ))}
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-[1fr_minmax(300px,360px)]">
            <div className="min-w-0">
              <ConnectedAccountsList
                accounts={connectedAccounts}
                selectedAccount={selectedAccount}
                onSelectAccount={setSelectedAccount}
                onConnect={() => openConnect()}
                onReconnect={setReconnectAccount}
              />
            </div>

            <aside className="space-y-5">
              <AccountDetailPanel account={selectedAccount} onReconnect={setReconnectAccount} />
            </aside>
          </div>

          <footer className="mt-10 border-t border-brand-navy/8 pt-6 text-center">
            <a href="#inicio" className="text-sm font-bold text-brand-navy hover:underline">
              ← Volver a la landing
            </a>
          </footer>
        </main>
      </div>

      <ConnectAccountModal open={connectOpen} selectedPlatform={selectedPlatform} onClose={() => setConnectOpen(false)} />
      <ReconnectAccountModal account={reconnectAccount} onClose={() => setReconnectAccount(null)} />
    </div>
  );
}
