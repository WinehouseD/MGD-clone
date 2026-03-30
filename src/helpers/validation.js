export function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return true;
  if (digits.length !== 10) return false;
  if (digits[0] === "0" || digits[0] === "1") return false;
  if (digits[3] === "0" || digits[3] === "1") return false;
  return true;
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export function isValidName(value) {
  const trimmed = value.trim();
  if (trimmed.length < 2) return false;
  if (trimmed.length > 80) return false;
  return /^[a-zA-ZÀ-ÿ\s'-]+$/.test(trimmed);
}

export function isValidMessage(value) {
  const trimmed = value.trim();
  return trimmed.length >= 10 && trimmed.length <= 500;
}
