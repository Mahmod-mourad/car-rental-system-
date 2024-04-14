export function validateEmail(email: string): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  return /^(\+966|0)\d{9}$/.test(phone);
}

export function validateLicenseNumber(license: string): boolean {
  if (!license) return false;
  return /^(SA)?\d{9}$/.test(license);
}
