
import { useState } from 'react';
import { ShieldAlert, CheckCircle2, X } from 'lucide-react';
import AIReport from './aiReport';

const baseAPIURL = import.meta.env.VITE_BACKEND_URL;

export default function PredictionResult({
  result,
  loading,
  onClose,
  payload,
  hasDisease
}) {
  const [isAIresAvail, setAIresAvail] = useState(false);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [res, setRes] = useState("");

  // Prefer the prediction saved in result
  const predictedDisease = result?.hasDisease ?? hasDisease;

  const handleClose = () => {
    setAIresAvail(false);
    onClose();
  };

  const genInsights = async () => {
    // Create a new object; don't mutate the original payload
    const aiPayload = {
      ...payload,
      hasDisease: predictedDisease
    };

    setIsGeneratingInsights(true);

    try {
      const response = await fetch(`${baseAPIURL}/ai-insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(aiPayload)
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      setRes(data.response);
      setAIresAvail(true);

    } catch (err) {
      console.error("AI insights error:", err);
      alert("Unable to generate AI insights. Please try again.");
    } finally {
      setIsGeneratingInsights(false);
    }
  };

  // 1. ML prediction loading
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
          <h3 className="text-lg font-bold text-slate-800">
            Processing Your Data...
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Analyzing your 13 health parameters with the model.
          </p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  // 2. AI report loading
  if (isGeneratingInsights) {
    return (
      <AIReport
        isAIresAvail={false}
        response=""
        onClose={handleClose}
      />
    );
  }

  // 3. AI report ready
  if (isAIresAvail) {
    return (
      <AIReport
        isAIresAvail={true}
        response={res}
        onClose={handleClose}
      />
    );
  }

  // 4. Normal prediction result
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 text-center">
          {predictedDisease ? (
            <div>
              <div className="w-24 h-24 mx-auto rounded-3xl bg-red-100 text-red-600 flex items-center justify-center mb-6">
                <ShieldAlert className="w-14 h-14" />
              </div>

              <h2 className="text-3xl font-extrabold text-red-600">
                You Have Heart Disease
              </h2>

              <p className="text-slate-600 text-sm mt-3">
                The model predicts the presence of heart disease based on your inputs.
              </p>
            </div>
          ) : (
            <div>
              <div className="w-24 h-24 mx-auto rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-14 h-14" />
              </div>

              <h2 className="text-3xl font-extrabold text-emerald-600">
                You Do Not Have Heart Disease
              </h2>

              <p className="text-slate-600 text-sm mt-3">
                The model predicts no presence of heart disease based on your inputs.
              </p>
            </div>
          )}

          <div className="mt-8 flex gap-4">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-2xl bg-red-600 text-white font-bold cursor-pointer"
            >
              Close Result
            </button>

            <button
              onClick={genInsights}
              className="w-full py-3 px-4 rounded-2xl bg-emerald-600 text-white font-bold cursor-pointer"
              disabled={isGeneratingInsights}
            >
              Generate AI Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
