import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./lib/**/*.{ts,tsx}'], theme: { extend: { colors: { wood: {950:'#1b110c',900:'#24170f',800:'#362317',700:'#4b3120'}, gold:{300:'#e7d29c',400:'#d8bc7d',500:'#c9a96a',600:'#b68b45'}, leaf:'#31492f' }, boxShadow:{ rustic:'0 14px 40px rgba(0,0,0,0.28)' }, borderRadius:{ '4xl':'2rem' } } }, plugins: [] };
export default config;
