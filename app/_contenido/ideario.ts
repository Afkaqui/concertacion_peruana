/**
 * Los seis pilares doctrinarios — fuente: "IDEARIO RESUME MARCA DE AGUA.doc",
 * numeral III. Se usa la versión resumida por ser la reescritura corregida del
 * documento ampliado (doc. 01 §1.1).
 *
 * Cada pilar se mantiene bajo 700 palabras (RNF-16) y conserva una cita
 * literal del Ideario como frase-ancla. El documento completo queda para
 * descarga en PDF cuando el cliente lo entregue.
 */

export type PilarIdeario = {
  slug: string;
  nombre: string;
  /** Cita literal del Ideario */
  ancla: string;
  /** Resumen de una línea, para índices y metadatos */
  sumario: string;
  descripcion: string;
  parrafos: string[];
  /** "Qué significa en la práctica" */
  practica: string[];
};

export const IDEARIO: PilarIdeario[] = [
  {
    slug: "humanismo-teista",
    nombre: "Humanismo Teísta",
    ancla: "Todos somos iguales en dignidad, en derechos y en oportunidades.",
    sumario: "La persona humana como centro y fin de la organización social.",
    descripcion:
      "La persona humana como centro y fin de la organización social. Qué es el Humanismo Teísta y por qué es nuestra brújula ética y política.",
    parrafos: [
      "El Humanismo Teísta es nuestra brújula ética y política para construir una sociedad libre, justa, solidaria y democrática. Reconoce a la persona humana como centro y fin de toda organización social.",
      "Afirmamos que cada ser humano posee una dignidad inviolable y una dimensión trascendente porque ha sido creado por Dios. Creemos que el ser humano es un ser racional, libre y responsable, con capacidad para buscar la verdad, practicar el bien y construir comunidad.",
      "Desde esta perspectiva, valores como la libertad, la justicia, la solidaridad, la responsabilidad, la fraternidad, el respeto y la lealtad encuentran su fundamento más sólido en los valores éticos inspirados en la creencia en Dios.",
      "De ahí se sigue una consecuencia política concreta: los derechos humanos no son otorgados por el Estado. El Estado solo los reconoce, protege y promueve. La política, por tanto, está al servicio integral de la persona.",
    ],
    practica: [
      "Un Estado que proteja los derechos fundamentales y favorezca el desarrollo integral de cada persona.",
      "Respeto a la libertad de conciencia y a la pluralidad de la sociedad peruana.",
      "Rechazo de todo prejuicio de raza, color, creencia, sexo, edad o condición social.",
      "Una economía al servicio de la persona, con desarrollo sustentable y distribución más equitativa.",
      "Uso responsable de los recursos naturales, entendiendo que son finitos y que debemos legarlos a las futuras generaciones.",
    ],
  },
  {
    slug: "democracia-participativa",
    nombre: "Democracia Participativa",
    ancla: "Una democracia auténtica da voz a quienes rara vez son escuchados.",
    sumario: "Una democracia donde el ciudadano decide, no solo elige.",
    descripcion:
      "Una democracia donde el ciudadano decide, no solo elige. Cómo entendemos la participación directa en las decisiones públicas del Perú.",
    parrafos: [
      "Creemos en una democracia donde el ser humano es el protagonista. La Democracia Participativa facilita que los peruanos nos asociemos y organicemos para influir directamente en las decisiones públicas.",
      "Va más allá de la democracia representativa: aprovecha la experiencia y capacidad de todos, legitima las decisiones y mejora la calidad de vida.",
      "Promovemos una economía socialmente justa y humanista, con cooperación, transparencia y consenso nacional en los principios básicos y los derechos humanos. Respetamos el pluripartidismo y la diversidad, y buscamos el debate para llegar a acuerdos, con pleno respeto a las minorías.",
    ],
    practica: [
      "Mecanismos prácticos de participación en el barrio, el distrito, la provincia y la nación.",
      "Información transparente e investigación al servicio del ciudadano.",
      "Educación cívica desde la escuela en técnicas de participación.",
      "Alternancia y distribución del poder dentro de la organización, para evitar la concentración.",
      "Liderazgos democráticos, alejados del personalismo y los caudillismos.",
    ],
  },
  {
    slug: "fraternidad",
    nombre: "Fraternidad",
    ancla: "Es amar al prójimo como a nosotros mismos.",
    sumario: "El lazo que nos une más allá de creencias y condición social.",
    descripcion:
      "El lazo que nos une más allá de creencias, ideologías y condición social. La fraternidad como compromiso político concreto.",
    parrafos: [
      "El Humanismo Teísta nos llama a reconocernos como hermanos. La Fraternidad es el lazo que nos une más allá de creencias, ideologías, gustos o condición social.",
      "Es tender la mano, proteger, entender y ser tolerante. En Concertación practicamos una fraternidad sin egoísmo, vanidad ni envidia.",
      "Es un compromiso para lograr una sociedad más justa e igualitaria, donde el mercado y el poder estén al servicio de la prosperidad de cada peruano.",
    ],
    practica: [
      "Poner al ser humano al centro, antes que al Estado o al mercado.",
      "Construir comunidad con afecto, respeto y trabajo conjunto.",
      "Dejar de lado el egoísmo, la vanidad y el orgullo en la vida orgánica.",
    ],
  },
  {
    slug: "igualdad-de-oportunidades",
    nombre: "Igualdad de Oportunidades",
    ancla:
      "Las desigualdades son construcciones sociales e históricas, y por tanto se pueden transformar.",
    sumario: "Dar a cada quien lo que le corresponde, reconociendo la diversidad.",
    descripcion:
      "Las desigualdades son construcciones históricas y se pueden transformar. Nuestra propuesta para una sociedad equitativa, humana y justa.",
    parrafos: [
      "Para nosotros, toda persona tiene la misma dignidad inviolable. Por eso defendemos la Igualdad de Oportunidades.",
      "Es dar a cada quien lo que le corresponde, reconociendo la diversidad de sexo, género, clase, religión, etnia y edad, sin que eso sea motivo de discriminación.",
      "Impulsamos relaciones equitativas entre hombres y mujeres desde sus diferencias. Exigimos igualdad de derechos, reconocimiento de la dignidad y valoración justa de todos los aportes a la sociedad.",
    ],
    practica: [
      "Construir una cultura de respeto, tolerancia y no discriminación.",
      "Políticas públicas que compensen las desventajas para que nadie se quede atrás.",
      "La persona como sujeto integral y protagonista de su propio desarrollo.",
    ],
  },
  {
    slug: "identidad-nacional",
    nombre: "Identidad Nacional y Unidad en la Diversidad",
    ancla: "Un solo Perú, diverso y fraterno.",
    sumario: "Un país de todas las sangres: la diversidad como mayor riqueza.",
    descripcion:
      "Un país de todas las sangres. Por qué la diversidad del Perú es nuestra mayor riqueza y cómo construimos peruanidad desde ella.",
    parrafos: [
      "El Perú es una nación en construcción permanente. Nuestra Identidad Nacional se sustenta en normas, valores y símbolos comunes que concertamos entre todos.",
      "Somos un país de todas las sangres y todas las culturas. Esa diversidad es nuestra mayor riqueza. Por eso luchamos por la Unidad en la Diversidad: asentar y fortalecer la peruanidad como suma de identidades.",
      "Redescubrimos nuestra historia personal y colectiva con orgullo, sin copiar ni rechazar lo externo. Creemos en una peruanidad que valora sus tradiciones, respeta sus diferencias y construye futuro a partir de lo que somos.",
    ],
    practica: [
      "Fortalecer el patrimonio y la pluralidad cultural, tangible e intangible.",
      "Defender las expresiones culturales y el patrimonio natural y arqueológico.",
      "Construir peruanidad sin satanizar ni endiosar lo extranjero.",
    ],
  },
  {
    slug: "concertacion",
    nombre: "Concertación",
    ancla:
      "No es el camino más corto, pero sí el más seguro para legitimar decisiones.",
    sumario: "Concertar es ponerse de acuerdo: medio y fin a la vez.",
    descripcion:
      "Concertar es ponerse de acuerdo. El camino más largo, pero el más seguro para legitimar decisiones y construir gobernabilidad en el Perú.",
    parrafos: [
      "Concertar es ponernos de acuerdo. Es dialogar, negociar y formar alianzas para decidir juntos el rumbo del país.",
      "Para el Humanismo Teísta, la Concertación es medio y fin: medio para alcanzar el bienestar de la persona, y fin porque fortalece la democracia.",
      "No busca la unanimidad, sino la confluencia de diferencias en torno al bien común. Previene y resuelve conflictos con canales abiertos, renueva los pactos sociales y construye confianza y capital social entre ciudadanos e instituciones.",
    ],
    practica: [
      "Mesas de diálogo entre sector público, sector privado, academia y sociedad civil.",
      "Canales abiertos y efectivos para prevenir y resolver conflictos.",
      "Decisiones colectivas que representen a todos los peruanos.",
    ],
  },
];

export const porSlug = (slug: string) => IDEARIO.find((p) => p.slug === slug);
