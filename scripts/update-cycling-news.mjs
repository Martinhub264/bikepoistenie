import { writeFileSync } from 'node:fs';

const SOURCE = 'https://www.cycling-info.sk/spravodajstvo/cyklisticke-preteky';
const LIMIT = 4;

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function absoluteUrl(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return 'https://www.cycling-info.sk' + url;
  return 'https://www.cycling-info.sk/' + url;
}

const response = await fetch(SOURCE, { headers: { 'user-agent': 'bikepoistenie-news-updater/1.0' } });
if (!response.ok) throw new Error(`Failed to fetch source: ${response.status}`);
const html = await response.text();

const blockStart = html.indexOf('Preteky vo svete');
const body = blockStart > -1 ? html.slice(blockStart) : html;
const linkRe = /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis;
const items = [];
let match;

while ((match = linkRe.exec(body)) && items.length < LIMIT) {
  const rawUrl = match[1];
  const rawTitle = match[2].replace(/<[^>]*>/g, ' ');
  const title = decodeHtml(rawTitle);
  const url = absoluteUrl(rawUrl);
  if (!url.includes('cycling-info.sk/')) continue;
  if (title.length < 35) continue;
  if (/štartová listina|kalendár|titulka|forum|cookies|inzercia/i.test(title)) continue;
  if (items.some(item => item.url === url || item.title === title)) continue;

  const after = body.slice(linkRe.lastIndex, linkRe.lastIndex + 220);
  const dateMatch = after.match(/(\d{1,2}\.\d{1,2}\.,?\s*\d{1,2}:\d{2}|\d{1,2}\.\d{1,2}\.\d{4})/);
  items.push({ title, date: dateMatch ? dateMatch[1].replace(',', '') : '', url });
}

if (items.length === 0) throw new Error('No news items parsed');
writeFileSync('cycling-news.json', JSON.stringify(items, null, 2) + '\n', 'utf8');
console.log(`Updated ${items.length} cycling news items`);
