import type { Metadata } from "next";
import { Seccion } from "../_ui/Pagina";
import Portada from "../_ui/Portada";
import Migas from "../_ui/Migas";
import { metadataDe } from "../_contenido/rutas";
import { obtenerConvocatorias } from "../_contenido/bolsa";
import ListaConvocatorias from "./ListaConvocatorias";

export const metadata: Metadata = metadataDe("/bolsa-laboral");

/**
 * Bolsa Laboral — una vitrina, y nada más.
 *
 * Muestra convocatorias afines a los principios de la Asociación y enlaza a
 * quien convoca. No recibe currículos ni datos de nadie, y el alcance está
 * confirmado con el cliente: solo escaparate y enlaces (2026-09-29).
 *
 * Por eso la página no explica nada sobre datos personales: no hay nada que
 * explicar. Si algún día se añade un formulario, deja de ser cierto —y
 * entonces aplica la Ley 29733, que para datos sensibles, y la afinidad
 * política lo es, exige consentimiento por escrito, plazo de conservación y un
 * banco de datos inscrito. Leer 06-PLAN-BACKEND-Y-VPS.md §5 antes de añadir
 * cualquier campo donde alguien pueda escribir sobre sí mismo.
 */
export default async function BolsaLaboral() {
  const convocatorias = await obtenerConvocatorias();

  return (
    <div className="flex-1 bg-verde-claro pb-16">
      <Migas path="/bolsa-laboral" />
      <Portada
        src="/portadas/institucional.jpg"
        antetitulo="Bolsa Laboral"
        titulo="Oportunidades que comparten nuestros principios"
        entradilla="Reunimos convocatorias laborales y de voluntariado afines al Humanismo Teísta, la Democracia Participativa y la Concertación."
      />

      <Seccion>
        <ListaConvocatorias iniciales={convocatorias} />
      </Seccion>
    </div>
  );
}
