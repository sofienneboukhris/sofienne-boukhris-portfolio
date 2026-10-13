import { Language, NewsletterResult, NewsletterSubscription } from '../types';

const STORAGE_KEY = 'sb_newsletter_subscribers';

/**
 * Validates email with standard email regex
 */
export function validateEmail(email: string): boolean {
  if (!email || !email.trim()) return false;
  // RFC 5322 compatible regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim().toLowerCase());
}

/**
 * Retrieves all stored subscribers from client-side storage
 */
export function getStoredSubscribers(): NewsletterSubscription[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as NewsletterSubscription[];
  } catch {
    return [];
  }
}

/**
 * Mock newsletter subscription service
 * Simulates a real backend API endpoint with network latency and idempotency checks
 */
export async function subscribeToNewsletter(
  email: string,
  lang: Language = 'fr',
  honeypot?: string
): Promise<NewsletterResult> {
  // Honeypot spam prevention: if bot filled the hidden honeypot field, silently return success without saving
  if (honeypot && honeypot.trim() !== '') {
    return {
      success: true,
      message:
        lang === 'fr'
          ? 'Merci ! Votre inscription a bien été enregistrée.'
          : 'Thank you! You have been subscribed successfully.'
    };
  }

  // Simulate network roundtrip latency (400ms - 700ms)
  await new Promise((resolve) => setTimeout(resolve, 550));

  const cleanEmail = email ? email.trim().toLowerCase() : '';

  if (!cleanEmail) {
    return {
      success: false,
      error: 'REQUIRED',
      message: lang === 'fr' ? 'Veuillez saisir votre adresse email.' : 'Please enter your email address.'
    };
  }

  if (!validateEmail(cleanEmail)) {
    return {
      success: false,
      error: 'INVALID_EMAIL',
      message: lang === 'fr' ? 'Adresse email invalide.' : 'Invalid email address format.'
    };
  }

  // Check if already subscribed
  const existing = getStoredSubscribers();
  const alreadyExists = existing.some((sub) => sub.email.toLowerCase() === cleanEmail);

  if (alreadyExists) {
    return {
      success: false,
      error: 'ALREADY_SUBSCRIBED',
      message:
        lang === 'fr'
          ? 'Vous êtes déjà inscrit(e) avec cette adresse email.'
          : 'This email is already subscribed.'
    };
  }

  // Save new subscriber to localStorage
  const newSub: NewsletterSubscription = {
    email: cleanEmail,
    subscribedAt: new Date().toISOString(),
    lang
  };

  try {
    const updated = [newSub, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not persist subscriber to localStorage', err);
  }

  return {
    success: true,
    message:
      lang === 'fr'
        ? 'Merci ! Votre inscription a bien été enregistrée.'
        : 'Thank you! You have been subscribed successfully.'
  };
}
