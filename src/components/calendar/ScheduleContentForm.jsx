import { useEffect, useMemo, useState } from "react";
import { getSocialAccounts } from "../../services/socialAccountsService";

const inputClass =
  "mt-1.5 h-11 w-full rounded-xl border border-brand-navy/12 bg-white px-3 text-sm font-semibold text-brand-ink outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10";

const CONTENT_TYPES = [
  {
    value: "reel",
    label: "Video / Reel",
    platforms: ["instagram", "tiktok", "facebook"],
  },
  {
    value: "post",
    label: "Posteo",
    platforms: ["instagram", "facebook"],
  },
  {
    value: "story",
    label: "Story",
    platforms: ["instagram", "facebook"],
  },
];

const PLATFORM_LABELS = {
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
};

function buildScheduledAt(year, month, day, time) {
  const [hour = "0", minute = "0"] = String(time).split(":");

  return new Date(
    year,
    month,
    Number(day),
    Number(hour),
    Number(minute),
  ).toISOString();
}

function getCompatiblePlatforms(type) {
  return CONTENT_TYPES.find((item) => item.value === type)?.platforms || [];
}

export default function ScheduleContentForm({
  open,
  year,
  month,
  selectedDay,
  onClose,
  onSave,
}) {
  const [accounts, setAccounts] = useState([]);
  const [type, setType] = useState("reel");
  const [selectedPlatforms, setSelectedPlatforms] = useState(["instagram"]);
  const [selectedAccountIds, setSelectedAccountIds] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [error, setError] = useState("");

  const compatiblePlatforms = useMemo(
    () => getCompatiblePlatforms(type),
    [type],
  );

  const availableAccounts = useMemo(() => {
    return accounts.filter((account) => {
      const platform = String(account.platform || "").toLowerCase();

      return selectedPlatforms.includes(platform);
    });
  }, [accounts, selectedPlatforms]);

  useEffect(() => {
    if (!open) return;

    async function loadAccounts() {
      try {
        setLoadingAccounts(true);
        setError("");

        const realAccounts = await getSocialAccounts();

        setAccounts(realAccounts);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las cuentas.");
      } finally {
        setLoadingAccounts(false);
      }
    }

    loadAccounts();
  }, [open]);

  useEffect(() => {
    const nextPlatforms = selectedPlatforms.filter((platform) => {
      return compatiblePlatforms.includes(platform);
    });

    if (nextPlatforms.length === 0) {
      setSelectedPlatforms([compatiblePlatforms[0]]);
    } else {
      setSelectedPlatforms(nextPlatforms);
    }

    setSelectedAccountIds([]);
  }, [type]);

  if (!open) return null;

  function handlePlatformToggle(platform) {
    setSelectedPlatforms((prev) => {
      if (prev.includes(platform)) {
        const next = prev.filter((item) => item !== platform);
        return next.length > 0 ? next : prev;
      }

      return [...prev, platform];
    });

    setSelectedAccountIds([]);
  }

  function handleAccountToggle(accountId) {
    setSelectedAccountIds((prev) => {
      if (prev.includes(accountId)) {
        return prev.filter((id) => id !== accountId);
      }

      return [...prev, accountId];
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    const title = form.title.value.trim();
    const caption = form.caption.value.trim();
    const day = Number(form.day.value);
    const time = form.time.value;
    const media_url = form.media_url.value.trim();

    if (!title) {
      setError("El título es obligatorio.");
      return;
    }

    if (!media_url) {
      setError("La URL del contenido es obligatoria.");
      return;
    }

    if (selectedAccountIds.length === 0) {
      setError("Seleccioná al menos una cuenta.");
      return;
    }

    onSave({
      title,
      caption,
      media_url,
      media_type: type === "reel" ? "video" : "image",
      publication_type: type,
      day,
      time,
      scheduled_at: buildScheduledAt(year, month, day, time),
      social_account_ids: selectedAccountIds,
      note: form.note.value.trim(),
    });

    form.reset();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-brand-ink/40 p-4 backdrop-blur-sm sm:items-center">
      <div
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-lift"
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-title"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-brand-navy/8 px-5 py-4">
          <h2
            id="schedule-title"
            className="font-display text-lg font-extrabold text-brand-navy"
          >
            Programar contenido
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-brand-ink/50 hover:bg-[#f6f7fb]"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex-1 space-y-5 overflow-y-auto p-5">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
                {error}
              </div>
            )}

            <label className="block">
              <span className="text-sm font-bold text-brand-ink/70">
                Título del contenido
              </span>
              <input
                name="title"
                required
                placeholder="Ej: Look de verano en 3 pasos"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-brand-ink/70">
                Descripción / caption
              </span>
              <textarea
                name="caption"
                rows={3}
                placeholder="Texto del post, CTA, hashtags..."
                className={`${inputClass} min-h-[96px] resize-none py-2`}
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-brand-ink/70">
                Tipo de publicación
              </span>
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className={inputClass}
              >
                {CONTENT_TYPES.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <section>
              <p className="text-sm font-bold text-brand-ink/70">Plataformas</p>

              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {compatiblePlatforms.map((platform) => {
                  const checked = selectedPlatforms.includes(platform);

                  return (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => handlePlatformToggle(platform)}
                      className={`h-11 rounded-xl border px-3 text-sm font-extrabold transition ${
                        checked
                          ? "border-brand-navy bg-brand-navy text-white"
                          : "border-brand-navy/12 bg-white text-brand-navy hover:bg-[#f6f7fb]"
                      }`}
                    >
                      {PLATFORM_LABELS[platform]}
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-brand-ink/70">Cuentas</p>

                {loadingAccounts && (
                  <span className="text-xs font-bold text-brand-ink/40">
                    Cargando...
                  </span>
                )}
              </div>

              <div className="mt-2 max-h-44 space-y-2 overflow-y-auto rounded-xl border border-brand-navy/10 bg-[#f8f9fc] p-2">
                {availableAccounts.length === 0 ? (
                  <p className="px-2 py-3 text-sm font-semibold text-brand-ink/45">
                    No hay cuentas disponibles para las plataformas
                    seleccionadas.
                  </p>
                ) : (
                  availableAccounts.map((account) => {
                    const checked = selectedAccountIds.includes(account.id);
                    const platform = String(
                      account.platform || "",
                    ).toLowerCase();

                    return (
                      <label
                        key={account.id}
                        className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-2 transition ${
                          checked
                            ? "border-brand-navy bg-white shadow-sm"
                            : "border-transparent bg-white/70 hover:bg-white"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-extrabold text-brand-navy">
                            {account.username}
                          </p>
                          <p className="text-xs font-bold text-brand-ink/45">
                            {PLATFORM_LABELS[platform] || account.platform}
                            {account.display_name
                              ? ` · ${account.display_name}`
                              : ""}
                          </p>
                        </div>

                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleAccountToggle(account.id)}
                          className="h-4 w-4"
                        />
                      </label>
                    );
                  })
                )}
              </div>
            </section>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-brand-ink/70">
                  Fecha día
                </span>
                <input
                  name="day"
                  type="number"
                  min="1"
                  max="31"
                  defaultValue={selectedDay}
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-brand-ink/70">
                  Hora
                </span>
                <input
                  name="time"
                  type="time"
                  defaultValue="09:30"
                  className={inputClass}
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-bold text-brand-ink/70">
                Nota interna opcional
              </span>
              <textarea
                name="note"
                rows={2}
                placeholder="Detalles internos, idea del CTA, hashtags..."
                className={`${inputClass} min-h-[80px] resize-none py-2`}
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-brand-ink/70">
                URL del contenido
              </span>
              <input
                name="media_url"
                required
                placeholder="https://..."
                className={inputClass}
              />
            </label>
          </div>

          <div className="flex shrink-0 gap-2 border-t border-brand-navy/8 bg-white p-5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-brand-navy/12 text-sm font-bold text-brand-navy"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-brand-navy text-sm font-bold text-white shadow-soft"
            >
              Guardar programación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
