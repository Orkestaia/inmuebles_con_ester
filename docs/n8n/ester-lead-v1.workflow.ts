import { workflow, node, trigger, sticky, ifElse, newCredential, expr } from '@n8n/workflow-sdk';

const recibirLead = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.1,
  config: {
    name: 'Recibir lead de la web',
    position: [0, 300],
    parameters: {
      httpMethod: 'POST',
      path: 'ester-lead-v1',
      authentication: 'headerAuth',
      responseMode: 'onReceived',
      options: { ignoreBots: true },
    },
    credentials: { httpHeaderAuth: { id: 'l9z2LZD1VweQIzNc', name: 'Ester lead · X-Lead-Secret' } },
  },
  output: [{ body: { origen: 'home', nombre: 'Prueba', telefono: '600123456', enlace_anuncio: 'https://www.idealista.com/inmueble/1/', tiempo_en_venta: '3-6-meses', consiente_contacto: true, consiente_llamada_asistente: false, event_id: 'abc-123', consent_marketing: false, utm: {}, ip_hash: 'x', user_agent: 'ua', ts: '2026-10-09T10:00:00Z', fuente: 'web' }, headers: {} }],
});

const config = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Config',
    position: [260, 300],
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'c1', name: 'cfg_email_ester', value: 'aitor@orkestaia.com', type: 'string' },
          { id: 'c2', name: 'cfg_telegram_aitor', value: '6674289801', type: 'string' },
          { id: 'c3', name: 'cfg_web', value: 'https://inmuebles-con-ester.vercel.app', type: 'string' },
          { id: 'c4', name: 'cfg_whatsapp_ester', value: '', type: 'string' },
          { id: 'c5', name: 'cfg_meta_pixel_id', value: '', type: 'string' },
          { id: 'c6', name: 'cfg_sheet_id', value: '1sJ-h4GjozoxYF_QsjnJOWG7vEn3J453IhZKVweMcYqw', type: 'string' },
        ],
      },
    },
  },
  output: [{ body: { origen: 'home', nombre: 'Prueba', telefono: '600123456' }, cfg_email_ester: 'aitor@orkestaia.com', cfg_telegram_aitor: '6674289801', cfg_web: 'https://inmuebles-con-ester.vercel.app', cfg_whatsapp_ester: '', cfg_meta_pixel_id: '', cfg_sheet_id: '1sJ-h4GjozoxYF_QsjnJOWG7vEn3J453IhZKVweMcYqw' }],
});

const normalizar = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Normalizar y detectar repetidos',
    position: [520, 300],
    parameters: {
      mode: 'runOnceForAllItems',
      language: 'javaScript',
      jsCode: `const item = $input.first().json;
const b = item.body ?? item;
const cfg = {
  email_ester: item.cfg_email_ester,
  telegram_aitor: item.cfg_telegram_aitor,
  web: item.cfg_web,
  whatsapp_ester: item.cfg_whatsapp_ester,
  meta_pixel_id: item.cfg_meta_pixel_id,
  sheet_id: item.cfg_sheet_id,
};

const soloDigitos = String(b.telefono ?? '').replace(/[\\s.\\-()]/g, '').replace(/^(\\+34|0034|34)/, '');
const telefono = soloDigitos ? '+34' + soloDigitos : '';
const origen = String(b.origen ?? 'home');

// Dedupe: mismo teléfono y mismo tipo de formulario en las últimas 24 h
const st = $getWorkflowStaticData('global');
st.vistos = st.vistos || {};
const ahora = Date.now();
for (const k of Object.keys(st.vistos)) { if (ahora - st.vistos[k] > 86400000) delete st.vistos[k]; }
const clave = (origen === 'guia' ? 'guia:' : 'lead:') + telefono;
const repetido = Boolean(st.vistos[clave]);
st.vistos[clave] = ahora;

const T = { 'no-publicado': 'Aún no publicado', 'menos-1-mes': 'Menos de 1 mes', '1-3-meses': '1-3 meses', '3-6-meses': '3-6 meses', 'mas-6-meses': 'Más de 6 meses' };
const P = { 'hasta-200': 'Hasta 200.000 €', '200-300': '200-300 mil €', '300-450': '300-450 mil €', '450-700': '450-700 mil €', 'mas-700': 'Más de 700.000 €' };
const Z = { 'ya': 'Lo antes posible', '3-meses': 'Próximos 3 meses', '6-meses': 'Próximos 6 meses', 'sin-prisa': 'Sin prisa' };
const O = { home: 'Web · home', vender: 'Web · vender-mi-piso', comprar: 'Web · comprar', guia: 'Web · guía PDF' };
const utm = b.utm || {};

const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid', hour12: false });
const piso = b.enlace_anuncio || b.zona_tipo || '';

return [{ json: {
  fecha,
  origen,
  origen_label: O[origen] || origen,
  nombre: String(b.nombre ?? '').trim(),
  telefono,
  email: String(b.email ?? '').trim(),
  piso,
  tiempo_en_venta: T[b.tiempo_en_venta] || b.tiempo_en_venta || '',
  zona: b.zona || '',
  dormitorios: b.dormitorios || '',
  presupuesto: P[b.presupuesto] || b.presupuesto || '',
  plazo: Z[b.plazo] || b.plazo || '',
  quiere_llamada: b.quiere_llamada === true ? 'sí' : 'no',
  consiente_llamada_asistente: b.consiente_llamada_asistente === true ? 'sí' : 'no',
  estado: 'nuevo',
  repetido: repetido ? 'sí' : 'no',
  es_repetido: repetido,
  es_guia: origen === 'guia',
  utm_source: utm.utm_source || '',
  utm_medium: utm.utm_medium || '',
  utm_campaign: utm.utm_campaign || '',
  utm_content: utm.utm_content || '',
  referrer: utm.referrer || '',
  landing: utm.landing || b.page || '',
  event_id: b.event_id || '',
  consent_marketing: b.consent_marketing === true ? 'sí' : 'no',
  fbp: b.consent_marketing === true ? (b.fbp || '') : '',
  fbc: b.consent_marketing === true ? (b.fbc || '') : '',
  user_agent: b.user_agent || '',
  ts: b.ts || new Date().toISOString(),
  event_time: Math.floor(ahora / 1000),
  notas: '',
  cfg,
} }];`,
    },
  },
  output: [{ fecha: '9/10/2026, 12:00:00', origen: 'home', origen_label: 'Web · home', nombre: 'Prueba', telefono: '+34600123456', email: '', piso: 'https://www.idealista.com/inmueble/1/', tiempo_en_venta: '3-6 meses', zona: '', dormitorios: '', presupuesto: '', plazo: '', quiere_llamada: 'no', consiente_llamada_asistente: 'no', estado: 'nuevo', repetido: 'no', es_repetido: false, es_guia: false, utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '', referrer: '', landing: '/', event_id: 'abc-123', consent_marketing: 'no', fbp: '', fbc: '', user_agent: 'ua', ts: '2026-10-09T10:00:00Z', event_time: 1791540000, notas: '', cfg: { email_ester: 'aitor@orkestaia.com', telegram_aitor: '6674289801', web: 'https://inmuebles-con-ester.vercel.app', whatsapp_ester: '', meta_pixel_id: '', sheet_id: '1sJ-h4GjozoxYF_QsjnJOWG7vEn3J453IhZKVweMcYqw' } }],
});

const guardarEnHoja = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Guardar en la hoja de leads',
    position: [800, 300],
    onError: 'continueErrorOutput',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { __rl: true, mode: 'id', value: '1sJ-h4GjozoxYF_QsjnJOWG7vEn3J453IhZKVweMcYqw' },
      sheetName: { __rl: true, mode: 'list', value: 'gid=0', cachedResultName: 'Leads' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          fecha: expr('{{ $json.fecha }}'),
          origen: expr('{{ $json.origen_label }}'),
          nombre: expr('{{ $json.nombre }}'),
          telefono: expr('{{ $json.telefono }}'),
          email: expr('{{ $json.email }}'),
          piso: expr('{{ $json.piso }}'),
          tiempo_en_venta: expr('{{ $json.tiempo_en_venta }}'),
          zona: expr('{{ $json.zona }}'),
          dormitorios: expr('{{ $json.dormitorios }}'),
          presupuesto: expr('{{ $json.presupuesto }}'),
          plazo: expr('{{ $json.plazo }}'),
          quiere_llamada: expr('{{ $json.quiere_llamada }}'),
          consiente_llamada_asistente: expr('{{ $json.consiente_llamada_asistente }}'),
          estado: expr('{{ $json.estado }}'),
          repetido: expr('{{ $json.repetido }}'),
          utm_source: expr('{{ $json.utm_source }}'),
          utm_medium: expr('{{ $json.utm_medium }}'),
          utm_campaign: expr('{{ $json.utm_campaign }}'),
          utm_content: expr('{{ $json.utm_content }}'),
          referrer: expr('{{ $json.referrer }}'),
          landing: expr('{{ $json.landing }}'),
          event_id: expr('{{ $json.event_id }}'),
          consent_marketing: expr('{{ $json.consent_marketing }}'),
          notas: expr('{{ $json.notas }}'),
        },
        schema: [
          { id: 'fecha', displayName: 'fecha', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'origen', displayName: 'origen', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'nombre', displayName: 'nombre', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'telefono', displayName: 'telefono', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'email', displayName: 'email', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'piso', displayName: 'piso', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'tiempo_en_venta', displayName: 'tiempo_en_venta', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'zona', displayName: 'zona', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'dormitorios', displayName: 'dormitorios', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'presupuesto', displayName: 'presupuesto', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'plazo', displayName: 'plazo', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'quiere_llamada', displayName: 'quiere_llamada', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'consiente_llamada_asistente', displayName: 'consiente_llamada_asistente', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'estado', displayName: 'estado', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'repetido', displayName: 'repetido', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'utm_source', displayName: 'utm_source', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'utm_medium', displayName: 'utm_medium', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'utm_campaign', displayName: 'utm_campaign', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'utm_content', displayName: 'utm_content', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'referrer', displayName: 'referrer', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'landing', displayName: 'landing', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'event_id', displayName: 'event_id', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'consent_marketing', displayName: 'consent_marketing', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
          { id: 'notas', displayName: 'notas', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true },
        ],
      },
      options: { cellFormat: 'RAW' },
    },
    credentials: { googleSheetsOAuth2Api: { id: 'eo1f1XyslpB7CNMJ', name: 'Google Sheets Orkesta' } },
  },
  output: [{ fecha: '9/10/2026, 12:00:00', origen: 'Web · home', nombre: 'Prueba', telefono: '+34600123456' }],
});

const esRepetido = ifElse({
  version: 2.3,
  config: {
    name: '¿Repetido en 24 h?',
    position: [1080, 300],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
        conditions: [{ id: 'r1', leftValue: expr("{{ $('Normalizar y detectar repetidos').item.json.es_repetido }}"), rightValue: true, operator: { type: 'boolean', operation: 'true', singleValue: true } }],
        combinator: 'and',
      },
    },
  },
});

const avisoRepetido = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: {
    name: 'Telegram: lead repetido (solo Aitor)',
    position: [1360, 120],
    onError: 'continueRegularOutput',
    parameters: {
      resource: 'message',
      operation: 'sendMessage',
      chatId: expr("{{ $('Normalizar y detectar repetidos').item.json.cfg.telegram_aitor }}"),
      text: expr("🔁 <b>Lead repetido (Inmuebles con Ester)</b>\n{{ $('Normalizar y detectar repetidos').item.json.nombre }} · {{ $('Normalizar y detectar repetidos').item.json.telefono }} ha vuelto a enviar el formulario ({{ $('Normalizar y detectar repetidos').item.json.origen_label }}). Guardado en la hoja, sin avisar a Ester."),
      additionalFields: { appendAttribution: false, parse_mode: 'HTML', disable_web_page_preview: true },
    },
    credentials: { telegramApi: { id: 'lFqrk5zgIca5nxYh', name: 'Telegram Hermes (avisos diagnóstico)' } },
  },
  output: [{ ok: true }],
});

const emailAEster = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Email a Ester: nuevo contacto',
    position: [1360, 400],
    onError: 'continueErrorOutput',
    parameters: {
      resource: 'message',
      operation: 'send',
      sendTo: expr("{{ $('Normalizar y detectar repetidos').item.json.cfg.email_ester }}"),
      subject: expr("{{ $('Normalizar y detectar repetidos').item.json.es_guia ? 'Guía pedida' : 'Nuevo contacto' }}: {{ $('Normalizar y detectar repetidos').item.json.nombre }} · {{ $('Normalizar y detectar repetidos').item.json.origen_label }}"),
      emailType: 'html',
      message: expr(
        "{{ (() => { const l = $('Normalizar y detectar repetidos').item.json; const fila = (k, v) => v ? '<tr><td style=\"padding:4px 12px 4px 0;color:#5a5560\">' + k + '</td><td style=\"padding:4px 0\"><b>' + v + '</b></td></tr>' : ''; const wa = l.telefono ? 'https://wa.me/' + l.telefono.replace('+','') : ''; return '<div style=\"font-family:Arial,sans-serif;font-size:15px;color:#1d1a1f;max-width:560px\">' + '<p style=\"font-size:18px;margin:0 0 12px\">' + (l.es_guia ? 'Alguien ha pedido la guía' : 'Nuevo contacto desde la web') + '</p>' + '<table style=\"border-collapse:collapse\">' + fila('Nombre', l.nombre) + fila('Teléfono', l.telefono) + fila('Email', l.email) + fila('Piso', l.piso) + fila('A la venta desde', l.tiempo_en_venta) + fila('Zona', l.zona) + fila('Dormitorios', l.dormitorios) + fila('Presupuesto', l.presupuesto) + fila('Plazo', l.plazo) + fila('Quiere que le llames', l.es_guia ? l.quiere_llamada : '') + fila('Origen', l.origen_label) + fila('Campaña', [l.utm_source, l.utm_medium, l.utm_campaign].filter(Boolean).join(' / ')) + fila('Fecha', l.fecha) + '</table>' + (wa ? '<p style=\"margin:18px 0\"><a href=\"' + wa + '\" style=\"background:#2f6b4f;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:bold\">Escribirle por WhatsApp</a></p>' : '') + '<p style=\"color:#5a5560;font-size:13px\">Prometido en la web: respuesta en menos de 24 horas. La consulta está guardada en la hoja «Inmuebles con Ester · Leads».</p>' + '</div>'; })() }}",
      ),
      options: { appendAttribution: false, senderName: 'Web Inmuebles con Ester' },
    },
    credentials: { gmailOAuth2: { id: 'dUucGjc2pUzK5evE', name: 'Orkesta Gmail' } },
  },
  output: [{ id: 'msg1', threadId: 't1' }],
});

const telegramAAitor = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: {
    name: 'Telegram a Aitor: nuevo contacto',
    position: [1640, 400],
    onError: 'continueRegularOutput',
    parameters: {
      resource: 'message',
      operation: 'sendMessage',
      chatId: expr("{{ $('Normalizar y detectar repetidos').item.json.cfg.telegram_aitor }}"),
      text: expr("{{ (() => { const l = $('Normalizar y detectar repetidos').item.json; const e = s => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); return (l.es_guia ? '📘 <b>Guía pedida</b>' : '🏠 <b>Nuevo propietario</b>') + ' (Inmuebles con Ester)\\n' + '<b>' + e(l.nombre) + '</b> · ' + e(l.telefono) + (l.email ? ' · ' + e(l.email) : '') + '\\n' + (l.piso ? 'Piso: ' + e(l.piso) + '\\n' : '') + (l.tiempo_en_venta ? 'A la venta desde: ' + e(l.tiempo_en_venta) + '\\n' : '') + (l.zona ? 'Busca en: ' + e(l.zona) + ' · ' + e(l.presupuesto) + '\\n' : '') + (l.es_guia ? 'Quiere llamada: ' + l.quiere_llamada + '\\n' : '') + 'Origen: ' + e(l.origen_label) + (l.utm_campaign ? ' · ' + e(l.utm_campaign) : '') + '\\nAvisada Ester por email (WhatsApp API pendiente).'; })() }}"),
      additionalFields: { appendAttribution: false, parse_mode: 'HTML', disable_web_page_preview: true },
    },
    credentials: { telegramApi: { id: 'lFqrk5zgIca5nxYh', name: 'Telegram Hermes (avisos diagnóstico)' } },
  },
  output: [{ ok: true }],
});

const esGuia = ifElse({
  version: 2.3,
  config: {
    name: '¿Pidió la guía?',
    position: [1920, 400],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
        conditions: [{ id: 'g1', leftValue: expr("{{ $('Normalizar y detectar repetidos').item.json.es_guia }}"), rightValue: true, operator: { type: 'boolean', operation: 'true', singleValue: true } }],
        combinator: 'and',
      },
    },
  },
});

const emailGuia = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Email al propietario: la guía',
    position: [2200, 300],
    onError: 'continueErrorOutput',
    parameters: {
      resource: 'message',
      operation: 'send',
      sendTo: expr("{{ $('Normalizar y detectar repetidos').item.json.email }}"),
      subject: 'Tu guía: por qué no se vende mi piso',
      emailType: 'text',
      message: expr("Hola {{ $('Normalizar y detectar repetidos').item.json.nombre }},\n\nAquí tienes la guía con los siete errores que más veo en los anuncios que llevan meses sin venderse:\n{{ $('Normalizar y detectar repetidos').item.json.cfg.web }}/guia-por-que-no-se-vende\n\n{{ $('Normalizar y detectar repetidos').item.json.quiere_llamada === 'sí' ? 'Has marcado que quieres que te llame: te escribo en menos de 24 horas para mirar tu anuncio.' : 'Si quieres que mire tu anuncio, responde a este correo con el enlace y te digo en 24 horas qué está fallando.' }}\n\nUn saludo,\nEster\nInmuebles con Ester · Madrid"),
      options: { appendAttribution: false, senderName: 'Ester · Inmuebles con Ester', replyTo: expr("{{ $('Normalizar y detectar repetidos').item.json.cfg.email_ester }}") },
    },
    credentials: { gmailOAuth2: { id: 'dUucGjc2pUzK5evE', name: 'Orkesta Gmail' } },
  },
  output: [{ id: 'msg2', threadId: 't2' }],
});

const metaCapi = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: {
    name: 'Meta Conversions API: Lead',
    position: [2480, 400],
    disabled: true,
    onError: 'continueRegularOutput',
    parameters: {
      method: 'POST',
      url: expr("https://graph.facebook.com/v21.0/{{ $('Normalizar y detectar repetidos').item.json.cfg.meta_pixel_id }}/events"),
      authentication: 'genericCredentialType',
      genericAuthType: 'httpTemplatedCustomAuth',
      sendBody: true,
      contentType: 'json',
      specifyBody: 'json',
      jsonBody: expr("{{ (() => { const l = $('Normalizar y detectar repetidos').item.json; const ud = { ph: [l.telefono.replace('+','').hash('sha256')], client_user_agent: l.user_agent, country: ['es'.hash('sha256')] }; if (l.email) ud.em = [l.email.toLowerCase().hash('sha256')]; if (l.fbp) ud.fbp = l.fbp; if (l.fbc) ud.fbc = l.fbc; return JSON.stringify({ data: [{ event_name: 'Lead', event_time: l.event_time, event_id: l.event_id, action_source: 'website', event_source_url: l.cfg.web + l.landing, user_data: ud, custom_data: { content_name: l.origen } }] }); })() }}"),
      options: { timeout: 8000 },
    },
    credentials: { httpTemplatedCustomAuth: newCredential('Meta CAPI · access_token') },
  },
  output: [{ events_received: 1 }],
});

const alertaAitor = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: {
    name: 'ALERTA a Aitor: lead no entregado',
    position: [1640, 700],
    parameters: {
      resource: 'message',
      operation: 'sendMessage',
      chatId: '6674289801',
      text: expr("{{ (() => { const l = $('Normalizar y detectar repetidos').first().json; const e = s => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); return '🚨 <b>Lead de Inmuebles con Ester NO entregado</b>\\nFalló un paso (hoja o email). Datos completos para que no se pierda:\\n\\n' + e(JSON.stringify({ nombre: l.nombre, telefono: l.telefono, email: l.email, piso: l.piso, tiempo: l.tiempo_en_venta, zona: l.zona, presupuesto: l.presupuesto, origen: l.origen_label, fecha: l.fecha }, null, 1)) + '\\n\\nError: ' + e(JSON.stringify($json.error || $json).slice(0, 600)); })() }}"),
      additionalFields: { appendAttribution: false, parse_mode: 'HTML', disable_web_page_preview: true },
    },
    credentials: { telegramApi: { id: 'lFqrk5zgIca5nxYh', name: 'Telegram Hermes (avisos diagnóstico)' } },
  },
  output: [{ ok: true }],
});

const notaConfig = sticky(
  '## Config\nCambia aquí el email de Ester, el chat de Telegram, la URL de la web y, cuando existan, el número de WhatsApp API y el ID del píxel de Meta. Nada más hay que tocar en el resto del flujo.',
  [config],
  { color: 4 },
);

const notaFlujo = sticky(
  '## ester-lead-v1\nContrato con la web: POST /webhook/ester-lead-v1 con cabecera X-Lead-Secret. Cuerpo: origen (home|vender|comprar|guia), nombre, telefono, enlace_anuncio|zona_tipo, tiempo_en_venta, email (guía), consentimientos, utm, event_id, consent_marketing, fbp/fbc.\n\nPasos: guardar en la hoja → si no es repetido: email a Ester + Telegram a Aitor → si pidió la guía: email al propietario → Meta CAPI (desactivado hasta tener píxel y token). Cualquier fallo en hoja o email dispara la alerta a Aitor con el lead completo.\n\nPendiente: WhatsApp a Ester (API) y Resend en lugar de Gmail.',
  [recibirLead],
  { color: 7 },
);

export default workflow('ester-lead-v1', 'Inmuebles con Ester · Lead v1')
  .add(recibirLead)
  .to(config)
  .to(normalizar)
  .to(guardarEnHoja.onError(alertaAitor))
  .to(
    esRepetido
      .onTrue(avisoRepetido)
      .onFalse(
        emailAEster.onError(alertaAitor).to(telegramAAitor).to(esGuia.onTrue(emailGuia.onError(alertaAitor).to(metaCapi)).onFalse(metaCapi)),
      ),
  )
  .add(notaConfig)
  .add(notaFlujo)
  .group('Entrada y normalización', [config, normalizar], { description: 'Constantes del flujo y normalización del lead (teléfono E.164, etiquetas, repetidos en 24 h)' });
