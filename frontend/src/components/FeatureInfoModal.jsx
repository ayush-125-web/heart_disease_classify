import React, { useEffect } from 'react';
import { X, HeartPulse, AlertCircle, Bookmark, Compass, CheckCircle2 } from 'lucide-react';

export default function FeatureInfoModal({ feature, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!feature) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-red-500 p-6 text-white relative">
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/25 text-white">
              {feature.category}
            </span>
            <span className="text-xs text-rose-100 font-mono bg-rose-700/50 px-2 py-0.5 rounded">
              {feature.id} : {feature.type}
            </span>
          </div>

          <h3 className="text-2xl font-bold tracking-tight">
            {feature.label}
          </h3>
          <p className="text-rose-100 text-sm mt-1">
            {feature.shortDesc}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Detailed explanation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-rose-500" />
              What It Means
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {feature.fullDesc}
            </p>
          </div>

          {/* Clinical Significance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Clinical Significance in Heart Disease Risk
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/60">
              {feature.clinicalSignificance}
            </p>
          </div>

          {/* Reference range */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-sky-500" />
              Reference Range & Normal Targets
            </h4>
            <div className="bg-sky-50 text-sky-900 text-sm p-3.5 rounded-xl border border-sky-100 font-medium">
              {feature.referenceRange}
            </div>
          </div>

          {/* Value mappings if categorical */}
          {feature.valuesExplanation && feature.valuesExplanation.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-emerald-500" />
                Value Encodings Breakdown
              </h4>
              <div className="space-y-2">
                {feature.valuesExplanation.map((item) => (
                  <div key={item.value} className="p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-800 text-xs font-bold font-mono">
                        {item.value}
                      </span>
                      <span className="font-semibold text-slate-900 text-sm">{item.label}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 pl-8">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Click anywhere outside or press <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded shadow-sm">Esc</kbd> to close
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}

