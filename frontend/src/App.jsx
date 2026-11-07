import React, { useState } from 'react';
import { 
  Heart, 
  RotateCcw, 
  Settings, 
  Code2, 
  User, 
  Stethoscope, 
  Flame, 
  Microscope,
  Info,
  ArrowRight,
  Activity
} from 'lucide-react';

import { FEATURE_METADATA, SAMPLE_PROFILES } from './data/featureMetadata';
import FormField from './components/FormField';
import FeatureInfoModal from './components/FeatureInfoModal';
import PredictionResult from './components/PredictionResult';

const INITIAL_FORM_STATE = {
  age: "",
  sex: "",
  cp: "",
  trestbps: "",
  chol: "",
  fbs: "",
  restecg: "",
  thalach: "",
  exang: "",
  oldpeak: "",
  slope: "",
  ca: "",
  thal: "",
};


const baseAPIURL=import.meta.env.VITE_BACKEND_URL

export default function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [selectedFeatureInfo, setSelectedFeatureInfo] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [useMock, setUseMock] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);
  const [hasDisease,setHasDisease]=useState(false)

  const handleFieldChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value
    }));
    setActiveProfile(null);
  };

  // const handleLoadProfile = (profileKey) => {
  //   const profile = SAMPLE_PROFILES[profileKey];
  //   if (profile) {
  //     setFormData(profile.data);
  //     setActiveProfile(profileKey);
  //     setPredictionResult(null);
  //   }
  // };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setActiveProfile(null);
    setPredictionResult(null);
  };

  const payload = {
      age: parseInt(formData.age, 10),
      sex: parseInt(formData.sex, 10),
      cp: parseInt(formData.cp, 10),
      trestbps: parseInt(formData.trestbps, 10),
      chol: parseInt(formData.chol, 10),
      fbs: parseInt(formData.fbs, 10),
      restecg: parseInt(formData.restecg, 10),
      thalach: parseInt(formData.thalach, 10),
      exang: parseInt(formData.exang, 10),
      oldpeak: parseFloat(Number(formData.oldpeak).toFixed(2)),
      slope: parseInt(formData.slope, 10),
      ca: parseInt(formData.ca, 10),
      thal: parseInt(formData.thal, 10)
    };

  // Predict Handler
  const handlePredict = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);


    // If mock mode is explicitly selected
    if (useMock) {
      setTimeout(() => {
        // High risk criteria based on Cleveland dataset rules
        const isHigh = (payload.oldpeak >= 1.5 || payload.ca >= 1 || payload.thal === 3 || payload.exang === 1);
        setPredictionResult({ hasDisease: isHigh });
        setIsLoading(false);
      }, 500);
      return;
    }

    // Try calling the FastAPI /report backend
    try {
      const response = await fetch(`${baseAPIURL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      
      // Parse backend output: [1] / [0] or 1 / 0 or { prediction: 1 }
      let hasDisease = false;
      if (data && typeof data === 'object') {
        if(data.prediction==1) setHasDisease(true)
        else setHasDisease(false)
        
      } 

      setPredictionResult({ hasDisease });
    } catch (err) {
      console.warn("Backend call failed or not running, falling back to simulated inference:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-md shadow-rose-200">
              <Heart className="w-5 h-5 fill-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-900 tracking-tight">Heart Disease Predictor</h1>
                <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  ML Model
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Predict whether user has heart disease or not based on 13 inputs
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* Banner with instructions and sample profile buttons */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Heart Disease Prediction Model
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Fill in the 13 health parameters below. Click the <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white/20 text-white font-semibold text-xs"><Info className="w-3.5 h-3.5 inline mr-1" /> info icon</span> beside any input box to see what that input is about, its meaning, and reference values.
            </p>
          </div>
        </section>

        {/* 13 Feature Inputs Form */}
        <form onSubmit={handlePredict} className="space-y-8">
          
          {/* Section 1: Demographics & Symptoms */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">1. Demographics & Symptoms</h3>
                <p className="text-xs text-slate-500">Age, Sex, and Chest Pain Type</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                feature={FEATURE_METADATA.age}
                value={formData.age}
                onChange={handleFieldChange}
                onOpenInfo={setSelectedFeatureInfo}
              />
              <FormField
                feature={FEATURE_METADATA.sex}
                value={formData.sex}
                onChange={handleFieldChange}
                onOpenInfo={setSelectedFeatureInfo}
              />
              <FormField
                feature={FEATURE_METADATA.cp}
                value={formData.cp}
                onChange={handleFieldChange}
                onOpenInfo={setSelectedFeatureInfo}
              />
            </div>
          </div>

          {/* Section 2: Resting Vitals & Blood Tests */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">2. Resting Vitals & Lab Tests</h3>
                <p className="text-xs text-slate-500">Resting Blood Pressure, Serum Cholesterol, and Fasting Blood Sugar</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                feature={FEATURE_METADATA.trestbps}
                value={formData.trestbps}
                onChange={handleFieldChange}
                onOpenInfo={setSelectedFeatureInfo}
              />
              <FormField
                feature={FEATURE_METADATA.chol}
                value={formData.chol}
                onChange={handleFieldChange}
                onOpenInfo={setSelectedFeatureInfo}
              />
              <FormField
                feature={FEATURE_METADATA.fbs}
                value={formData.fbs}
                onChange={handleFieldChange}
                onOpenInfo={setSelectedFeatureInfo}
              />
            </div>
          </div>

          {/* Section 3: Stress Test & ECG */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">3. ECG & Stress Test Indicators</h3>
                <p className="text-xs text-slate-500">Resting ECG, Max Heart Rate, Exercise Angina, ST Depression (Oldpeak), and Slope</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                feature={FEATURE_METADATA.restecg}
                value={formData.restecg}
                onChange={handleFieldChange}
                onOpenInfo={setSelectedFeatureInfo}
              />
              <FormField
                feature={FEATURE_METADATA.thalach}
                value={formData.thalach}
                onChange={handleFieldChange}
                onOpenInfo={setSelectedFeatureInfo}
              />
              <FormField
                feature={FEATURE_METADATA.exang}
                value={formData.exang}
                onChange={handleFieldChange}
                onOpenInfo={setSelectedFeatureInfo}
              />
              <FormField
                feature={FEATURE_METADATA.oldpeak}
                value={formData.oldpeak}
                onChange={handleFieldChange}
                onOpenInfo={setSelectedFeatureInfo}
              />
              <FormField
                feature={FEATURE_METADATA.slope}
                value={formData.slope}
                onChange={handleFieldChange}
                onOpenInfo={setSelectedFeatureInfo}
              />
            </div>
          </div>

          {/* Section 4: Angiography & Nuclear Scan */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                <Microscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">4. Fluoroscopy & Thalassemia</h3>
                <p className="text-xs text-slate-500">Number of Major Vessels and Thalassemia defect status</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                feature={FEATURE_METADATA.ca}
                value={formData.ca}
                onChange={handleFieldChange}
                onOpenInfo={setSelectedFeatureInfo}
              />
              <FormField
                feature={FEATURE_METADATA.thal}
                value={formData.thal}
                onChange={handleFieldChange}
                onOpenInfo={setSelectedFeatureInfo}
              />
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xl flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-medium">
              Click the <strong className="text-slate-700">Predict</strong> button to see if you have heart disease or not.
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 sm:flex-none px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Reset
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 sm:flex-none px-7 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold text-sm shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-white" />
                    Predict Heart Disease
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>

      {/* POPUP RESULT: ONLY tells either "You Have Heart Disease" or "You Do Not Have Heart Disease" */}
      <PredictionResult 
        result={predictionResult} 
        loading={isLoading} 
        setIsLoading={setIsLoading}
        onClose={() => setPredictionResult(null)} 
        payload={payload}
        hasDisease={hasDisease}
      />

      {/* Feature Information Modal when an info icon is clicked */}
      {selectedFeatureInfo && (
        <FeatureInfoModal
          feature={selectedFeatureInfo}
          onClose={() => setSelectedFeatureInfo(null)}
        />
      )}
    </div>
  );
}
