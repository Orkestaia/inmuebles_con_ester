import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

const base =
  "w-full rounded-xl border border-linea bg-blanco px-4 py-3 text-base text-tinta placeholder:text-tinta-suave focus:border-ciruela focus:outline-none focus:ring-2 focus:ring-ciruela/20";

export function Campo({ id, label, ayuda, error, children }: { id: string; label: string; ayuda?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-tinta">
        {label}
      </label>
      {children}
      {ayuda && !error && (
        <p id={`${id}-ayuda`} className="mt-1.5 text-sm text-tinta-suave">
          {ayuda}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-[#9b1c1c]">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ error, ...props }: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return <input {...props} className={`${base} ${error ? "border-[#9b1c1c]" : ""}`} aria-invalid={error || undefined} />;
}

export function Select({ opciones, placeholder = "Elige una opción", ...props }: SelectHTMLAttributes<HTMLSelectElement> & { opciones: { value: string; label: string }[]; placeholder?: string }) {
  return (
    <select {...props} className={`${base} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235a5560%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}>
      <option value="">{placeholder}</option>
      {opciones.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Casilla({ id, label, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { id: string; label: ReactNode; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-tinta-suave">
        <input id={id} type="checkbox" {...props} className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-linea accent-ciruela" aria-invalid={error ? true : undefined} />
        <span>{label}</span>
      </label>
      {error && (
        <p role="alert" className="mt-1.5 text-sm font-medium text-[#9b1c1c]">
          {error}
        </p>
      )}
    </div>
  );
}

/** Campo trampa para bots: oculto a personas, los bots lo rellenan. */
export function Honeypot() {
  return (
    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
      <label htmlFor="web">Deja este campo vacío</label>
      <input id="web" name="web" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function BotonEnviar({ children, cargando }: { children: ReactNode; cargando: boolean }) {
  return (
    <button
      type="submit"
      disabled={cargando}
      className="w-full rounded-full bg-ciruela px-6 py-4 text-base font-semibold text-blanco transition-colors hover:bg-ciruela-oscuro disabled:cursor-wait disabled:opacity-70"
    >
      {children}
    </button>
  );
}

export function ErrorEnvio({ mensaje, fallback }: { mensaje: string; fallback: ReactNode }) {
  return (
    <div role="alert" className="rounded-xl border border-[#e6b8b8] bg-[#fdf2f2] p-4 text-sm text-[#7a1f1f]">
      <p>{mensaje}</p>
      <p className="mt-2">{fallback}</p>
    </div>
  );
}
