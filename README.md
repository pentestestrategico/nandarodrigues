# Nanda Empodera · Plataforma de Empoderamento Feminino ✨

Landing page e micro–site elegante, minimalista e sofisticado para apresentação de história, proposta de valor, cursos, mentoria 1:1, eventos e contato — construído com foco em identidade, clareza de navegação e conversão.

<p align="center">
  <img src="./assets/preview.png" alt="Preview do site" width="720" style="max-width:100%; border:1px solid #d4af37; border-radius:14px;" />
</p>

---

## 🌟 Destaques
- Design autoral com paleta Preto · Branco · Dourado
- Tipografia sofisticada (Playfair Display + Poppins)
- Hero com imagem lateral blend + gradientes sutis
- Seções: Essência, História, Cursos, Mentoria, Eventos, Contato
- Formulários unificados com envio direto via **WhatsApp** (pré-preenchido)
- Máscara e validação de telefone (celular BR – 11 dígitos)
- Estrutura escalável e reutilizável de componentes CSS (cards, grids, botões)
- Feedback visual (toasts) + pequenas medidas anti–spam (honeypot, throttling)
- Código totalmente estático: hospede em qualquer serviço (GitHub Pages, Vercel, Netlify, etc.)

---

## 🧬 Stack & Tecnologias
| Camada | Uso |
|--------|-----|
| HTML5  | Estrutura semântica e SEO básico |
| CSS3   | Layout responsivo, animações leves e estética premium |
| JavaScript Vanilla | Lógica dos formulários, máscara de telefone, toasts |
| Google Fonts | Playfair Display & Poppins |

Sem frameworks pesados para performance e simplicidade.

---

## 📁 Estrutura
```
/ (root)
├── index.html               # Landing principal
├── pages/
│   ├── contato.html         # Fale comigo (WhatsApp)
│   ├── cursos.html          # Listagem + inscrição cursos
│   ├── mentoria.html        # Página mentoria 1:1 + aplicação
│   └── eventos.html         # Eventos e pré-inscrição
├── css/
│   └── style.css            # Estilos globais e componentes
├── js/
│   └── forms.js             # Validação + máscaras + envio WhatsApp
├── assets/                  # Imagens / mídia (adicione aqui)
└── README.md
```

---

## 🚀 Como Rodar Localmente
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```
2. Abra o `index.html` no navegador ou use um servidor local simples:
```bash
# Python 3
python -m http.server 5500
# ou Node
npx serve .
```
3. Acesse: http://localhost:5500

---

## 💬 Envio via WhatsApp
Todos os formulários geram uma URL pré-formatada para o número:
```
+55 21 98346-xxx
```
Arquivo responsável: `js/forms.js`.

Funcionalidades:
- Sanitização básica (remoção de tags maliciosas)
- Honeypot invisível para bots
- Delay mínimo entre envios (throttle)
- Máscara dinâmica: `(DD) 9XXXX-XXXX`
- Exige exatos 11 dígitos (padrão celular BR)
- Toasters para feedback (erro / aviso / info)

Para alterar o número, edite:
```js
const NUMERO_WHATSAPP = '5521983463607';
```

---

## 🎨 Personalização Rápida
| Elemento | Onde alterar |
|----------|--------------|
| Cores | `:root` em `css/style.css` |
| Fontes | `<head>` + variáveis CSS |
| Botões | Classe `.btn` |
| Bordas / Radius | Cards / .value-card / .course-card |
| Hero imagem | `.hero-art img` em CSS + `<img>` em `index.html` |

Sugestões extras:
- Adicionar favicon (`<link rel="icon">`)
- Incluir Open Graph / Twitter meta tags
- Criar `sitemap.xml` e `robots.txt`

---

## 🔐 Segurança & Boas Práticas
Embora seja um site estático:
- Não expõe lógica sensível (apenas número público de contato)
- Sanitiza entradas antes de montar a mensagem
- Remove quebras de linha e caracteres de marcação
- Usa `noopener` ao abrir WhatsApp (mitiga tabnabbing)

Para próximos passos mais robustos:
- Integrar backend (ex: serverless) para registrar leads
- Adicionar hCaptcha / Cloudflare Turnstile em formulários de alto tráfego

---

## 📈 Performance / SEO
| Item | Situação |
|------|----------|
| Lazy loading | Imagens principais podem receber `loading="lazy"` (já em alguns pontos) |
| Minificação | Pode ser adicionada em pipeline de build opcional |
| Critial CSS | Inline opcional para LCP mais rápido em produção |
| Meta descrição | Presente no `index.html` |
| Semântica | Seções / headings organizados |

---

## ♿ Acessibilidade
Melhorias futuras sugeridas:
- Adicionar `aria-label` mais semântico nos ícones sociais
- Garantir contraste AA (já próximo pela paleta)
- Foco visível customizado (`:focus-visible`)

---

## 🛣️ Roadmap (Ideias Futuras)
- [ ] Blog / Artigos
- [ ] Área de comunidade / membros
- [ ] FAQ dinâmica
- [ ] Dark overlay togglable na imagem hero
- [ ] Integração com e-mail marketing (Newsletter)
- [ ] Versão EN / ES (i18n)

---

## 🧪 Testes Manuais Recomendados
| Cenário | Passo | Resultado esperado |
|---------|-------|--------------------|
| Formulário contato | Enviar com e-mail inválido | Toast de erro |
| Telefone menor que 11 | Digitar e enviar | Bloqueia e alerta |
| Envio rápido duplo | Submeter 2x em < 1s | Segunda tentativa bloqueada |
| Curso selecionado | Escolher programa e enviar | Mensagem inclui *Programa* |

---

## 🤝 Contribuindo
1. Faça um fork
2. Crie branch: `feat/nova-secao`
3. Commit: `git commit -m "feat: adiciona seção depoimentos"`
4. Pull Request com descrição clara

---

## 📜 Licença
Defina a licença desejada (ex: MIT). Exemplo:
```
Este projeto está licenciado sob os termos da licença MIT.
```
(Crie um arquivo `LICENSE` se desejar.)

---

## 📮 Contato
| Canal | Link |
|-------|------|
| WhatsApp | +55 21 98346-3607 |
| Instagram | (adicionar) |
| LinkedIn | (adicionar) |
| E-mail | (opcional) |

---

> "Empoderar é permitir que a identidade floresça com consciência, elegância e propósito." 💛

---

Se quiser, posso gerar versão em inglês ou adicionar badges automáticos. É só pedir.
# nandarodrigues
