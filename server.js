require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_NUMBER = 'whatsapp:+2250718349164'; // ✅ Format exact requis

const client = twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const getResponse = (msg) => {
  const m = (msg || '').toLowerCase().trim();

  if (!m || m.includes('bonjour') || m.includes('salut') || m.includes('hello')) {
    return `Bonjour 👋 ! Bienvenue chez Empire X.\n\n🎨 Design, 3D, UI/UX, photo/vidéo\n📣 Marketing & communication\n🌱 Agrichain (agritech/fintech)\n💻 Nova (logiciel)\n🤖 Aurora (IA)\n\nRépondez : *3D*, *UI/UX*, *Agrichain*, *devis*, *portfolio*`;
  }

  if (m.includes('3d') || m.includes('modélisation') || m.includes('architecture')) {
    return `Nous réalisons des rendus 3D réalistes 🏗✨.\n\nPortfolio : [Lien portfolio 3D à venir]\nDevis : [Lien devis à venir]`;
  }

  if (m.includes('ui') || m.includes('ux') || m.includes('interface')) {
    return `Interfaces web & mobile modernes 🖥📱.\n\nPortfolio : [Lien portfolio UI/UX à venir]\nDevis : [Lien devis à venir]`;
  }

  if (m.includes('agrichain') || m.includes('agritech')) {
    return `**Agrichain Solutions** : blockchain & fintech pour l’agriculture 🌾.\n\nSite : [Lien Agrichain à venir]\nPartenariat : [Lien contact à venir]`;
  }

  if (m.includes('nova')) {
    return `**Nova** : logiciel en développement 💻.\n\nSite : [Lien Nova à venir]\nBeta : [Lien inscription beta à venir]`;
  }

  if (m.includes('aurora') || m.includes('ia')) {
    return `**Aurora** : notre IA propriétaire 🤖.\n\nSite : [Lien Aurora à venir]\nDémo : [Lien demande démo à venir]`;
  }

  if (m.includes('devis') || m.includes('tarif') || m.includes('prix')) {
    return `Pour un devis, précisez :\n1️⃣ Service souhaité\n2️⃣ Description\n3️⃣ Délai\n4️⃣ Budget (optionnel)\n\nNous répondons sous 24h ✨`;
  }

  if (m.includes('portfolio') || m.includes('catalogue')) {
    return `Portfolios :\n• Design : [à venir]\n• 3D : [à venir]\n• UI/UX : [à venir]\n• Vidéo : [à venir]\n• Photo : [à venir]\n• Marketing : [à venir]`;
  }

  return `Merci ! Répondez *services*, *devis*, *portfolio*, *Agrichain*, *Nova* ou *Aurora*.`;
};

app.post('/webhook', (req, res) => {
  const msg = req.body.Body || '';
  const from = req.body.From;
  const reply = getResponse(msg);

  client.messages.create({
    body: reply,
    from: TWILIO_NUMBER,
    to: from
  }).catch(err => console.error('Erreur Twilio:', err.message));

  res.type('text/xml');
  res.send('<Response></Response>');
});

app.get('/', (req, res) => {
  res.send(`<h1>✅ Empire X Bot</h1><p>Webhook: /webhook</p><p>Numéro: +225 0718349164</p>`);
});

app.listen(PORT, () => {
  console.log('✅ Bot Empire X démarré');
});
