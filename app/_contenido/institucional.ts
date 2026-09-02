/**
 * Contenido institucional — fuente: "PROPUESTA INSTITUCIONAL: VISIÓN, MISIÓN Y
 * OBJETIVOS ESTRATÉGICOS. ASOCIACIÓN DE LA CONCERTACIÓN PERUANA"
 * (Base Político-Programática del Partido de la Concertación Peruana).
 *
 * Los textos de visión y misión se reproducen literalmente. Los objetivos se
 * mantienen íntegros; solo se separó el título del desarrollo para poder
 * maquetarlos.
 */

export const VISION =
  "Ser la organización y fuerza política referente en el Perú, consolidada como un espacio democrático, pluralista y fraterno que impulse un cambio generacional de pensamiento y acción para construir un país líder en Latinoamérica. Nos proyectamos como una nación justa, próspera y sostenible, fundada en el Humanismo Teísta, la concertación permanente y la dignidad de la persona humana como fin supremo de la sociedad y el Estado, articulando el conocimiento, el arte, la ciencia, la filosofía y la tecnología para alcanzar el desarrollo integral de todos los peruanos.";

export const MISION =
  "Promover el desarrollo social, cultural, cívico y la participación ciudadana responsable en el Perú mediante el diálogo, el consenso y el fortalecimiento de las instituciones democráticas. Nos dedicamos a formar líderes con vocación de servicio, probidad, transparencia y lealtad institucional, e impulsar una economía sostenible con rostro humano, descentralizada y comprometida con el bien común. A través de nuestros principios de Dios, Patria y Familia, la unidad en la diversidad y la defensa irrestricta del Estado de Derecho, trabajamos para empoderar a la ciudadanía y consolidar las bases programáticas del Partido de la Concertación Peruana al servicio del país.";

export type Objetivo = { titulo: string; texto: string };
export type Pilar = { n: number; nombre: string; objetivos: Objetivo[] };

export const PILARES: Pilar[] = [
  {
    n: 1,
    nombre: "Institucionalidad y Construcción de la Organización Política",
    objetivos: [
      {
        titulo: "Consolidación Orgánica y Electoral",
        texto:
          "Conformar y registrar formalmente las bases partidarias a nivel nacional, regional y local, asegurando la democracia interna, la representatividad y la lealtad institucional en estricto cumplimiento del marco legal y electoral peruano.",
      },
      {
        titulo: "Escuela de Formación Cívico-Política",
        texto:
          "Crear e implementar programas continuos de capacitación dirigidos a la ciudadanía y a los cuadros directivos, fundamentados en el Humanismo Teísta, la probidad, la ética pública y la vocación de servicio.",
      },
    ],
  },
  {
    n: 2,
    nombre: "Participación Ciudadana, Concertación y Consenso",
    objetivos: [
      {
        titulo: "Espacios de Concertación Descentralizada",
        texto:
          "Fomentar e institucionalizar mesas de diálogo entre el sector público, el sector privado, la academia y la sociedad civil para la solución pacífica de conflictos y la construcción de consensos nacionales.",
      },
      {
        titulo: "Inclusión y Empoderamiento Social",
        texto:
          "Promover el liderazgo activo de jóvenes, mujeres, adultos mayores y poblaciones vulnerables, fortaleciendo la igualdad de oportunidades y revalorando la unidad en la diversidad de la identidad nacional.",
      },
    ],
  },
  {
    n: 3,
    nombre: "Propuestas de Desarrollo y Economía Sostenible",
    objetivos: [
      {
        titulo: "Impulso de los Ejes Productivos",
        texto:
          "Diseñar propuestas normativas y de políticas públicas enfocadas en el desarrollo técnico y sostenible de la agricultura, la minería responsable, la pesquería, la industria, el turismo y la innovación tecnológica.",
      },
      {
        titulo: "Fortalecimiento de los Instrumentos Básicos de Desarrollo",
        texto:
          "Impulsar reformas estructuradas para mejorar la calidad de la educación, la nutrición, la salud pública, la seguridad ciudadana, las vías de comunicación y la vivienda social.",
      },
    ],
  },
  {
    n: 4,
    nombre: "Transparencia, Innovación y Gobernabilidad",
    objetivos: [
      {
        titulo:
          "Integridad Institucional, Ética Pública y Lucha contra la Corrupción",
        texto:
          "Garantizar la probidad interna y la transparencia mediante auditorías continuas, rindiendo cuentas de manera clara a la militancia y a la ciudadanía. Promover la implementación de mecanismos de fiscalización, rendición de cuentas y máxima transparencia en la gestión de recursos institucionales y públicos.",
      },
      {
        titulo: "Articulación de Ciencia, Tecnología y Protección Ambiental",
        texto:
          "Integrar la ciencia, el arte y la tecnología con la protección del medio ambiente para impulsar una economía sostenible con rostro humano. Promover la investigación, el desarrollo científico y la ecoeficiencia al servicio de una economía sostenible que proteja los recursos naturales para las futuras generaciones.",
      },
    ],
  },
];

export type FilaMatriz = {
  pilar: string;
  valores: string;
  resultado: string;
};

export const MATRIZ: FilaMatriz[] = [
  {
    pilar: "Institucionalidad",
    valores: "Lealtad Institucional, Probidad, Democracia Participativa",
    resultado:
      "Inscripción y consolidación formal del Partido de la Concertación Peruana.",
  },
  {
    pilar: "Participación y Diálogo",
    valores: "Concertación, Fraternidad, Unidad en la Diversidad",
    resultado:
      "Creación de alianzas sociales estratégicas y prevención de conflictos cívicos.",
  },
  {
    pilar: "Desarrollo Sostenible",
    valores: "Humanismo Teísta, Economía Sostenible, Bien Común",
    resultado:
      "Planes de gobierno elaborados según la realidad productiva y territorial del país.",
  },
  {
    pilar: "Gobernabilidad y Ética",
    valores: "Transparencia, Vocación de Servicio, Cultura de Paz",
    resultado:
      "Liderazgos éticos preparados para la función pública e institucional.",
  },
];
