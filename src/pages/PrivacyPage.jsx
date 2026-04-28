import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";

export default function PrivacyPage({ lang, setLang, t }) {
  useEffect(() => {
    document.title =
      lang === "fr"
        ? "Politique de confidentialité | Maçonnerie Grand-Duc"
        : "Privacy Policy | Maçonnerie Grand-Duc";
  }, [lang]);

  return (
    <>
      <Header lang={lang} setLang={setLang} t={t} />
      <main className="legal-page">
        <div className="section-inner">
          {lang === "fr" ? <PrivacyFR /> : <PrivacyEN />}
        </div>
      </main>
      <Footer lang={lang} setLang={setLang} t={t} />
    </>
  );
}

function PrivacyEN() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="legal-date">Last updated: April 2026</p>

      <h2>1. Who We Are</h2>
      <p>
        Maçonnerie Grand-Duc is a masonry company based in Montréal, Québec,
        Canada. We are operated by Mathieu Courville.
      </p>
      <ul>
        <li>Email: maconnerie@grand-duc.ca</li>
        <li>Phone: 438-888-9044</li>
        <li>Address: 3231 Rue de Bellechasse #2, Montréal, QC H1Y 1K3</li>
      </ul>

      <h2>2. What Information We Collect</h2>
      <p>When you submit our contact form, we collect:</p>
      <ul>
        <li>Your full name</li>
        <li>Your email address</li>
        <li>Your phone number</li>
        <li>Your project description</li>
      </ul>
      <p>
        We do not collect any other personal data. We do not use cookies or
        tracking tools.
      </p>

      <h2>3. How We Use Your Information</h2>
      <p>We use your information solely to:</p>
      <ul>
        <li>Respond to your quote or service request</li>
        <li>Contact you regarding your masonry project</li>
      </ul>
      <p>
        We will never sell, rent, or share your personal information with third
        parties for marketing purposes.
      </p>

      <h2>4. How We Store Your Information</h2>
      <p>
        Contact form submissions are processed through{" "}
        <a
          href="https://formspree.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Formspree
        </a>
        , a secure form service. Your data is transmitted securely and stored on
        their servers. You can review Formspree's privacy policy at
        formspree.io/legal/privacy-policy.
      </p>

      <h2>5. Your Rights (Québec Law 25)</h2>
      <p>
        Under Québec's Law 25 (Act respecting the protection of personal
        information in the private sector), you have the right to:
      </p>
      <ul>
        <li>Access the personal information we hold about you</li>
        <li>Request correction of inaccurate information</li>
        <li>Request deletion of your information</li>
        <li>Withdraw your consent at any time</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at{" "}
        <a href="mailto:maconnerie@grand-duc.ca">maconnerie@grand-duc.ca</a>.
      </p>

      <h2>6. Contact</h2>
      <p>
        For any privacy-related questions, please contact Mathieu Courville at{" "}
        <a href="mailto:maconnerie@grand-duc.ca">maconnerie@grand-duc.ca</a>.
      </p>
    </>
  );
}

function PrivacyFR() {
  return (
    <>
      <h1>Politique de confidentialité</h1>
      <p className="legal-date">Dernière mise à jour : avril 2026</p>

      <h2>1. Qui nous sommes</h2>
      <p>
        Maçonnerie Grand-Duc est une entreprise de maçonnerie basée à Montréal,
        Québec, Canada, exploitée par Mathieu Courville.
      </p>
      <ul>
        <li>Courriel : maconnerie@grand-duc.ca</li>
        <li>Téléphone : 438-888-9044</li>
        <li>Adresse : 3231 rue de Bellechasse #2, Montréal, QC H1Y 1K3</li>
      </ul>

      <h2>2. Informations que nous collectons</h2>
      <p>
        Lorsque vous soumettez notre formulaire de contact, nous collectons :
      </p>
      <ul>
        <li>Votre nom complet</li>
        <li>Votre adresse courriel</li>
        <li>Votre numéro de téléphone</li>
        <li>La description de votre projet</li>
      </ul>
      <p>
        Nous ne collectons aucune autre donnée personnelle. Nous n'utilisons pas
        de témoins (cookies) ni d'outils de suivi.
      </p>

      <h2>3. Comment nous utilisons vos informations</h2>
      <p>Nous utilisons vos informations uniquement pour :</p>
      <ul>
        <li>Répondre à votre demande de soumission ou de service</li>
        <li>Vous contacter au sujet de votre projet de maçonnerie</li>
      </ul>
      <p>
        Nous ne vendrons, louerons ni ne partagerons jamais vos informations
        personnelles avec des tiers à des fins commerciales.
      </p>

      <h2>4. Conservation de vos informations</h2>
      <p>
        Les soumissions du formulaire de contact sont traitées via{" "}
        <a
          href="https://formspree.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Formspree
        </a>
        , un service de formulaire sécurisé. Vos données sont transmises de
        façon sécurisée et stockées sur leurs serveurs.
      </p>

      <h2>5. Vos droits (Loi 25 du Québec)</h2>
      <p>
        En vertu de la Loi 25 du Québec (Loi sur la protection des
        renseignements personnels dans le secteur privé), vous avez le droit de
        :
      </p>
      <ul>
        <li>
          Accéder aux renseignements personnels que nous détenons sur vous
        </li>
        <li>Demander la correction de renseignements inexacts</li>
        <li>Demander la suppression de vos renseignements</li>
        <li>Retirer votre consentement en tout temps</li>
      </ul>
      <p>
        Pour exercer l'un de ces droits, contactez-nous à{" "}
        <a href="mailto:maconnerie@grand-duc.ca">maconnerie@grand-duc.ca</a>.
      </p>

      <h2>6. Contact</h2>
      <p>
        Pour toute question relative à la confidentialité, veuillez contacter
        Mathieu Courville à{" "}
        <a href="mailto:maconnerie@grand-duc.ca">maconnerie@grand-duc.ca</a>.
      </p>
    </>
  );
}
