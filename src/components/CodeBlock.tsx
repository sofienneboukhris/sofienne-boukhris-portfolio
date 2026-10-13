import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  lang?: 'fr' | 'en';
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  filename,
  lang = 'fr',
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    const textToCopy = code.trim();
    let success = false;

    // Modern asynchronous clipboard API
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        success = true;
      }
    } catch (err) {
      console.warn('navigator.clipboard failed, attempting fallback...', err);
    }

    // Fallback for iframe restrictions or older browsers
    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.setAttribute('readonly', '');
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (fallbackErr) {
        console.error('Fallback clipboard execution failed:', fallbackErr);
      }
    }

    if (success) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2400);
    }
  };

  const copyLabel = copied
    ? lang === 'fr'
      ? 'Copié !'
      : 'Copied!'
    : lang === 'fr'
    ? 'Copier le code'
    : 'Copy Code';

  return (
    <div
      className={`relative my-6 rounded-xl overflow-hidden border transition-all duration-300 group/code bg-[#02162B] ${
        copied
          ? 'border-[#70ba65] shadow-[0_0_16px_rgba(112,186,101,0.25)]'
          : 'border-[#0a3d54]/70 hover:border-[#0a3d54] shadow-lg'
      }`}
      data-code-block="true"
    >
      {/* Code Block Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#00283A] border-b border-[#0a3d54]/70 select-none">
        {/* Terminal Controls & Language / Filename */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/60 border border-[#ef4444]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]/60 border border-[#eab308]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#70ba65]/60 border border-[#70ba65]/80" />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-[#a8b4b9]">
            <Terminal className="w-3.5 h-3.5 text-[#70ba65]" />
            <span className="font-semibold text-white">
              {filename || language.toUpperCase()}
            </span>
            {filename && language && (
              <span className="text-[10px] text-[#70ba65] bg-[#02162B] px-1.5 py-0.5 rounded border border-[#0a3d54]">
                {language}
              </span>
            )}
          </div>
        </div>

        {/* 'Copy Code' Action Button with visual feedback */}
        <button
          type="button"
          onClick={handleCopy}
          id={`copy-code-btn-${language}`}
          aria-label={copyLabel}
          title={copyLabel}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#70ba65]/50 print:hidden ${
            copied
              ? 'bg-[#70ba65]/20 text-[#70ba65] border border-[#70ba65]/50 scale-105'
              : 'bg-[#02162B] text-[#a8b4b9] hover:text-white hover:bg-[#00151F] border border-[#0a3d54] hover:border-[#70ba65]/60'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#70ba65] stroke-[2.5]" />
              <span className="font-bold text-[#70ba65]">{copyLabel}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 group-hover/code:text-[#70ba65] transition-colors" />
              <span>{copyLabel}</span>
            </>
          )}
        </button>
      </div>

      {/* Semantic pre & code elements */}
      <pre
        className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-[#dedee0] leading-relaxed scrollbar-thin scrollbar-thumb-[#0a3d54] scrollbar-track-transparent bg-[#02162B]/80"
        tabIndex={0}
      >
        <code className={`language-${language} block whitespace-pre`}>
          {code}
        </code>
      </pre>

      {/* Copy visual pulse indicator on bottom edge */}
      <div
        className={`h-[2px] transition-all duration-500 ${
          copied
            ? 'w-full bg-gradient-to-r from-[#15803d] via-[#70ba65] to-[#86efac]'
            : 'w-0 bg-transparent'
        }`}
      />
    </div>
  );
};
