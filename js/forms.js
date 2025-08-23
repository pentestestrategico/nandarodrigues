/* Utilitário central para envio dos formulários via WhatsApp + validações básicas.
   Segurança: Em site estático o número fica exposto; evitar lógica sensível aqui.
   Anti-SPAM simples: delay mínimo + honeypot oculto + bloqueio de envios consecutivos rápidos.
*/
(function(){
  const NUMERO_WHATSAPP = '5521983463607';
  const MIN_DELAY_MS = 1200; // evita bots super rápidos
  let lastSend = 0;

  function sanitize(str){
    if(!str) return '';
    return String(str)
      .replace(/[\r\n]+/g,' ')      // remove quebras de linha
      .replace(/[<>]/g,'')            // remove tags
      .trim();
  }
  function validateEmail(email){
    return /^[\w.!#$%&'*+/=?`{|}~^-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
  }
  function buildWhatsAppURL(lines){
    const text = lines.filter(Boolean).map(l => l.replace(/\s+$/,'')).join('%0A');
    return `https://wa.me/${NUMERO_WHATSAPP}?text=${text}`;
  }
  function toast(msg,type='info'){
    let holder = document.querySelector('.toast-holder');
    if(!holder){
      holder = document.createElement('div');
      holder.className='toast-holder';
      document.body.appendChild(holder);
    }
    const el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.textContent = msg;
    holder.appendChild(el);
    requestAnimationFrame(()=> el.classList.add('show'));
    setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=> el.remove(),400); }, 4200);
  }

  function attach(form, kind){
    if(!form) return;
    // Honeypot
    const honeypot = document.createElement('input');
    honeypot.type='text'; honeypot.name='hp_field'; honeypot.tabIndex=-1; honeypot.autocomplete='off';
    honeypot.style.position='absolute'; honeypot.style.left='-9999px';
    form.appendChild(honeypot);

    form.addEventListener('submit', e => {
      e.preventDefault();
      const now = Date.now();
      if(now - lastSend < MIN_DELAY_MS){
        toast('Aguarde um instante antes de enviar novamente.','warn');
        return;
      }
      lastSend = now;

      const fd = new FormData(form);
      if(fd.get('hp_field')){ // bot
        toast('Bloqueado.','error');
        return;
      }
      // Campos comuns
  const nome = sanitize(fd.get('nome'));
  const email = sanitize(fd.get('email'));
  const telefone = formatPhone(fd.get('telefone'));
      if(!nome){ toast('Informe seu nome.','error'); return; }
  if(!validateEmail(email)){ toast('E-mail inválido.','error'); return; }
  const telDigits = (telefone||'').replace(/\D/g,'');
  if(telDigits.length !== 11){ toast('Informe telefone celular com 11 dígitos (DDD + 9).','error'); return; }

      let lines = [];
      lines.push('Olá, Nanda!');
      lines.push('');
      switch(kind){
        case 'contato':
          lines.push('*Novo contato pelo site*');
          lines.push(`*Nome:* ${encodeURIComponent(nome)}`);
          lines.push(`*E-mail:* ${encodeURIComponent(email)}`);
          if(telefone) lines.push(`*Tel:* ${encodeURIComponent(telefone)}`);
          lines.push(`*Tipo:* ${encodeURIComponent(sanitize(fd.get('tipo')||'Não informado'))}`);
          lines.push(`*Assunto:* ${encodeURIComponent(sanitize(fd.get('assunto')||'Contato'))}`);
          lines.push('*Mensagem:*');
          lines.push(encodeURIComponent(sanitize(fd.get('mensagem'))));
          break;
        case 'curso':
          lines.push('*Inscrição em Curso*');
          lines.push(`*Nome:* ${encodeURIComponent(nome)}`);
            lines.push(`*E-mail:* ${encodeURIComponent(email)}`);
          if(telefone) lines.push(`*Tel:* ${encodeURIComponent(telefone)}`);
          lines.push(`*Programa:* ${encodeURIComponent(sanitize(fd.get('programa')||''))}`);
          lines.push('*Objetivo:*');
          lines.push(encodeURIComponent(sanitize(fd.get('objetivo')||'')));
          break;
        case 'mentoria':
          lines.push('*Aplicação Mentoria 1:1*');
          lines.push(`*Nome:* ${encodeURIComponent(nome)}`);
          lines.push(`*E-mail:* ${encodeURIComponent(email)}`);
          if(telefone) lines.push(`*Tel:* ${encodeURIComponent(telefone)}`);
          lines.push(`*Instagram:* ${encodeURIComponent(sanitize(fd.get('instagram')||''))}`);
          lines.push(`*Cidade:* ${encodeURIComponent(sanitize(fd.get('cidade')||''))}`);
          lines.push(`*Momento:* ${encodeURIComponent(sanitize(fd.get('momento')||''))}`);
          lines.push('*Transformar:*');
          lines.push(encodeURIComponent(sanitize(fd.get('transformar')||'')));
          break;
        case 'evento':
          lines.push('*Pré-inscrição Evento*');
          lines.push(`*Nome:* ${encodeURIComponent(nome)}`);
          lines.push(`*E-mail:* ${encodeURIComponent(email)}`);
          if(telefone) lines.push(`*Tel:* ${encodeURIComponent(telefone)}`);
          lines.push(`*Evento:* ${encodeURIComponent(sanitize(fd.get('evento')||''))}`);
          lines.push('*Expectativa:*');
          lines.push(encodeURIComponent(sanitize(fd.get('expectativa')||'')));
          break;
      }
      lines.push('');
      lines.push(`Enviado em: ${encodeURIComponent(new Date().toLocaleString('pt-BR'))}`);

      const url = buildWhatsAppURL(lines);
      window.open(url,'_blank','noopener');
      toast('Abrindo WhatsApp...','info');
      form.reset();
    });
  }

  // Auto attach por IDs conhecidos
  document.addEventListener('DOMContentLoaded', () => {
    attach(document.getElementById('formContato'), 'contato');
    attach(document.getElementById('formCursos'), 'curso');
    attach(document.getElementById('formMentoria'), 'mentoria');
    attach(document.getElementById('formEventos'), 'evento');
    // Máscara dinâmica telefone
    document.querySelectorAll('input[name="telefone"]').forEach(inp => {
      inp.addEventListener('input', () => { inp.value = maskPhone(inp.value); });
    });
  });
  function maskPhone(v){
    if(!v) return '';
    v = v.replace(/\D/g,'').slice(0,11);
    if(v.length <= 10){ // fixo (AA) NNNN-NNNN
      return v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3').replace(/-$/,'');
    }
    return v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3').replace(/-$/,'');
  }
  function formatPhone(v){
    v = maskPhone(v);
    return v;
  }
})();
