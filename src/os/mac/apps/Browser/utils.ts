// Safari/utils.ts

export const BLOCKED_DOMAINS = [
  "google.com",
  "github.com",
  "linkedin.com",
  "naukri.com",
];

export function resolveUrl(input: string) {
  const value = input.trim();
  if (!value) return null;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.includes(".") && !value.includes(" ")) {
    return "https://" + value;
  }

  return `https://www.google.com/search?q=${encodeURIComponent(value)}`;
}

export function canOpenInIframe(url: string) {
  return !BLOCKED_DOMAINS.some((d) => url.includes(d));
}


