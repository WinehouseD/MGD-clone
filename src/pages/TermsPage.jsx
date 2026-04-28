import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";

export default function TermsPage({ lang, setLang, t }) {
  useEffect(() => {
    document.title =
      lang === "fr"
        ? "Conditions d'utilisation | Maçonnerie Grand-Duc"
        : "Terms of Service | Maçonnerie Grand-Duc";
  }, [lang]);

  return (
    <>
      <Header lang={lang} setLang={setLang} t={t} />
      <main className="legal-page">
        <div className="section-inner">
          {lang === "fr" ? <TermsFR /> : <TermsEN />}
        </div>
      </main>
      <Footer lang={lang} setLang={setLang} t={t} />
    </>
  );
}

function TermsEN() {
  return (
    <>
      <h1>Terms of Service</h1>
      <p className="legal-date">Last updated: April 2026</p>

      <h2>1. About This Website</h2>
      <p>
        This website is operated by Maçonnerie Grand-Duc, a masonry company
        based in Montréal, Québec, Canada, led by Mathieu Courville. By
        accessing or using this website, you agree to these terms.
      </p>

      <h2>2. Services</h2>
      <p>
        This website provides information about our masonry services and allows
        visitors to submit quote requests. The information presented is for
        general informational purposes only.
      </p>
      <p>
        Submitting a contact form does not constitute a binding contract or
        guarantee of service. All projects are subject to an on-site assessment
        and a formal written estimate.
      </p>

      <h2>3. Accuracy of Information</h2>
      <p>
        We make every effort to ensure the information on this website is
        accurate and up to date. However, we do not guarantee that all content
        is complete, current, or error-free. Service availability, pricing, and
        project timelines may vary.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        All content on this website — including text, images, logos, and the
        before/after project photos — is the property of Maçonnerie Grand-Duc
        and is protected under applicable copyright laws. You may not reproduce,
        distribute, or use any content without our prior written permission.
      </p>

      <h2>5. Third-Party Services</h2>
      <p>This website uses the following third-party services:</p>
      <ul>
        <li>
          <strong>Formspree</strong> — for contact form processing
        </li>
        <li>
          <strong>Google Maps</strong> — for location display
        </li>
      </ul>
      <p>
        These services are governed by their own terms and privacy policies. We
        are not responsible for their content or practices.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        Maçonnerie Grand-Duc is not liable for any damages arising from the use
        of this website, including but not limited to errors, interruptions, or
        inaccuracies in the content. Use of this website is at your own risk.
      </p>

      <h2>7. External Links</h2>
      <p>
        This website may contain links to external websites. We are not
        responsible for the content, accuracy, or privacy practices of any
        third-party sites.
      </p>

      <h2>8. Governing Law</h2>
      <p>
        These terms are governed by the laws of the Province of Québec and the
        federal laws of Canada applicable therein. Any disputes shall be subject
        to the exclusive jurisdiction of the courts of Québec.
      </p>

      <h2>9. Changes to These Terms</h2>
      <p>
        We reserve the right to update these terms at any time. Changes will be
        posted on this page with an updated date. Continued use of the website
        after changes constitutes acceptance of the new terms.
      </p>

      <h2>10. Contact</h2>
      <p>
        For any questions regarding these terms, please contact us at{" "}
        <a href="mailto:maconnerie@grand-duc.ca">maconnerie@grand-duc.ca</a> or
        by phone at <a href="tel:438-888-9044">438-888-9044</a>.
      </p>
    </>
  );
}

function TermsFR() {
  return (
    <>
      <h1>Conditions d'utilisation</h1>
      <p className="legal-date">Dernière mise à jour : avril 2026</p>

      <h2>1. À propos de ce site</h2>
      <p>
        Ce site est exploité par Maçonnerie Grand-Duc, une entreprise de
        maçonnerie basée à Montréal, Québec, Canada, dirigée par Mathieu
        Courville. En accédant à ce site ou en l'utilisant, vous acceptez les
        présentes conditions.
      </p>

      <h2>2. Services</h2>
      <p>
        Ce site fournit des informations sur nos services de maçonnerie et
        permet aux visiteurs de soumettre des demandes de soumission. Les
        informations présentées sont fournies à titre informatif seulement.
      </p>
      <p>
        La soumission d'un formulaire de contact ne constitue pas un contrat
        contraignant ni une garantie de service. Tous les projets sont soumis à
        une évaluation sur place et à une soumission écrite formelle.
      </p>

      <h2>3. Exactitude des informations</h2>
      <p>
        Nous faisons tout notre possible pour que les informations présentées
        sur ce site soient exactes et à jour. Cependant, nous ne garantissons
        pas que le contenu est complet, actuel ou exempt d'erreurs. La
        disponibilité des services, les prix et les délais peuvent varier.
      </p>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        Tout le contenu de ce site — incluant les textes, images, logos et
        photos de projets avant/après — est la propriété de Maçonnerie Grand-Duc
        et est protégé par les lois applicables en matière de droits d'auteur.
        Vous ne pouvez pas reproduire, distribuer ou utiliser ce contenu sans
        notre autorisation écrite préalable.
      </p>

      <h2>5. Services tiers</h2>
      <p>Ce site utilise les services tiers suivants :</p>
      <ul>
        <li>
          <strong>Formspree</strong> — pour le traitement du formulaire de
          contact
        </li>
        <li>
          <strong>Google Maps</strong> — pour l'affichage de la localisation
        </li>
      </ul>
      <p>
        Ces services sont régis par leurs propres conditions et politiques de
        confidentialité. Nous ne sommes pas responsables de leur contenu ou de
        leurs pratiques.
      </p>

      <h2>6. Limitation de responsabilité</h2>
      <p>
        Maçonnerie Grand-Duc n'est pas responsable des dommages découlant de
        l'utilisation de ce site, incluant notamment les erreurs, interruptions
        ou inexactitudes dans le contenu. L'utilisation de ce site est à vos
        propres risques.
      </p>

      <h2>7. Liens externes</h2>
      <p>
        Ce site peut contenir des liens vers des sites externes. Nous ne sommes
        pas responsables du contenu, de l'exactitude ou des pratiques de
        confidentialité de ces sites tiers.
      </p>

      <h2>8. Droit applicable</h2>
      <p>
        Les présentes conditions sont régies par les lois de la province de
        Québec et les lois fédérales du Canada qui s'y appliquent. Tout litige
        sera soumis à la juridiction exclusive des tribunaux du Québec.
      </p>

      <h2>9. Modifications des conditions</h2>
      <p>
        Nous nous réservons le droit de mettre à jour ces conditions en tout
        temps. Les modifications seront publiées sur cette page avec une date
        mise à jour. L'utilisation continue du site après les modifications
        constitue une acceptation des nouvelles conditions.
      </p>

      <h2>10. Contact</h2>
      <p>
        Pour toute question concernant ces conditions, veuillez nous contacter à{" "}
        <a href="mailto:maconnerie@grand-duc.ca">maconnerie@grand-duc.ca</a> ou
        par téléphone au <a href="tel:438-888-9044">438-888-9044</a>.
      </p>
    </>
  );
}
