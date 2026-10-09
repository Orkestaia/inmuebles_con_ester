import { esMarcador } from "@/lib/site";

/**
 * Pinta un texto; si es un marcador pendiente de Ester ("[NIF]") lo resalta
 * para que no se escape ninguno antes de publicar.
 */
export function Marcador({ texto }: { texto: string }) {
  if (esMarcador(texto)) {
    return (
      <span className="marcador" title="Pendiente de Ester">
        {texto}
      </span>
    );
  }
  // Marcadores dentro de una frase: "… [y que solo cobro cuando…] …"
  const partes = texto.split(/(\[[^\]]+\])/g);
  if (partes.length === 1) return <>{texto}</>;
  return (
    <>
      {partes.map((p, i) =>
        /^\[[^\]]+\]$/.test(p) ? (
          <span key={i} className="marcador" title="Pendiente de Ester">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}
