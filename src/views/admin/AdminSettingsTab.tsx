import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { useRouter } from '../../context/RouterContext';
import {
  Download,
  Upload,
  RotateCcw,
  Check,
  AlertTriangle,
  Database,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const AdminSettingsTab: React.FC = () => {
  const { resetToDefaults, exportJSON, importJSON, saveStatus } = useData();
  const { navigate } = useRouter();
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [importSuccess, setImportSuccess] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      if (content) {
        const success = importJSON(content);
        setImportSuccess(success);
        setTimeout(() => setImportSuccess(null), 3000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Synchronization & Storage Card */}
      <div className="bg-[#00283A] border border-[#0a3d54] p-6 rounded-xl space-y-4">
        <div className="flex items-center gap-3 text-white">
          <Database className="w-5 h-5 text-[#70ba65]" />
          <h3 className="text-base font-bold">Synchronisation & Stockage</h3>
        </div>
        <p className="text-xs text-[#dedee0] leading-relaxed">
          Toutes les modifications apportées aux services, au calculateur, aux articles de blog, aux réalisations et aux traductions sont enregistrées instantanément et appliquées au front-end du site.
        </p>

        <div className="flex items-center gap-2 pt-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#70ba65] animate-pulse" />
          <span className="text-xs font-mono text-[#70ba65]">
            État du stockage : {saveStatus === 'saved' ? 'Synchronisé (LocalStorage actif)' : 'Sauvegarde en cours...'}
          </span>
        </div>
      </div>

      {/* Export & Import Backup */}
      <div className="bg-[#00283A] border border-[#0a3d54] p-6 rounded-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#70ba65]" />
          <span>Sauvegarde & Restauration des Données</span>
        </h3>
        <p className="text-xs text-[#919ca1] leading-relaxed">
          Vous pouvez télécharger une archive JSON complète contenant toutes vos modifications (services, devis, projets, traductions), ou importer une sauvegarde existante.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={exportJSON}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#02162B] border border-[#0a3d54] hover:border-[#70ba65] text-white text-xs font-bold rounded-lg transition-colors"
          >
            <Download className="w-4 h-4 text-[#70ba65]" />
            <span>Télécharger la Sauvegarde (JSON)</span>
          </button>

          <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#02162B] border border-[#0a3d54] hover:border-[#70ba65] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors">
            <Upload className="w-4 h-4 text-[#70ba65]" />
            <span>Importer une Sauvegarde JSON</span>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {importSuccess === true && (
          <div className="p-3 rounded-lg bg-[#70ba65]/10 border border-[#70ba65]/30 text-xs font-mono text-[#70ba65] flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Données importées et synchronisées avec succès !</span>
          </div>
        )}

        {importSuccess === false && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Erreur lors de la lecture du fichier JSON. Vérifiez le format.</span>
          </div>
        )}
      </div>

      {/* Danger Zone: Reset to Initial Data */}
      <div className="bg-[#00283A] border border-red-500/30 p-6 rounded-xl space-y-4">
        <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Zone de Réinitialisation</span>
        </h3>
        <p className="text-xs text-[#dedee0] leading-relaxed">
          Si vous souhaitez annuler toutes vos modifications personnalisées et restaurer le contenu initial du site (services par défaut, projets d'origine, tarifs de départ), cliquez ci-dessous.
        </p>

        <div>
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/40 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restaurer les données initiales d'usine</span>
          </button>
        </div>
      </div>

      {/* Reset confirmation modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#00283A] border border-red-500 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-white text-base">Restaurer les données d'usine ?</h3>
            </div>
            <p className="text-xs text-[#dedee0] leading-relaxed">
              Attention : Cette action écrasera toutes vos modifications personnalisées actuelles et remettra les données de départ. Êtes-vous sûr ?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-3 py-1.5 text-xs text-[#dedee0] bg-[#02162B] border border-[#0a3d54] rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  resetToDefaults();
                  setResetConfirmOpen(false);
                }}
                className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
              >
                Oui, tout réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
