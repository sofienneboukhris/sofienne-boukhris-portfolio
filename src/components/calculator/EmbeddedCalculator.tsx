import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { useRouter } from '../../context/RouterContext';
import { useGlobalCurrency } from '../../context/CurrencyContext';
import { useData } from '../../context/DataContext';
import { ProjectTypeId, CalculatorState, CostBreakdown } from '../../types/calculator';
import { calculateCostBreakdown } from '../../utils/calculatorLogic';
import { CalculatorProgressBar } from './CalculatorProgressBar';
import { CalculatorFloatingBar } from './CalculatorFloatingBar';
import { StepIntro } from './StepIntro';
import { StepProjectType } from './StepProjectType';
import { StepFeatures } from './StepFeatures';
import { StepCustomization } from './StepCustomization';
import { StepSummary } from './StepSummary';
import { StepContact } from './StepContact';
import { QuoteResultModal } from './QuoteResultModal';

export interface EmbeddedCalculatorProps {
  id?: string;
  initialProjectTypeId?: ProjectTypeId;
  customTitle?: { fr: string; en: string };
  customSubtitle?: { fr: string; en: string };
  contextServiceSlug?: string;
  contextProjectSlug?: string;
  className?: string;
}

export const EmbeddedCalculator: React.FC<EmbeddedCalculatorProps> = ({
  id,
  initialProjectTypeId,
  customTitle,
  customSubtitle,
  className = ''
}) => {
  const { calculatorConfig } = useData();
  const PROJECT_TYPES = calculatorConfig?.projectTypes || [];
  const { lang } = useRouter();
  const { currency, geoInfo } = useGlobalCurrency();

  // Initial State
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    currentStep: initialProjectTypeId ? 1 : 0, // Skip intro if project type provided
    currency,
    geoInfo,
    projectType: initialProjectTypeId || (PROJECT_TYPES.length > 0 ? PROJECT_TYPES[0].id as ProjectTypeId : 'vitrine'),
    selectedFeatures: [], // NO AUTO CHECK
    pageCount: initialProjectTypeId ? (PROJECT_TYPES.find(p => p.id === initialProjectTypeId)?.basePages || 5) : 5,
    designLevel: 'template',
    timeline: 'standard',
    supportLevel: 'doc',
    clientInfo: { fullName: '', email: '', phone: '', company: '', websiteOrFigma: '', notes: '' }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync currency and geoInfo automatically (user cannot change currency)
  useEffect(() => {
    setCalculatorState((prev) => ({ ...prev, currency, geoInfo }));
  }, [currency, geoInfo]);

  const handleSelectProjectType = (typeId: ProjectTypeId) => {
    const pType = PROJECT_TYPES.find((p) => p.id === typeId);
    setCalculatorState((prev) => ({
      ...prev,
      projectType: typeId,
      pageCount: pType ? pType.basePages : prev.pageCount
    }));
  };

  const handleToggleFeature = (featId: string) => {
    setCalculatorState((prev) => {
      const exists = prev.selectedFeatures.includes(featId);
      const updated = exists
        ? prev.selectedFeatures.filter((id) => id !== featId)
        : [...prev.selectedFeatures, featId];
      return { ...prev, selectedFeatures: updated };
    });
  };

  const handleClearFeatures = () => {
    setCalculatorState((prev) => ({ ...prev, selectedFeatures: [] }));
  };

  const handlePageCountChange = (count: number) => {
    setCalculatorState((prev) => ({ ...prev, pageCount: count }));
  };

  const handleUpdateClientInfo = (info: Partial<CalculatorState['clientInfo']>) => {
    setCalculatorState((prev) => ({
      ...prev,
      clientInfo: { ...prev.clientInfo, ...info }
    }));
  };

  const handleReset = () => {
    setCalculatorState({
      currentStep: 0,
      currency,
      geoInfo,
      projectType: PROJECT_TYPES.length > 0 ? PROJECT_TYPES[0].id as ProjectTypeId : 'vitrine',
      selectedFeatures: [],
      pageCount: 5,
      designLevel: 'template',
      timeline: 'standard',
      supportLevel: 'doc',
      clientInfo: { fullName: '', email: '', phone: '', company: '', websiteOrFigma: '', notes: '' }
    });
    // Scroll to top of calculator
    const el = document.getElementById(id || 'embedded-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToStep = (step: number) => {
    setCalculatorState((prev) => ({ ...prev, currentStep: step }));
    // Scroll to calculator top to avoid jumping context
    const el = document.getElementById(id || 'embedded-calculator');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const breakdown = useMemo(() => {
    return calculateCostBreakdown(calculatorState, calculatorConfig);
  }, [calculatorState, calculatorConfig]);

  const selectedProjectTypeObj = PROJECT_TYPES.find(p => p.id === calculatorState.projectType);
  const canProceed = Boolean(calculatorState.projectType);

  return (
    <div id={id || 'embedded-calculator'} className={`bg-[#00151F] text-[#dedee0] rounded-2xl border border-[#0a3d54] overflow-hidden relative shadow-2xl ${className}`}>
      {/* Progress Bar (Visible from Step 1 onwards) */}
      {calculatorState.currentStep > 0 && (
        <div className="bg-[#00283A] border-b border-[#0a3d54]">
          <CalculatorProgressBar
            currentStep={calculatorState.currentStep}
            totalSteps={6}
            onStepClick={(step) => goToStep(step)}
            lang={lang}
            currency={calculatorState.currency}
            geoInfo={calculatorState.geoInfo}
          />
        </div>
      )}

      {/* Multi-Step Views */}
      <div className="p-4 sm:p-6 lg:p-8 min-h-[500px]">
        <AnimatePresence mode="wait">
          {calculatorState.currentStep === 0 && (
            <StepIntro
              key="step-intro"
              onStart={() => goToStep(1)}
              lang={lang}
              currency={calculatorState.currency}
              geoInfo={calculatorState.geoInfo}
              customTitle={customTitle}
              customSubtitle={customSubtitle}
            />
          )}
          {calculatorState.currentStep === 1 && (
            <StepProjectType
              key="step-project-type"
              selectedType={calculatorState.projectType}
              onSelect={handleSelectProjectType}
              lang={lang}
              currency={calculatorState.currency}
            />
          )}
          {calculatorState.currentStep === 2 && (
            <StepFeatures
              key="step-features"
              selectedFeatures={calculatorState.selectedFeatures}
              onToggleFeature={handleToggleFeature}
              onClearFeatures={handleClearFeatures}
              projectType={calculatorState.projectType}
              lang={lang}
              currency={calculatorState.currency}
            />
          )}
          {calculatorState.currentStep === 3 && (
            <StepCustomization
              key="step-customization"
              pageCount={calculatorState.pageCount}
              onPageCountChange={handlePageCountChange}
              designLevel={calculatorState.designLevel}
              onDesignLevelChange={(lvl) => setCalculatorState(prev => ({ ...prev, designLevel: lvl }))}
              timeline={calculatorState.timeline}
              onTimelineChange={(tl) => setCalculatorState(prev => ({ ...prev, timeline: tl }))}
              supportLevel={calculatorState.supportLevel}
              onSupportLevelChange={(sup) => setCalculatorState(prev => ({ ...prev, supportLevel: sup }))}
              projectType={calculatorState.projectType}
              lang={lang}
              currency={calculatorState.currency}
            />
          )}
          {calculatorState.currentStep === 4 && (
            <StepSummary
              key="step-summary"
              state={calculatorState}
              breakdown={breakdown}
              onEditStep={(step) => goToStep(step)}
              onProceedToContact={() => goToStep(5)}
              onOpenModal={() => setIsModalOpen(true)}
              lang={lang}
            />
          )}
          {calculatorState.currentStep === 5 && (
            <StepContact
              key="step-contact"
              state={calculatorState}
              breakdown={breakdown}
              onUpdateClientInfo={handleUpdateClientInfo}
              onReset={handleReset}
              lang={lang}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Floating Bottom Action & Pricing Bar */}
      {calculatorState.currentStep > 0 && calculatorState.currentStep < 6 && (
        <CalculatorFloatingBar
          currentStep={calculatorState.currentStep}
          totalSteps={5}
          totalPrice={breakdown.total}
          currency={calculatorState.currency}
          projectTypeName={selectedProjectTypeObj?.title[lang]}
          pageCount={calculatorState.pageCount}
          featuresCount={calculatorState.selectedFeatures.length}
          onBack={() => goToStep(Math.max(1, calculatorState.currentStep - 1))}
          onNext={() => goToStep(Math.min(5, calculatorState.currentStep + 1))}
          canProceed={canProceed}
          lang={lang}
        />
      )}

      {/* Results Popup / Modal */}
      <QuoteResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        state={calculatorState}
        breakdown={breakdown}
        lang={lang}
        onProceedToContact={() => {
          setIsModalOpen(false);
          goToStep(5);
        }}
      />
    </div>
  );
};
