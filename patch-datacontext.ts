import fs from 'fs';

const filePath = 'src/context/DataContext.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const mergeHelper = `
function mergeTranslations(defaultTrans: any, storedTrans: any) {
  if (!storedTrans) return defaultTrans;
  const merged = JSON.parse(JSON.stringify(defaultTrans));
  for (const lang of Object.keys(merged)) {
    if (storedTrans[lang]) {
      for (const section of Object.keys(merged[lang])) {
        if (storedTrans[lang][section] !== undefined) {
          if (Array.isArray(merged[lang][section])) {
             merged[lang][section] = storedTrans[lang][section];
          } else if (typeof merged[lang][section] === 'object') {
             merged[lang][section] = { ...merged[lang][section], ...storedTrans[lang][section] };
          } else {
             merged[lang][section] = storedTrans[lang][section];
          }
        }
      }
    }
  }
  return merged;
}
`;

content = content.replace(
  "const STORAGE_KEY = 'sb_admin_dashboard_data_v2';",
  "const STORAGE_KEY = 'sb_admin_dashboard_data_v2';\n" + mergeHelper
);

content = content.replace(
  /translations: \{\s*\.\.\.DEFAULT_TRANSLATIONS,\s*\.\.\.\(parsed\.translations \|\| \{\}\)\s*\}/g,
  "translations: mergeTranslations(DEFAULT_TRANSLATIONS, parsed.translations)"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Patched DataContext.tsx');
