const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://corallofromitaly.vercel.app';

export default function sitemap() {
  return [{ url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
