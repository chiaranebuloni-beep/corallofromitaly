import { EMAIL, LEGAL } from '@/lib/i18n';

export const metadata = {
  title: 'Privacy — Corallo from Italy',
  robots: { index: false },
};

// Informativa privacy (art. 13 GDPR). Da far verificare al cliente.
export default function Privacy() {
  const vat = LEGAL.vat ? `, P.IVA ${LEGAL.vat}` : '';
  return (
    <main className="legal">
      <a href="/" className="legal__back">← Corallo from Italy</a>

      <h1>Privacy policy</h1>

      <section lang="it">
        <h2>Informativa sul trattamento dei dati personali</h2>
        <p>
          <strong>Titolare del trattamento</strong>: {LEGAL.owner} (Corallo from Italy), {LEGAL.city}
          {vat}. Contatto: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <h3>Quali dati raccogliamo</h3>
        <p>
          Quando ci scrivi tramite il modulo contatti o via email riceviamo solo i dati che scegli di inserire (nome,
          indirizzo email, messaggio). Il server che ospita il sito
          (Vercel) registra dati tecnici di navigazione, come l’indirizzo IP, per motivi di sicurezza e funzionamento.
        </p>
        <h3>Perché e per quanto tempo</h3>
        <p>
          Usiamo i tuoi dati solo per rispondere alla tua richiesta (base giuridica: misure precontrattuali e legittimo
          interesse, art. 6 GDPR) e li conserviamo per il tempo necessario a gestirla. Non li vendiamo e non li cediamo a
          terzi per finalità di marketing.
        </p>
        <h3>Cookie</h3>
        <p>
          Il sito non usa cookie di profilazione né strumenti di analisi. Nel tuo browser salviamo solo la lingua scelta e
          il fatto che hai già visto l’animazione iniziale: dati tecnici che restano sul tuo dispositivo.
        </p>
        <h3>I tuoi diritti</h3>
        <p>
          Puoi chiedere in qualsiasi momento di accedere ai tuoi dati, correggerli o cancellarli, limitarne il trattamento o
          opporti (artt. 15–22 GDPR) scrivendo a <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Hai anche il diritto di
          presentare reclamo al Garante per la protezione dei dati personali (garanteprivacy.it).
        </p>
      </section>

      <section lang="en">
        <h2>Privacy notice (English)</h2>
        <p>
          <strong>Data controller</strong>: {LEGAL.owner} (Corallo from Italy), {LEGAL.city}
          {LEGAL.vat ? `, VAT ${LEGAL.vat}` : ''}. Contact: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <p>
          When you contact us through the form or by email we only receive what you choose to write (name, email address,
          message). Our hosting provider (Vercel) logs
          technical data such as IP addresses for security and operation. We use your data only to reply to your request,
          keep it only as long as needed and never sell it. The site uses no profiling cookies or analytics: your browser
          only stores your language and whether you have already seen the opening animation. You can ask to access,
          correct or delete your data at any time (GDPR arts. 15–22) and you may lodge a complaint with the Italian data
          protection authority (Garante).
        </p>
      </section>
    </main>
  );
}
