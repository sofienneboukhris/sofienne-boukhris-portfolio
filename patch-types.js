const fs = require('fs');
const file = 'src/types/calculator.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  '  basePriceEUR: number;\n  basePriceTND: number;',
  '  basePriceUSD: number;\n  basePriceTND: number;\n  basePriceEUR: number;\n  basePriceGBP: number;\n  basePriceCAD: number;'
);

code = code.replace(
  '  priceEUR: number;\n  priceTND: number;',
  '  priceUSD: number;\n  priceTND: number;\n  priceEUR: number;\n  priceGBP: number;\n  priceCAD: number;'
);

fs.writeFileSync(file, code);
