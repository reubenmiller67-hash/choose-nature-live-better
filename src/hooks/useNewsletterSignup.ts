import { useState, useCallback } from 'react';

const KIT_API_URL = 'https://api.convertkit.com/v3/forms/9088928/subscribe';
const KIT_API_KEY = '7eqW266M5ZSRVQMX98Yw6g';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function useNewsletterSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = useCallback(async (email: string) => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const body = JSON.stringify({
      api_key: KIT_API_KEY,
      email: email.trim(),
    });

    try {
      const response = await fetch(KIT_API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body,
      });

      const responseText = await response.text();

      if (!response.ok) {
        let data: { message?: string } = {};
        try {
          data = responseText ? JSON.parse(responseText) : {};
        } catch {
          // ignore parse error
        }
        throw new Error(data?.message || 'Subscription failed');
      }

      setIsSuccess(true);
      return true;
    } catch {
      setError('Something went wrong. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsSuccess(false);
    setError(null);
  }, []);

  return { subscribe, isLoading, isSuccess, error, reset };
}
