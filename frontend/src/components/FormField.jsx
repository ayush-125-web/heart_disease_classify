import React from 'react';
import { Info, HelpCircle } from 'lucide-react';

export default function FormField({ 
  feature, 
  value, 
  onChange, 
  onOpenInfo,
  hasError
}) {
  const isCategorical = Boolean(feature.valuesExplanation);
  
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group">
      {/* Label and Info Icon Row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <label 
              htmlFor={feature.id} 
              className="text-sm font-bold text-slate-800 cursor-pointer group-hover:text-rose-600 transition-colors"
            >
              {feature.label}
            </label>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
              {feature.id}
            </span>
          </div>
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5" title={feature.shortDesc}>
            {feature.shortDesc}
          </p>
        </div>

        {/* CLICKABLE INFO ICON BESIDE THE INPUT */}
        <button
          type="button"
          onClick={() => onOpenInfo(feature)}
          title={`Click to learn more about ${feature.label} (${feature.id})`}
          aria-label={`Learn what ${feature.label} means`}
          className="relative inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30 transition-all duration-150 group/info flex-shrink-0"
        >
          <Info className="w-4 h-4 text-slate-500 group-hover/info:text-rose-600 transition-colors" />
          <span className="sr-only">What is {feature.label}?</span>
          
          {/* Subtle tooltip hint */}
          <span className="absolute -bottom-8 right-0 pointer-events-none hidden group-hover/info:block z-20 whitespace-nowrap bg-slate-900 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-lg">
            Click for info
          </span>
        </button>
      </div>

      {/* Input Control Box */}
      <div className="mt-3">
        {isCategorical ? (
          /* Categorical Dropdown / Select */
          <div className="relative">
            <select
              id={feature.id}
              name={feature.id}
              value={value}
              onChange={(e) => onChange(feature.id, Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all cursor-pointer"
            >
              <option key="" value="">Select Your Option</option>
              {feature.valuesExplanation.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          /* Continuous Number / Float Input */
          <div className="relative flex items-center">
            <input
              type="number"
              id={feature.id}
              name={feature.id}
              value={value === '' ? '' : value}
              step={feature.step || 1}
              min={feature.min}
              max={feature.max}
              placeholder={feature.placeholder}
              required={true}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  onChange(feature.id, '');
                } else {
                  onChange(feature.id, feature.type === 'float' ? parseFloat(val) : parseInt(val, 10));
                }
              }}
              className={`w-full bg-slate-50 border ${
                hasError ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
              } rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all`}
            />
            {feature.unit && (
              <span className="absolute right-3.5 text-xs font-medium text-slate-400 pointer-events-none">
                {feature.unit}
              </span>
            )}
          </div>
        )}

        {/* Quick Range / Unit Indicator at bottom */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
          <span>Type: <strong className="font-mono text-slate-600">{feature.type}</strong></span>
          {feature.min !== undefined && feature.max !== undefined && (
            <span>Range: {feature.min} - {feature.max} {feature.unit || ''}</span>
          )}
          {isCategorical && (
            <span>{feature.valuesExplanation.length} choices</span>
          )}
        </div>
      </div>
    </div>
  );
}

