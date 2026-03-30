import {
  formatPhone,
  isValidEmail,
  isValidMessage,
  isValidName,
  isValidPhone,
} from "../helpers/validation";
import { FORMSPREE_FORM_ID, initialForm } from "../constants";
import { useForm, ValidationError } from "@formspree/react";
import { useState, useEffect } from "react";

export default function ContactForm({ lang, t }) {
  const [formValues, setFormValues] = useState({ ...initialForm });
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);
  const hasErrors = Array.isArray(state.errors) && state.errors.length > 0;

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const nameValid = isValidName(formValues.name);
  const emailValid = isValidEmail(formValues.email);
  const phoneValid = isValidPhone(formValues.phone);
  const messageValid = isValidMessage(formValues.message);

  const showNameError = touched.name && !nameValid;
  const showEmailError = touched.email && !emailValid;
  const showPhoneError = touched.phone && !phoneValid;
  const showMessageError = touched.message && !messageValid;

  const isFormValid = nameValid && emailValid && phoneValid && messageValid;
  const isButtonDisabled = !isFormValid || state.submitting;

  useEffect(() => {
    if (state.succeeded) {
      setFormValues({ ...initialForm });
      setTouched({ name: false, email: false, phone: false, message: false });
    }
  }, [state.succeeded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormValues((prev) => ({ ...prev, phone: formatted }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const onSubmit = (e) => {
    setTouched({ name: true, email: true, phone: true, message: true });
    if (!isFormValid) {
      e.preventDefault();
      return;
    }
    handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="name">{t("form.label.name")}</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder={t("form.placeholder.name")}
        value={formValues.name}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        maxLength={80}
        aria-invalid={showNameError}
        aria-describedby={showNameError ? "name-error" : undefined}
        className={showNameError ? "input-error" : ""}
      />
      {showNameError && (
        <p id="name-error" className="field-error" role="alert">
          {t("form.error.name")}
        </p>
      )}

      <label htmlFor="email">{t("form.label.email")}</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder={t("form.placeholder.email")}
        value={formValues.email}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        aria-invalid={showEmailError}
        aria-describedby={showEmailError ? "email-error" : undefined}
        className={showEmailError ? "input-error" : ""}
      />
      {showEmailError && (
        <p id="email-error" className="field-error" role="alert">
          {t("form.error.email")}
        </p>
      )}
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <label htmlFor="phone">{t("form.label.phone")}</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        placeholder="(xxx) xxx-xxxx"
        value={formValues.phone}
        onChange={handlePhoneChange}
        onBlur={handleBlur}
        maxLength={14}
        aria-invalid={showPhoneError}
        aria-describedby={showPhoneError ? "phone-error" : undefined}
        className={showPhoneError ? "input-error" : ""}
      />
      {showPhoneError && (
        <p id="phone-error" className="field-error" role="alert">
          {t("form.error.phone")}
        </p>
      )}

      <label htmlFor="message">{t("form.label.message")}</label>
      <textarea
        id="message"
        name="message"
        placeholder={t("form.placeholder.message")}
        value={formValues.message}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        maxLength={500}
        aria-invalid={showMessageError}
        aria-describedby={showMessageError ? "message-error" : undefined}
        className={showMessageError ? "input-error" : ""}
      />
      {showMessageError && (
        <p id="message-error" className="field-error" role="alert">
          {t("form.error.message")}
        </p>
      )}
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <input type="hidden" name="_language" value={lang} />
      <input type="hidden" name="_subject" value="New masonry inquiry" />
      <input
        type="text"
        name="_gotcha"
        style={{ display: "none" }}
        tabIndex="-1"
        autoComplete="off"
      />

      <button
        type="submit"
        className={isButtonDisabled ? "btn-outline-disabled" : "btn-outline"}
        disabled={isButtonDisabled}
      >
        {state.submitting ? t("form.sending") : t("form.submit")}
      </button>

      {state.succeeded && (
        <p role="status" className="form-success">
          {t("form.success")}
        </p>
      )}

      {hasErrors && !state.submitting && !state.succeeded && (
        <p role="status" className="form-error">
          {t("form.error")}
        </p>
      )}
    </form>
  );
}
