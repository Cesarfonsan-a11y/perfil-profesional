import React, { useState, useEffect, useRef } from 'react';
import { HashRouter } from 'react-router-dom';
import { GoogleGenAI, Chat } from '@google/genai';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Menu, 
  X, 
  ChevronRight, 
  User, 
  Briefcase, 
  Award, 
  Loader2, 
  ArrowRight, 
  Send, 
  PieChart, 
  TrendingUp, 
  AlertTriangle, 
  PlayCircle, 
  Target, 
  Lightbulb, 
  CheckCircle2, 
  BrainCircuit, 
  Activity,
  Users,
  Mail,
  MapPin,
  BookOpen,
  Compass,
  MessageSquare,
  DollarSign,
  BarChart3,
  Zap,
  GraduationCap,
  Code2,
  Database,
  Terminal,
  Layers
} from 'lucide-react';
import { getProfile } from './services/mockApi';
import { ProfileData, ChatMessage, Project, JourneyStage, BlogPost, Service } from './types';

// Declaration to satisfy TypeScript compiler on Vercel
declare const process: {
  env: {
    API_KEY: string;
  }
};

// --- ICONS & UI COMPONENTS ---

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const QuoteButton = ({ label = "Cotizar Implementación" }: { label?: string }) => (
  <button 
    onClick={() => window.open(`https://wa.me/573167562441?text=${encodeURIComponent('Hola Julio, probé el simulador en tu web y me interesa cotizar una implementación similar para mi empresa.')}`, '_blank')}
    className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-slate-900/20 group"
  >
    <MessageSquare size={18} className="text-amber-500" />
    {label}
    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
  </button>
);

// --- MODALS ---

const ServiceModal = ({ service, onClose }: { service: Service; onClose: () => void }) => {
  // Mapa de detalles (Hardcoded para robustez visual sin modificar base de datos mock)
  const detailsMap: Record<string, string[]> = {
    's1': [
      'Diagnóstico de Madurez Analítica',
      'Roadmap de Transformación Digital',
      'Definición de KPIs Estratégicos',
      'Gobernanza de Datos Básica',
      'Diseño de Dashboard Ejecutivo'
    ],
    's2': [
      'Segmentación Avanzada (Clustering)',
      'Análisis de Valor de Vida (LTV)',
      'Predicción de Abandono (Churn)',
      'Personalización de Oferta',
      'Estrategia de Retención Activa'
    ],
    's4': [
      'Validación de Hipótesis de Mercado',
      'Modelado Financiero Inicial',
      'Definición de MVP (Producto Mínimo Viable)',
      'Estrategia de Go-To-Market',
      'Pitch Deck de Inversión'
    ]
  };

  const benefits = detailsMap[service.id] || ['Consultoría Personalizada', 'Soporte Continuo', 'Estrategia Basada en Datos', 'Reportes de Seguimiento'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md animate-fade-in" onClick={onClose}>
       <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10 text-slate-500 hover:text-slate-900">
            <X size={24} />
          </button>
          
          <div className="p-8 md:p-10">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${service.isFeatured ? 'bg-amber-500 text-white' : 'bg-slate-900 text-amber-500'}`}>
                {service.icon === 'strategy' && <Target size={32} />}
                {service.icon === 'ml' && <BrainCircuit size={32} />}
                {service.icon === 'startup' && <Lightbulb size={32} />}
            </div>
            
            <span className="text-amber-600 font-bold text-xs tracking-widest uppercase mb-2 block">Detalle del Servicio</span>
            <h3 className="text-3xl font-black text-slate-900 mb-4">{service.title}</h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">{service.description}</p>
            
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-amber-500"/>
                    Entregables Incluidos:
                </h4>
                <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                    {benefits.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></div>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            
            <button 
                onClick={() => window.open(`https://wa.me/573167562441?text=${encodeURIComponent(`Hola Julio, me interesa el servicio de ${service.title} y quisiera cotizarlo.`)}`, '_blank')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-slate-900/20 group"
            >
                Solicitar Cotización <MessageSquare size={20} className="text-amber-500 group-hover:scale-110 transition-transform" />
            </button>
          </div>
       </div>
    </div>
  );
};

// --- SIMULATORS ---

const InventorySimulator = () => {
  const [demand, setDemand] = useState(1000);
  const [leadTime, setLeadTime] = useState(5);
  const [unitCost, setUnitCost] = useState(50);
  
  // Fórmulas simplificadas para simulación
  const safetyStock = Math.round(demand * 0.15 * Math.sqrt(leadTime)); 
  const currentStockAvg = Math.round(demand * 1.5); // Supuesto de ineficiencia actual
  const optimizedStockAvg = Math.round((demand / 2) + safetyStock);
  const capitalLiberated = Math.round((currentStockAvg - optimizedStockAvg) * unitCost);

  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-6 shadow-inner">
      <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-3">
        <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><TrendingUp className="w-5 h-5" /></div>
        <div>
          <h4 className="font-bold text-slate-900 text-base">Simulador de ROI</h4>
          <p className="text-xs text-slate-500">Calcula capital liberado.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-slate-700">Demanda (Unds)</label>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{demand}</span>
            </div>
            <input type="range" min="100" max="5000" step="50" value={demand} onChange={e => setDemand(Number(e.target.value))} className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          
          <div className="space-y-2">
             <label className="block text-xs font-bold text-slate-700 mb-1">Costo Unitario ($)</label>
             <input type="number" value={unitCost} onChange={e => setUnitCost(Number(e.target.value))} className="w-full p-2 border border-slate-200 bg-white rounded-lg outline-none text-sm font-bold" />
          </div>
        </div>
        
        <div>
          <div className="bg-slate-900 p-4 rounded-xl text-white shadow-lg relative overflow-hidden text-center">
             <span className="text-slate-400 text-xs font-medium block mb-1">Capital Liberado</span>
             <div className="text-2xl font-black tracking-tight text-white mb-2">
                ${capitalLiberated.toLocaleString()}
              </div>
              <div className="flex justify-center">
                  <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded">+ Cash Flow</span>
              </div>
          </div>
          <button 
            onClick={() => window.open(`https://wa.me/573167562441?text=${encodeURIComponent('Hola Julio, probé el simulador de Stock y me interesa.')}`, '_blank')}
            className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-bold text-sm transition-all"
          >
            Cotizar
          </button>
        </div>
      </div>
    </div>
  );
};

const OEESimulator = () => {
  const [availability, setAvailability] = useState(85);
  const [performance, setPerformance] = useState(90);
  const [quality, setQuality] = useState(95);

  const oee = (availability * performance * quality) / 10000;
  
  const getOeeColor = (val: number) => {
    if (val >= 85) return "text-emerald-500";
    if (val >= 65) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-6 shadow-inner">
      <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-3">
        <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><PieChart className="w-5 h-5" /></div>
        <div>
          <h4 className="font-bold text-slate-900 text-base">Calculadora OEE</h4>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          {[
            { label: "Disp.", val: availability, set: setAvailability },
            { label: "Rend.", val: performance, set: setPerformance },
            { label: "Cal.", val: quality, set: setQuality },
          ].map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">{item.label}</span>
                <span className="font-bold text-slate-900">{item.val}%</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={item.val} 
                onChange={e => item.set(Number(e.target.value))} 
                className={`w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900`} 
              />
            </div>
          ))}
        </div>
        
        <div className="flex flex-col justify-center items-center bg-white p-4 rounded-xl border border-slate-200">
             <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">OEE Global</span>
             <span className={`text-4xl font-black ${getOeeColor(oee)}`}>
               {oee.toFixed(1)}%
             </span>
             <button 
                onClick={() => window.open(`https://wa.me/573167562441?text=${encodeURIComponent('Hola Julio, probé la calculadora OEE y me interesa.')}`, '_blank')}
                className="w-full mt-3 bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg font-bold text-sm transition-all"
             >
                Cotizar Sistema
             </button>
        </div>
      </div>
    </div>
  );
};

const ChurnSimulator = () => {
    const [customers, setCustomers] = useState(1000);
    const [churnRate, setChurnRate] = useState(5);
    const [arpu, setArpu] = useState(50);
    
    const lostCustomers = Math.round(customers * (churnRate / 100));
    const lostRevenueAnnual = lostCustomers * arpu * 12;
    
    return (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-6 shadow-inner">
          <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><Users className="w-5 h-5" /></div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Impacto Churn</h4>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Clientes Activos</label>
                    <input type="number" value={customers} onChange={e => setCustomers(Number(e.target.value))} className="w-full p-2 border border-slate-200 bg-white rounded-lg text-sm font-bold" />
                </div>
                
                <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-slate-700">Tasa Churn (%)</label>
                      <span className="text-xs font-bold text-red-500">{churnRate}%</span>
                    </div>
                    <input type="range" min="0" max="20" step="0.5" value={churnRate} onChange={e => setChurnRate(Number(e.target.value))} className="w-full accent-red-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                </div>
            </div>

            <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
                 <span className="block text-xs text-red-600 font-semibold mb-1">Pérdida Anual Proyectada</span>
                 <span className="text-2xl font-black text-red-600">-${lostRevenueAnnual.toLocaleString()}</span>
                 <button 
                    onClick={() => window.open(`https://wa.me/573167562441?text=${encodeURIComponent('Hola Julio, vi el simulador de Churn y quiero reducir mi tasa de fuga.')}`, '_blank')}
                    className="w-full mt-3 bg-white border border-red-200 text-red-600 hover:bg-red-50 py-2 rounded-lg font-bold text-sm transition-all"
                 >
                    Detener Fuga
                 </button>
            </div>
          </div>
        </div>
    );
};

const JourneyMap = ({ stages }: { stages: JourneyStage[] }) => {
    return (
      <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 my-6">
        {stages.map((stage, idx) => (
          <div key={idx} className="relative pl-6 group">
            <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full group-hover:bg-amber-500 transition-colors"></div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <span className="text-[10px] font-bold text-amber-500 tracking-widest uppercase mb-1 block">Etapa {idx + 1}</span>
              <h4 className="text-sm font-bold text-slate-900 mb-2">{stage.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{stage.situation}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

// --- BLOG COMPONENTS ---

const BlogModal = ({ post, onClose }: { post: BlogPost; onClose: () => void }) => {
  if (!post) return null;

  const handleCTA = () => {
    const message = `Hola Julio, leí tu artículo *"${post.title}"* y me interesa el recurso: *${post.ctaText}*. ¿Podemos hablar?`;
    window.open(`https://wa.me/573167562441?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-4xl my-auto rounded-2xl overflow-hidden flex flex-col shadow-2xl relative max-h-[95vh] border border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/10 hover:bg-black/20 p-2 rounded-full text-slate-900 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="h-64 w-full relative shrink-0">
           <img 
             src={post.image} 
             alt={post.title} 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
           <div className="absolute bottom-6 left-6 right-6">
             <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-wider shadow-sm">
               {post.category}
             </span>
             <h3 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-lg">{post.title}</h3>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-12">
           <div className="prose prose-slate max-w-none">
              {/* Hook */}
              <div className="text-lg md:text-xl font-medium text-slate-700 leading-relaxed mb-8 italic border-l-4 border-amber-500 pl-6 bg-slate-50 py-4 rounded-r-lg">
                "{post.hook}"
              </div>

              {/* Insight */}
              <div className="mb-10">
                <h4 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                   <Lightbulb className="text-amber-500" /> {post.insightTitle}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                   {post.insightContent}
                </p>
              </div>

              {/* Steps */}
              <div className="mb-10 bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
                 <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Compass className="text-amber-500" /> Pasos Accionables
                 </h4>
                 <ul className="space-y-4">
                    {post.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-4 items-start">
                         <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">{idx + 1}</div>
                         <span className="text-slate-300">{step}</span>
                      </li>
                    ))}
                 </ul>
              </div>

              {/* Outcome */}
              <div className="mb-12">
                 <h4 className="text-lg font-bold text-slate-900 mb-2">La Transformación</h4>
                 <p className="text-slate-600 leading-relaxed">{post.outcome}</p>
              </div>

              {/* CTA */}
              <div className="flex justify-center">
                 <button 
                   onClick={handleCTA}
                   className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 shadow-xl shadow-amber-500/30 animate-heartbeat group w-full md:w-auto justify-center"
                 >
                   {post.ctaText}
                   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- CHATBOT ---

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{role: 'model', text: 'Soy Strategos, tu Director de Estrategia IA. Puedo resolver dudas de Finanzas, Marketing, Operaciones y Ventas. ¿Cuál es tu mayor desafío hoy?'}]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    // Explicit API Key check removed to rely on try-catch error handling
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
        if (!chatSessionRef.current) {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatSessionRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: `
                      ACTÚA COMO: Un Consultor de Negocios Senior y Experto en Estrategia Corporativa (tipo McKinsey o BCG).
                      
                      TU MISIÓN:
                      1. RESPONDER CUALQUIER DUDA de negocios (Marketing, Finanzas, Procesos, RRHH, Ventas) que tenga el usuario.
                      2. APORTAR VALOR INMEDIATO con una solución breve pero potente.
                      3. CERRAR SIEMPRE dirigiendo al usuario a contactar a Julio Cesar Fonseca por WhatsApp para implementar la solución.
                      
                      ESTILO DE RESPUESTA:
                      - Profesional, empático y orientado a resultados.
                      - Usa emojis estratégicos.
                      - Al final, usa SIEMPRE esta frase: "Para implementar esto en tu empresa, contáctame directamente al WhatsApp haciendo clic en el botón verde."
                    `,
                },
            });
        }
        
        const result = await chatSessionRef.current.sendMessage({ message: userMsg });
        setMessages(prev => [...prev, { role: 'model', text: result.text }]);
    } catch (error) {
        setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, hubo un error de conexión con la IA. Por favor escríbeme directamente al WhatsApp para ayudarte.' }]);
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-xl shadow-amber-500/30 flex items-center justify-center animate-heartbeat transition-transform border-4 border-white"
        aria-label="Abrir asistente de estrategia"
      >
        {isOpen ? <X size={24} /> : <Briefcase size={28} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[500px] animate-fade-in ring-1 ring-slate-900/5">
          <div className="bg-amber-500 p-4 text-white flex justify-between items-center shadow-md z-10">
             <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                   <Briefcase className="w-5 h-5" />
                </div>
                <div>
                   <span className="font-bold block text-sm">Strategos AI</span>
                   <span className="text-[10px] text-white/80 block uppercase tracking-wider">Business Mastermind</span>
                </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors">
                <X size={16} />
             </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
             {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-slate-900 text-white rounded-br-none shadow-md' 
                        : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none shadow-sm'
                   }`}>
                      {msg.text}
                   </div>
                </div>
             ))}
             {loading && (
                <div className="flex justify-start">
                   <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm rounded-bl-none flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                      <span className="text-xs text-slate-400 font-medium">Pensando estrategia...</span>
                   </div>
                </div>
             )}
             <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
             <input 
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               placeholder="Pregunta algo sobre tu negocio..."
               className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all placeholder:text-slate-400"
             />
             <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-amber-500 hover:bg-amber-600 text-white p-2.5 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
             >
                <Send size={16} />
             </button>
          </div>
        </div>
      )}
    </>
  );
};

export const App = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
          <p className="text-slate-500 font-medium animate-pulse">Cargando perfil estratégico...</p>
        </div>
      </div>
    );
  }

  const toggleProject = (id: string) => {
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-amber-200">
        
        {/* Floating WhatsApp Button (Left Side) */}
        <a 
          href={profile.contact.links.find(l => l.provider === 'whatsapp')?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center animate-heartbeat-green transition-transform border-4 border-white"
          aria-label="Contactar por WhatsApp"
        >
          <WhatsappIcon className="w-7 h-7" />
        </a>

        {/* Navbar */}
        <nav className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-lg shadow-slate-900/20">
                  <TrendingUp size={22} />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-black text-slate-900 leading-none tracking-tight">
                    BUSINESS <span className="text-amber-500">INTELLIGENCE</span>
                  </h1>
                </div>
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {['Perfil', 'Servicios', 'Experiencia', 'Blog', 'Contacto'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-sm font-bold text-slate-600 hover:text-amber-500 transition-colors uppercase tracking-wide"
                  >
                    {item}
                  </button>
                ))}
                <a 
                  href={profile.contact.links.find(l => l.provider === 'whatsapp')?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-slate-900/20 flex items-center gap-2"
                >
                  <MessageSquare size={16} />
                  Hablemos
                </a>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-slate-900 p-2">
                  {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 animate-fade-in shadow-xl">
              <div className="px-4 pt-2 pb-6 space-y-1">
                {['Perfil', 'Servicios', 'Experiencia', 'Blog', 'Contacto'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left px-3 py-4 text-base font-bold text-slate-600 hover:bg-slate-50 hover:text-amber-600 rounded-lg transition-colors border-b border-slate-50 last:border-0 uppercase"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-100/30 skew-x-12 translate-x-32 -z-10"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="lg:w-1/2 space-y-8 animate-fade-in-up">
                   
                   <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                      Convierto tus datos dispersos en <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">3 ganancias concretas:</span>
                   </h1>
                   
                   <div className="space-y-5 mb-8">
                      <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-amber-200 transition-colors">
                        <div className="bg-amber-500 text-white font-black rounded-lg w-8 h-8 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">1</div>
                        <div>
                           <p className="text-lg font-bold text-slate-900">VENDES MÁS</p>
                           <p className="text-slate-600 text-sm">(Descubriendo oportunidades ocultas)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-amber-200 transition-colors">
                        <div className="bg-amber-500 text-white font-black rounded-lg w-8 h-8 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">2</div>
                         <div>
                           <p className="text-lg font-bold text-slate-900">RETIENES MEJOR</p>
                           <p className="text-slate-600 text-sm">(Prediciendo fugas antes de que ocurran)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-amber-200 transition-colors">
                        <div className="bg-amber-500 text-white font-black rounded-lg w-8 h-8 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30">3</div>
                         <div>
                           <p className="text-lg font-bold text-slate-900">CRECES SEGURO</p>
                           <p className="text-slate-600 text-sm">(Tomando decisiones con certeza absoluta)</p>
                        </div>
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button onClick={() => scrollToSection('experiencia')} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-900/30 flex items-center justify-center gap-2 group text-lg">
                         Ver Casos de Éxito
                         <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button onClick={() => scrollToSection('contacto')} className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold hover:border-slate-900 transition-all flex items-center justify-center gap-2 text-lg">
                         Agendar Diagnóstico
                      </button>
                   </div>
                </div>
                
                <div className="lg:w-1/2 relative animate-fade-in">
                   <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white rotate-1 hover:rotate-0 transition-all duration-700">
                      <img src={profile.photo} alt={profile.name} className="w-full h-auto object-cover scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                         <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Disponible para proyectos</span>
                         </div>
                         <p className="font-medium text-amber-400 mb-2">Especialista en</p>
                         <div className="flex flex-wrap gap-2">
                            {profile.skills.slice(0,4).map(skill => (
                               <span key={skill.name} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs font-bold border border-white/20 hover:bg-white/20 transition-colors">
                                  {skill.name}
                               </span>
                            ))}
                         </div>
                      </div>
                   </div>
                   {/* Decorative elements */}
                   <div className="absolute -top-12 -right-12 w-72 h-72 bg-amber-300 rounded-full blur-3xl opacity-20 -z-10"></div>
                   <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-20 -z-10"></div>
                </div>
             </div>
          </div>
        </section>

        {/* Profile & Focus Section (New Redesign) */}
        <section id="perfil" className="py-24 bg-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10 skew-x-12 translate-x-20"></div>

           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* 1. Economy Message */}
              <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
                  <span className="text-amber-500 font-bold tracking-[0.2em] uppercase text-sm bg-amber-50 px-3 py-1 rounded-full border border-amber-100">Mi Filosofía</span>
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-6 mb-6 leading-tight">
                    Genero <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 underline decoration-amber-200/50 decoration-4 underline-offset-4">Impacto Económico</span> Directo.
                  </h2>
                  <p className="text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto mb-8">
                    Convierto la complejidad de los datos en decisiones estratégicas claras. Mi objetivo no es solo analizar el pasado, sino asegurar la rentabilidad futura de tu negocio mediante modelos matemáticos precisos.
                  </p>
                  
                  <button 
                    onClick={() => window.open(`https://wa.me/573167562441?text=${encodeURIComponent('Hola Julio, me interesa tu enfoque de impacto económico. Hablemos.')}`, '_blank')}
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-900/20 group"
                  >
                    <MessageSquare size={20} className="text-amber-500" />
                    Enviar Mensaje Directo
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>

              {/* 2. Grid: Enfoque vs Formación */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start mt-10">
                 
                 {/* Enfoque (Left) */}
                 <div className="bg-slate-900 rounded-3xl p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                           <Target className="text-amber-500 w-6 h-6" />
                        </div>
                        Mi Enfoque
                    </h3>
                    
                    <div className="space-y-6 text-slate-300 leading-relaxed">
                       <ul className="space-y-4">
                          <li className="flex gap-3">
                             <CheckCircle2 className="text-amber-500 shrink-0 w-5 h-5 mt-0.5" />
                             <span>Diseño de <strong>Modelos Predictivos</strong> para anticipar la demanda futura.</span>
                          </li>
                          <li className="flex gap-3">
                             <CheckCircle2 className="text-amber-500 shrink-0 w-5 h-5 mt-0.5" />
                             <span>Optimización de <strong>Procesos Logísticos</strong> y reducción de costos operativos.</span>
                          </li>
                           <li className="flex gap-3">
                             <CheckCircle2 className="text-amber-500 shrink-0 w-5 h-5 mt-0.5" />
                             <span>Estrategias de <strong>Retención de Clientes (Churn)</strong> potenciadas por IA.</span>
                          </li>
                           <li className="flex gap-3">
                             <CheckCircle2 className="text-amber-500 shrink-0 w-5 h-5 mt-0.5" />
                             <span>Creación de <strong>Tableros de Control (Dashboards)</strong> para la alta gerencia.</span>
                          </li>
                       </ul>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                       <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                          <Zap className="text-amber-400 mb-2 w-5 h-5" />
                          <span className="font-bold text-white block">Velocidad</span>
                          <span className="text-xs text-slate-400">De datos a decisiones</span>
                       </div>
                       <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                          <BrainCircuit className="text-amber-400 mb-2 w-5 h-5" />
                          <span className="font-bold text-white block">Precisión</span>
                          <span className="text-xs text-slate-400">Modelos, no intuición</span>
                       </div>
                    </div>
                 </div>

                 {/* Formación (Right) */}
                 <div className="space-y-8">
                    <div className="pl-4 border-l-4 border-amber-500">
                       <h3 className="text-2xl font-black text-slate-900 mb-2">Formación Académica</h3>
                       <p className="text-slate-500">La base teórica detrás de la práctica.</p>
                    </div>

                    <div className="space-y-4">
                       {[
                          { title: "Master in Business Analytics", icon: BarChart3 },
                          { title: "Especialista en Econometría", icon: Database },
                          { title: "Ingeniero Industrial", icon: GraduationCap }
                       ].map((edu, idx) => (
                          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                             <div className="p-3 bg-amber-50 rounded-xl text-amber-600 shrink-0">
                                <edu.icon size={24} />
                             </div>
                             <div>
                                <h4 className="font-bold text-slate-900 text-lg leading-tight">{edu.title}</h4>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* 3. Tech Stack Footer */}
              <div className="mt-24">
                  <p className="text-center font-bold text-slate-400 uppercase tracking-widest text-xs mb-8">Tecnología de Vanguardia Utilizada</p>
                  
                  <div className="flex flex-wrap justify-center gap-3 md:gap-6 opacity-80 hover:opacity-100 transition-opacity">
                      {[
                         { name: "Python", icon: Code2 },
                         { name: "R Studio", icon: Terminal },
                         { name: "SQL Server", icon: Database },
                         { name: "Power BI", icon: BarChart3 },
                         { name: "Tableau", icon: PieChart },
                         { name: "Google Cloud", icon: Layers },
                         { name: "TensorFlow", icon: BrainCircuit }
                      ].map((tech, i) => (
                         <div key={i} className="flex items-center gap-2 px-5 py-3 bg-slate-50 border border-slate-200 rounded-full text-slate-600 font-bold text-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors cursor-default">
                            <tech.icon size={16} />
                            {tech.name}
                         </div>
                      ))}
                  </div>
              </div>
           </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-24 bg-slate-50 relative">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                 <span className="text-amber-600 font-bold text-sm tracking-widest uppercase mb-2 block">Soluciones de Alto Impacto</span>
                 <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Potencia tu negocio con datos</h2>
                 <p className="text-slate-600 text-lg">Servicios diseñados para generar retorno de inversión desde el primer mes.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                 {profile.services.map((service) => (
                    <div key={service.id} className={`flex flex-col justify-between p-10 rounded-3xl border transition-all duration-300 hover:-translate-y-2 group min-h-[400px] ${service.isFeatured ? 'bg-slate-900 text-white border-slate-900 shadow-2xl shadow-slate-900/30' : 'bg-white text-slate-900 border-slate-200 hover:border-amber-400 hover:shadow-2xl hover:shadow-slate-200/50'}`}>
                       <div>
                         <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-md ${service.isFeatured ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors'}`}>
                            {service.icon === 'strategy' && <Target size={32} />}
                            {service.icon === 'ml' && <BrainCircuit size={32} />}
                            {service.icon === 'startup' && <Lightbulb size={32} />}
                         </div>
                         <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                         <p className={`leading-relaxed text-lg ${service.isFeatured ? 'text-slate-300' : 'text-slate-600'}`}>
                            {service.description}
                         </p>
                       </div>
                       <button 
                          onClick={() => setSelectedService(service)}
                          className={`mt-8 flex items-center gap-2 font-bold uppercase text-sm tracking-wider ${service.isFeatured ? 'text-amber-500 hover:text-white' : 'text-slate-900 group-hover:text-amber-600'} transition-colors cursor-pointer`}
                        >
                          Ver detalles <ArrowRight size={16} />
                       </button>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Experience/Portfolio Section */}
        <section id="experiencia" className="py-24 bg-white">
           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                 <div>
                    <span className="text-amber-600 font-bold text-sm tracking-widest uppercase mb-2 block">Portafolio</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900">Casos de Estudio & Simuladores</h2>
                 </div>
                 <p className="text-slate-600 max-w-md text-sm md:text-base text-right md:text-left font-medium">
                    Explora cómo he resuelto problemas complejos. Interactúa con los simuladores y <strong className="text-amber-600">cotiza la implementación</strong> para tu empresa.
                 </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 {profile.projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                       <div className="h-52 relative overflow-hidden cursor-pointer shrink-0" onClick={() => toggleProject(project.id)}>
                             <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                             <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/10 transition-colors"></div>
                             {project.simulatorType && (
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-900 flex items-center gap-1 shadow-lg">
                                   <Activity size={12} className="text-amber-500" />
                                   Simulador
                                </div>
                             )}
                             <div className="absolute bottom-4 right-4 bg-white text-slate-900 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                <ChevronRight size={20} />
                             </div>
                       </div>
                       
                       <div className="p-6 flex flex-col flex-1">
                             <div className="mb-4">
                                <h3 className="text-xl font-bold text-slate-900 mb-1 leading-tight">{project.title}</h3>
                                <span className="text-amber-600 font-bold text-xs tracking-wide bg-amber-50 px-2 py-0.5 rounded-full">{project.role}</span>
                             </div>
                             
                             {!expandedProject && (
                               <p className="text-slate-600 mb-4 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                             )}

                             {expandedProject === project.id && (
                                <div className="animate-fade-in mt-2 flex-1">
                                   <p className="text-slate-600 mb-6 text-sm leading-relaxed">{project.description}</p>
                                   
                                   {/* Key Results */}
                                   <div className="mb-6 bg-slate-50 p-4 rounded-xl">
                                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                                         <Award size={16} className="text-amber-500" /> Resultados Clave
                                      </h4>
                                      <ul className="space-y-2">
                                         {project.results.map((res, i) => (
                                            <li key={i} className="flex gap-2 text-xs text-slate-700 font-medium">
                                               <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                                               {res}
                                            </li>
                                         ))}
                                      </ul>
                                   </div>

                                   {/* Interactive Simulators */}
                                   <div className="my-6">
                                      {project.simulatorType === 'inventory' && <InventorySimulator />}
                                      {project.simulatorType === 'oee' && <OEESimulator />}
                                      {project.simulatorType === 'churn' && <ChurnSimulator />}
                                   </div>

                                   {/* Journey Map */}
                                   {project.journeyMap && (
                                      <div className="mt-6">
                                         <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
                                            <MapPin size={16} className="text-amber-500" /> Customer Journey Map
                                         </h4>
                                         <JourneyMap stages={project.journeyMap} />
                                      </div>
                                   )}

                                   {/* Video */}
                                   {project.videoUrl && (
                                      <div className="mt-6">
                                          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                                            <PlayCircle size={16} className="text-amber-500" /> Demo Video
                                         </h4>
                                         <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-lg">
                                            <iframe width="100%" height="100%" src={project.videoUrl} title="Video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                         </div>
                                      </div>
                                   )}
                                   
                                   <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                                      <button 
                                        onClick={() => toggleProject(project.id)}
                                        className="text-xs font-bold text-slate-400 hover:text-slate-900 uppercase tracking-wide"
                                      >
                                        Cerrar detalles
                                      </button>
                                   </div>
                                </div>
                             )}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-24 bg-slate-50 border-t border-slate-200">
           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                 <span className="text-amber-600 font-bold text-sm tracking-widest uppercase mb-2 block">Pensamiento Estratégico</span>
                 <h2 className="text-3xl md:text-5xl font-black text-slate-900">Artículos & Insights</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                 {profile.blogPosts.map((post) => (
                    <div key={post.id} onClick={() => setSelectedPost(post)} className="group cursor-pointer bg-white rounded-3xl p-4 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl border border-slate-100">
                       <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-inner">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                             {post.category}
                          </div>
                       </div>
                       <div className="space-y-3 px-2 pb-4">
                          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
                             <BookOpen size={12} />
                             {post.readTime}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-tight">
                             {post.title}
                          </h3>
                          <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                             {post.hook}
                          </p>
                          <div className="pt-4 flex items-center gap-1 text-sm font-bold text-slate-900 group-hover:translate-x-2 transition-transform border-t border-slate-100 mt-2">
                             Leer artículo <ArrowRight size={14} className="text-amber-500" />
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-24 bg-slate-900 text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/10 to-transparent"></div>
           
           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <span className="text-amber-400 font-bold text-sm tracking-widest uppercase mb-4 block animate-pulse">¿Listo para el siguiente nivel?</span>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                 Convierte tus datos en tu <br/> mejor <span className="text-amber-500">ventaja competitiva</span>.
              </h2>
              <p className="text-slate-300 text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                 Ya sea que necesites una consultoría estratégica, optimizar procesos con IA, o simplemente validar una idea de negocio.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <a 
                   href={profile.contact.links.find(l => l.provider === 'whatsapp')?.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-xl shadow-green-500/20"
                 >
                    <WhatsappIcon className="w-6 h-6" />
                    Contactar por WhatsApp
                 </a>
                 <a 
                   href={profile.contact.links.find(l => l.provider === 'email')?.url}
                   className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all backdrop-blur-sm"
                 >
                    <Mail size={20} />
                    Enviar Correo
                 </a>
              </div>

              <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-sm">
                 <div className="flex gap-6">
                    {profile.contact.links.map(link => {
                       if (link.provider === 'linkedin') return <a key={link.provider} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"><Linkedin size={24} /></a>;
                       if (link.provider === 'github') return <a key={link.provider} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"><Github size={24} /></a>;
                       if (link.provider === 'twitter') return <a key={link.provider} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"><Twitter size={24} /></a>;
                       return null;
                    })}
                 </div>
                 <p className="text-slate-500 font-medium italic">"El futuro pertenece a quienes creen en la belleza de sus datos."</p>
              </div>
           </div>
        </section>

        {/* Modals & Chatbot */}
        {selectedPost && <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
        {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}
        <ChatBot />
      </div>
    </HashRouter>
  );
};