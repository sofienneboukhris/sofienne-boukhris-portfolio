import React, { useState, useEffect } from 'react';
import { ServiceCurrency, ServicePrices } from '../../types';
import { MANAGED_SERVICE_CURRENCIES } from '../../utils/servicePricing';
import { validatePrice, ValidationStatus } from '../../utils/priceValidation';
import { Sparkles, Coins, Info, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ServicePriceFieldsProps {
  prices: ServicePrices;
  onChangePrice: (currency: ServiceCurrency, amount: number) => void;
  onAutoCalculate: (baseCurrency: 'EUR' | 'USD') => void;
  onValidationChange?: (isValid: boolean, errors: Record<ServiceCurrency, string | null>) => void;
}

export const ServicePriceFields: React.FC<ServicePriceFieldsProps> = ({
  prices,
  onChangePrice,
  onAutoCalculate,
  onValidationChange
}) => {
  // Store raw text values for fluid user typing experience
  const [rawValues, setRawValues] = useState<Record<ServiceCurrency, string>>({
    USD: String(prices.USD ?? 700),
    TND: String(prices.TND ?? 1800),
    EUR: String(prices.EUR ?? 650),
    GBP: String(prices.GBP ?? 560),
    CAD: String(prices.CAD ?? 950)
  });

  // Track field touched states
  const [touched, setTouched] = useState<Record<ServiceCurrency, boolean>>({
    USD: false,
    TND: false,
    EUR: false,
    GBP: false,
    CAD: false
  });

  // Sync external changes (e.g. from AutoCalculate or initial service load)
  useEffect(() => {
    setRawValues(prev => {
      const updated: Record<ServiceCurrency, string> = { ...prev };
      MANAGED_SERVICE_CURRENCIES.forEach(curr => {
        const extVal = prices[curr.code];
        const currentParsed = Number(prev[curr.code]);
        // Only override if the external value differs from current parsed value
        if (extVal !== undefined && extVal !== currentParsed) {
          updated[curr.code] = String(extVal);
        }
      });
      return updated;
    });
  }, [prices.USD, prices.TND, prices.EUR, prices.GBP, prices.CAD]);

  // Compute real-time validation status for each currency
  const validationMap: Record<ServiceCurrency, ValidationStatus> = {
    USD: validatePrice(rawValues.USD, { min: 1, allowZero: false, required: true }),
    TND: validatePrice(rawValues.TND, { min: 1, allowZero: false, required: true }),
    EUR: validatePrice(rawValues.EUR, { min: 1, allowZero: false, required: true }),
    GBP: validatePrice(rawValues.GBP, { min: 1, allowZero: false, required: true }),
    CAD: validatePrice(rawValues.CAD, { min: 1, allowZero: false, required: true })
  };

  const isAllValid = Object.values(validationMap).every(v => v.isValid);
  const errorsMap: Record<ServiceCurrency, string | null> = {
    USD: validationMap.USD.errorMessage,
    TND: validationMap.TND.errorMessage,
    EUR: validationMap.EUR.errorMessage,
    GBP: validationMap.GBP.errorMessage,
    CAD: validationMap.CAD.errorMessage
  };

  // Notify parent component of validation status in real-time
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isAllValid, errorsMap);
    }
  }, [isAllValid, rawValues.USD, rawValues.TND, rawValues.EUR, rawValues.GBP, rawValues.CAD]);

  const handleInputChange = (currency: ServiceCurrency, text: string) => {
    setRawValues(prev => ({ ...prev, [currency]: text }));
    setTouched(prev => ({ ...prev, [currency]: true }));

    const status = validatePrice(text, { min: 1, allowZero: false, required: true });
    if (status.isValid && status.numericValue !== null) {
      onChangePrice(currency, status.numericValue);
    }
  };

  const handleBlur = (currency: ServiceCurrency) => {
    setTouched(prev => ({ ...prev, [currency]: true }));
    const status = validationMap[currency];
    // If valid, format nicely (e.g. trim whitespace)
    if (status.isValid && status.numericValue !== null) {
      setRawValues(prev => ({ ...prev, [currency]: String(status.numericValue) }));
      onChangePrice(currency, status.numericValue);
    }
  };

  const invalidCount = Object.values(validationMap).filter(v => !v.isValid).length;

  return (
    <div className="bg-[#02162B] p-4 sm:p-5 rounded-xl border border-[#0a3d54] space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#0a3d54]/70">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00151F] border border-[#0a3d54] flex items-center justify-center text-[#70ba65]">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Gestion des tarifs par devise
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#70ba65]/10 text-[#70ba65] font-mono border border-[#70ba65]/30">
                5 devises
              </span>
              {isAllValid ? (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#70ba65]/15 text-[#70ba65] font-mono flex items-center gap-1 border border-[#70ba65]/30">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Tarifs valides</span>
                </span>
              ) : (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 font-mono flex items-center gap-1 border border-red-500/30">
                  <AlertCircle className="w-3 h-3" />
                  <span>{invalidCount} {invalidCount > 1 ? 'prix invalides' : 'prix invalide'}</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#919ca1] mt-0.5">
              Définissez le prix pour chaque pays/région. Validation numérique automatique en temps réel.
            </p>
          </div>
        </div>

        {/* Quick Suggestion Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onAutoCalculate('EUR')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#00151F] border border-[#0a3d54] hover:border-[#70ba65] text-[#dedee0] hover:text-[#70ba65] text-[11px] font-mono transition-colors"
            title="Calculer automatiquement les autres devises à partir du montant EUR"
          >
            <Sparkles className="w-3 h-3 text-[#70ba65]" />
            <span>Suggérer via EUR</span>
          </button>
          <button
            type="button"
            onClick={() => onAutoCalculate('USD')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#00151F] border border-[#0a3d54] hover:border-[#70ba65] text-[#dedee0] hover:text-[#70ba65] text-[11px] font-mono transition-colors"
            title="Calculer automatiquement les autres devises à partir du montant USD"
          >
            <Sparkles className="w-3 h-3 text-[#70ba65]" />
            <span>Suggérer via USD</span>
          </button>
        </div>
      </div>

      {/* Info notice about rules */}
      <div className="bg-[#00151F]/70 border border-[#0a3d54]/60 rounded-lg p-2.5 flex items-start gap-2 text-[11px] text-[#919ca1] leading-relaxed">
        <Info className="w-3.5 h-3.5 text-[#70ba65] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white">Règles d'attribution automatique : </span>
          <span className="text-[#dedee0]">USD</span> par défaut pour tous les autres pays •{' '}
          <span className="text-[#dedee0]">TND</span> pour la Tunisie •{' '}
          <span className="text-[#dedee0]">EUR</span> pour la zone euro •{' '}
          <span className="text-[#dedee0]">GBP</span> pour le Royaume-Uni •{' '}
          <span className="text-[#dedee0]">CAD</span> pour le Canada.
        </div>
      </div>

      {/* Global Validation Warning Banner if any invalid input */}
      {!isAllValid && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2.5 flex items-center gap-2 text-xs text-red-400 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Format numérique invalide détecté. Tous les prix doivent être des nombres positifs supérieurs à 0.</span>
        </div>
      )}

      {/* Currency Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {MANAGED_SERVICE_CURRENCIES.map(curr => {
          const rawValue = rawValues[curr.code] ?? '';
          const status = validationMap[curr.code];
          const hasError = !status.isValid;
          const isTouched = touched[curr.code];

          return (
            <div
              key={curr.code}
              className={`bg-[#00151F] border rounded-lg p-3 transition-colors flex flex-col justify-between ${
                hasError
                  ? 'border-red-500/70 bg-red-950/10 ring-1 ring-red-500/20'
                  : 'border-[#0a3d54] hover:border-[#0a3d54]/90'
              }`}
            >
              <div>
                {/* Currency label & flag */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base" role="img" aria-label={curr.code}>
                      {curr.flag}
                    </span>
                    <span className="text-xs font-bold text-white font-mono">{curr.code}</span>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      curr.code === 'USD'
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-[#02162B] text-[#919ca1] border border-[#0a3d54]'
                    }`}
                  >
                    {curr.tag.fr}
                  </span>
                </div>

                {/* Subtitle / region description */}
                <p className="text-[10px] text-[#919ca1] mb-2 leading-tight">
                  {curr.description.fr}
                </p>
              </div>

              {/* Input field & real-time error indicator */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[10px] uppercase font-mono text-[#919ca1]">
                    Prix de départ ({curr.symbol})
                  </label>
                  {status.isValid ? (
                    <span className="text-[9px] text-[#70ba65] font-mono flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Valide
                    </span>
                  ) : (
                    <span className="text-[9px] text-red-400 font-mono flex items-center gap-0.5">
                      <AlertCircle className="w-2.5 h-2.5" />
                      Invalide
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={rawValue}
                    onChange={e => handleInputChange(curr.code, e.target.value)}
                    onBlur={() => handleBlur(curr.code)}
                    className={`w-full pl-3 pr-12 py-2 text-xs font-mono font-bold rounded-lg focus:outline-none transition-colors ${
                      hasError
                        ? 'bg-red-950/20 border border-red-500 text-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                        : 'bg-[#02162B] border border-[#0a3d54] text-[#70ba65] focus:border-[#70ba65]'
                    }`}
                    placeholder="Ex: 650"
                  />
                  <div
                    className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs font-mono font-bold ${
                      hasError ? 'text-red-400' : 'text-[#919ca1]'
                    }`}
                  >
                    {curr.symbol}
                  </div>
                </div>

                {/* Real-time error message */}
                {hasError && (
                  <div className="mt-1.5 flex items-start gap-1 text-[10px] text-red-400 font-mono leading-tight">
                    <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                    <span>{status.errorMessage}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
