export function formatOrderType(value:'delivery'|'pickup'){ return value==='delivery' ? 'משלוח' : 'איסוף עצמי'; }
export function formatDate(value:string){ return new Intl.DateTimeFormat('he-IL',{dateStyle:'medium',timeStyle:'short'}).format(new Date(value)); }
