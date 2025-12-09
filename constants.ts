
import { ProfileData } from './types';

export const INITIAL_PROFILE: ProfileData = {
  id: "julio-cesar-fonseca",
  name: "Julio Cesar Fonseca",
  title: "Ingeniero Industrial | Especialista en Analítica de Datos & Business Analytics",
  // Imagen de Tablero Empresarial
  photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  summary: "Transformo datos complejos en estrategias accionables que optimizan procesos industriales, maximizan la eficiencia operativa y generan valor empresarial tangible.",
  about: `Combino la precisión de la Econometría Aplicada y el Machine Learning con una visión estratégica de negocio. Desarrollo soluciones analíticas de alto nivel que transforman la incertidumbre en ventaja competitiva, permitiendo a las organizaciones tomar decisiones basadas en evidencia rigurosa para maximizar su rentabilidad y eficiencia operativa.

🔍 Mi enfoque:
• Análisis predictivo y prescriptivo para anticipar tendencias y optimizar recursos.
• Automatización de informes y paneles interactivos que facilitan la monitorización de KPIs.
• Modelado de procesos con enfoque en mejora continua y reducción de costos operativos.
• Storytelling con datos, comunicando información clara y accionable a equipos técnicos y directivos.

🎓 Formación clave:
• Ingeniería Industrial.
• Especialización en Econometría Aplicada y Análisis de Datos.
• Maestría en Business Analytics.`,
  skills: [
    { name: "Python & R", level: "expert" },
    { name: "Power BI & Tableau", level: "expert" },
    { name: "SQL", level: "advanced" },
    { name: "Machine Learning", level: "advanced" },
    { name: "Excel Avanzado", level: "expert" },
    { name: "Stata & SPSS", level: "intermediate" }
  ],
  services: [
    {
      id: "s1",
      title: "Consultoría Estratégica",
      description: "Diagnóstico de madurez analítica, diseño de hoja de ruta (roadmap) de datos y definición de KPIs corporativos para la toma de decisiones.",
      icon: 'strategy'
    },
    {
      id: "s2",
      title: "Mapeo del Cliente Next Level",
      description: "No solo describe al cliente: lo predice, lo segmenta, lo monetiza y lo convierte en ventas recurrentes.",
      icon: 'ml',
      isFeatured: true
    },
    {
      id: "s4",
      title: "Descubre tu Idea de Negocio",
      description: "Sesiones de ideación y validación para transformar conceptos abstractos en modelos de negocio viables y escalables.",
      icon: 'startup'
    }
  ],
  certifications: [
    { name: "Power BI Data Analyst", issuer: "Microsoft", year: "2023", logo: "microsoft" },
    { name: "Professional Data Engineer", issuer: "Google Cloud", year: "2024", logo: "google" },
    { name: "Scrum Master", issuer: "Scrum Alliance", year: "2022", logo: "scrum" },
    { name: "Certified Associate in Python", issuer: "Python Institute", year: "2021", logo: "python" }
  ],
  blogPosts: [
    {
      id: "b1",
      category: "Mapeo del Cliente",
      title: "De Espectador a Profeta: Cómo Predecir (y Crear) la Demanda del Mañana.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      readTime: "4 min lectura",
      hook: "María no solo vendía zapatos online. Vendía confianza, aventura, un estilo de vida. Pero su competencia también. Un día, dejó de preguntarse '¿quién me compra?' y empezó a preguntar '¿quién podría necesitarme, y por qué aún no lo sabe?'. No miró datos demográficos. Rastreó patrones de insatisfacción en foros, sueños latentes en redes sociales, problemas no resueltos en reseñas de la competencia. Dejó de mapear clientes y empezó a mapear deseos en estado gaseoso, listos para condensarse. Su siguiente colección no respondió a una tendencia. La creó. Y sus clientes no sintieron que compraban zapatos. Sintieron que alguien, por fin, los había entendido.",
      insightTitle: "El Error del Espejo Retrovisor",
      insightContent: "La mayoría mapea al cliente de ayer. El Mapeo Next Level es crear un mapa del tesoro donde la 'X' marca no dónde está el cliente HOY, sino dónde estará MAÑANA. Es dejar de reaccionar y empezar a anticipar.",
      steps: [
        "Audita las quejas de tu competencia: Ahí yacen las necesidades no cubiertas.",
        "Identifica los 'No-Clientes': ¿Quién casi te compra y por qué se fue?",
        "Crea un perfil psicográfico, no demográfico: Mapea miedos y aspiraciones, no edades y ubicaciones."
      ],
      outcome: "Esto no es teoría. Es lo que separa a las empresas que reaccionan de las que lideran. Al final, no se trata de datos, se trata de tomar decisiones con la confianza de un profeta.",
      ctaText: "¿Listo para dejar de venderle al cliente de ayer? Obtén el framework 'Clientes Fantasma'."
    },
    {
      id: "b2",
      category: "Estrategia & Datos",
      title: "Tu Empresa Tiene Fiebre de Datos (Y el Termómetro Está Roto).",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      readTime: "5 min lectura",
      hook: "Pablo estaba orgulloso. Su dashboard relucía con docenas de gráficos en tiempo real: visitas, 'me gusta', descargas. Pero las ventas caían. Tenía datos, pero no dirección. Estaba intoxicado de información y muriendo de sed de sabiduría. La consultoría estratégica no es agregar más pantallas. Es hacer la pregunta brutal: '¿Qué único número, si sube, garantiza que sobreviviremos el próximo año?'.",
      insightTitle: "Intoxicación vs. Inteligencia",
      insightContent: "Tener dashboards bonitos no es estrategia. Es decoración. Diagnosticar si estás en la edad de piedra analítica (reaccionando al pasado) o has construido un cerebro digital (simulando el futuro) es el primer paso vital. Es cambiar el '¿qué pasó?' por el '¿y si...?'",
      steps: [
        "Elimina las 'Métricas de Vanidad' (Likes, Vistas) de tu reporte ejecutivo.",
        "Define tu 'Estrella del Norte': Un solo KPI que guíe toda la operación.",
        "Implementa simulaciones simples: ¿Qué pasa con el margen si el costo sube un 5%?"
      ],
      outcome: "Al limpiar el ruido, Pablo encontró la señal. Su empresa dejó de perseguir gráficos y empezó a perseguir rentabilidad.",
      ctaText: "¿Tu dashboard te informa o te guía? Haz el diagnóstico de Madurez Analítica (90 seg)."
    },
    {
      id: "b3",
      category: "Emprendimiento",
      title: "De la Ducha al Mercado: Validar sin Quemar Dinero.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      readTime: "6 min lectura",
      hook: "La idea de Ana era brillante: una app para cuidar plantas con sensores. En la ducha, era Steve Jobs. En su primer taller de ideación, enfrentó la pregunta asesina: '¿Qué problema tan insoportable resuelves, que la gente pagaría antes de que exista?'. Su app no era la idea. La idea era 'la paz mental de no matar tu costosa monstera'. Cambió el enfoque: de la tecnología al dolor emocional del cliente.",
      insightTitle: "Vende la Aspirina, no el Laboratorio",
      insightContent: "Validó no con un prototipo caro, sino con un grupo de WhatsApp donde enviaba tips personalizados. En un mes, tuvo su primera paga. No vendió código. Vendió paz mental. Su idea había pasado de concepto a negocio.",
      steps: [
        "Encuentra el 'Dolor Insoportable': ¿Qué le quita el sueño a tu cliente?",
        "Vende antes de construir: Intenta cobrar por la solución manual antes de automatizarla.",
        "Itera rápido: Enamórate del problema, no de tu solución."
      ],
      outcome: "Ana ahorró miles de dólares en desarrollo y ganó sus primeros clientes leales antes de escribir una línea de código.",
      ctaText: "¿Tienes una idea que te quita el sueño? Únete al taller de 'Ideación Láser'."
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Forecasting de Demanda & Optimización",
      description: "Implementación de modelos estocásticos para la predicción de demanda y optimización de niveles de inventario en almacenes de alta rotación.",
      role: "Especialista en Datos",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      link: "#",
      tags: ["Python", "Prophet", "SQL", "Supply Chain"],
      simulatorType: 'inventory',
      results: [
        "Reducción del 15% en costos de almacenamiento anuales.",
        "Aumento del 20% en la precisión del pronóstico de demanda.",
        "Disminución de quiebres de stock (Stock-outs) en un 10%."
      ]
    },
    {
      id: "p2",
      title: "Sistema de Dashboards OEE",
      description: "Desarrollo integral de un sistema de Business Intelligence para monitorear la Efectividad Global del Equipo (OEE) en tiempo real en plantas de manufactura.",
      role: "Analista BI",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      link: "#",
      tags: ["Power BI", "DAX", "SQL Server", "IoT Integration"],
      simulatorType: 'oee',
      results: [
        "Mejora de la productividad de línea en un 12%.",
        "Reducción de tiempos muertos no planificados en un 8%.",
        "Automatización del 100% de los reportes diarios de producción."
      ]
    },
    {
      id: "p3",
      title: "Segmentación & Churn Prediction",
      description: "Creación de modelos de Machine Learning para segmentación de clientes y predicción de abandono, orientando estrategias comerciales personalizadas.",
      role: "Data Scientist",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      link: "#",
      tags: ["Scikit-learn", "Python", "Clustering", "Marketing"],
      simulatorType: 'churn',
      results: [
        "Incremento del 25% en tasa de conversión de campañas.",
        "Identificación proactiva del 85% de clientes en riesgo de fuga.",
        "Optimización del presupuesto de marketing basada en LTV."
      ]
    },
    {
      id: "p4",
      title: "Next Level Sales Intelligence",
      description: "Sistema integral de mapeo, predicción y monetización de clientes. Transformamos datos transaccionales en modelos de fidelización activa y ventas recurrentes automatizadas.",
      role: "Consultor de Estrategia",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
      link: "#",
      tags: ["Predictive Sales", "Customer Journey", "AI Strategy", "Retention"],
      // Video placeholder for cartoon animation
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=adJbFkqD_7jk-XJ-",
      valueProps: [
        { service: "Conocer al cliente", impact: "Ventas dirigidas, no al azar" },
        { service: "Predecir demanda", impact: "Aumenta ventas sin inventario ocioso" },
        { service: "Alertas automáticas", impact: "Cero rupturas de stock" },
        { service: "Fidelización", impact: "Clientes retenidos y estables" },
        { service: "Segmentación", impact: "Promos inteligentes, no genéricas" },
        { service: "Rutas comerciales", impact: "Ahorro en visitas y logística" },
        { service: "Datos en tiempo real", impact: "Decisiones rentables" }
      ],
      results: [
        "Ventas dirigidas: Conocer al cliente elimina el azar comercial.",
        "Cero rupturas de stock mediante alertas predictivas automáticas.",
        "Segmentación inteligente: Promociones personalizadas, no genéricas."
      ],
      journeyMap: [
        {
          title: "1. Identidad del Cliente",
          situation: "Define la huella de consumo de cada cliente: tipo, categoría, productos esenciales y frecuencia.",
          need: "Conocer quién es y cómo compra.",
          opportunity: "Perfil de Cliente Inteligente (PCI)"
        },
        {
          title: "2. Motivadores de Compra",
          situation: "Identifica si compra por necesidad, precio, urgencia o tendencia.",
          need: "Activar promociones con precisión.",
          opportunity: "Mapa de Motivadores Comerciales (MMC)"
        },
        {
          title: "3. Ciclo de Consumo",
          situation: "Analiza volumen, frecuencia y productos ancla.",
          need: "Predice cuándo comprará, cuánto y qué.",
          opportunity: "Ciclo Predictivo del Cliente (CPC)"
        },
        {
          title: "4. Riesgos de Pérdida",
          situation: "Detecta rupturas de inventario, cambios en demanda y caídas de pedidos.",
          need: "Evitar perder clientes antes de que suceda.",
          opportunity: "Radar de Fugas Comerciales (RFC)"
        },
        {
          title: "5. Oportunidades de Crecimiento",
          situation: "Identifica complementos, migraciones de marca y upselling natural.",
          need: "Aumentar el ticket promedio.",
          opportunity: "Mapa de Escalamiento Comercial (MEC)"
        },
        {
          title: "6. Flujo de Compra Ideal",
          situation: "Define momento, oferta, canal y mensaje correcto.",
          need: "Generar ventas sin empujar.",
          opportunity: "Journey de Ventas Optimizado (JVO)"
        },
        {
          title: "7. Inteligencia Predictiva",
          situation: "Predicción de próxima compra, alertas de agotamiento y órdenes automáticas.",
          need: "Vender antes de que el cliente lo pida.",
          opportunity: "Motor Predictivo Comercial (MPC)"
        },
        {
          title: "8. Modelo de Fidelización",
          situation: "Ofertas personalizadas, programas de puntos y beneficios dinámicos.",
          need: "Ventas recurrentes aseguradas.",
          opportunity: "Estrategia de Fidelización Activa (EFA)"
        }
      ]
    }
  ],
  testimonials: [],
  contact: {
    email: "jcfs206@hotmail.com",
    phone: "316 756 2441",
    links: [
      { provider: "linkedin", url: "https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile" },
      { provider: "email", url: "mailto:jcfs206@hotmail.com" },
      { provider: "whatsapp", url: "https://wa.me/573167562441" }
    ]
  },
  cv: "#",
  updatedAt: new Date().toISOString()
};
