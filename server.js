require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_NUMBER = 'whatsapp:+225079706676';

const client = twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const getResponse = (msg) => {
  const m = msg.toLowerCase().trim();

  if (!m || m.includes('bonjour') || m.includes('salut') || m.includes('hello')) {
    return `Bonjour 👋 ! Bienvenue chez Empire X.

🎨 Design, 3D, UI/UX, photo/vidéo  
📣 Marketing & communication  
🌱 Agrichain (agritech/fintech)  
💻 Nova (logiciel)  
🤖 Aurora (IA)

Répondez : *3D*, *UI/UX*, *Agrichain*, *devis*, *portfolio*`;
  }

  if (m.includes('3d') || m.includes('modélisation') || m.includes('architecture')) {
    return `Nous réalisons des rendus 3D réalistes 🏗✨.

Portfolio : [Lien portfolio 3D à venir]  
Devis : [Lien devis à venir]`;
  }

  if (m.includes('ui') || m.includes('ux') || m.includes('interface')) {
    return `Interfaces web & mobile modernes 🖥📱.

Portfolio : [Lien portfolio UI/UX à venir]  
Devis : [Lien devis à venir]`;
  }

  if (m.includes('agrichain') || m.includes('agritech')) {
    return `**Agrichain Solutions** : blockchain & fintech pour l’agriculture 🌾.

Site : [Lien Agrichain à venir]  
Partenariat : [Lien contact à venir]`;
  }

  if (m.includes('nova')) {
    return `**Nova** : logiciel en développement 💻.

Site : [Lien Nova à venir]  
Beta : [Lien inscription beta à venir]`;
  }

  if (m.includes('aurora') || m.includes('ia')) {
    return `**Aurora** : notre IA propriétaire 🤖.

Site : [Lien Aurora à venir]  
Démo : [Lien demande démo à venir]`;
  }

  if (m.includes('devis') || m.includes('tarif') || m.includes('prix')) {
    return `Pour un devis, précisez :
1️⃣ Service souhaité
2️⃣ Description
3️⃣ Délai
4️⃣ Budget (optionnel)

Nous répondons sous 24h ✨`;
  }

  if (m.includes('portfolio') || m.includes('catalogue')) {
    return `Portfolios :
• Design : [à venir]
• 3D : [à venir]
• UI/UX : [à venir]
• Vidéo : [à venir]
• Photo : [à venir]
• Marketing : [à venir]`;
  }

  return `Merci ! Répondez *services*, *devis*, *portfolio*, *Agrichain*, *Nova* ou *Aurora*.`;
};

app.post('/webhook', (req, res) => {
  const incomingMsg = req.body.Body || '';
  const from = req.body.From;
  const reply = getResponse(incomingMsg);

  client.messages.create({
    body: reply,
    from: TWILIO_NUMBER,
    to: from
  }).catch(console.error);

  res.type('text/xml');
  res.send('<Response></Response>');
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Empire X Bot</title></head>
      <body style="font-family: Arial; padding: 40px; background: #f0f8ff;">
        <h1>✅ Empire X WhatsApp Bot</h1>
        <p>Bot actif. Webhook : <code>/webhook</code></p>
        <p><strong>Prochaines étapes :</strong></p>
        <ol>
          <li>Déployez sur Render</li>
          <li>Copiez l’URL + /webhook</li>
          <li>Collez-la dans Twilio</li>
        </ol>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log('Bot démarré');
});
