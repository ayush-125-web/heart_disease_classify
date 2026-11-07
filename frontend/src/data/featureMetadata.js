export const FEATURE_METADATA = {
  age: {
    id: "age",
    label: "Age",
    type: "int",
    unit: "years",
    category: "Demographics",
    shortDesc: "Patient's chronological age in years.",
    fullDesc: "Age is one of the strongest unmodifiable risk factors for cardiovascular disease. The risk of coronary heart disease increases significantly with advancing age as coronary arteries naturally narrow and stiffen over time.",
    clinicalSignificance: "Men ≥ 45 years and women ≥ 55 years (or post-menopausal) are at substantially higher risk of atherosclerotic cardiovascular disease (ASCVD).",
    referenceRange: "Adult population: 18 - 100 years. Dataset typically ranges 29 - 77 years.",
    valuesExplanation: null, // continuous
    min: 18,
    max: 100,
    defaultValue: 54,
    placeholder: "e.g. 54"
  },
  sex: {
    id: "sex",
    label: "Sex / Gender",
    type: "int",
    unit: "binary code",
    category: "Demographics",
    shortDesc: "Biological sex assigned at birth (1 = Male, 0 = Female).",
    fullDesc: "Biological sex influences cardiovascular risk profiles. Estrogen generally confers cardioprotective benefits to pre-menopausal women, while males generally present with earlier onset of coronary artery disease.",
    clinicalSignificance: "Historically, males have a higher incidence of myocardial infarction at a younger age. Post-menopausal females experience an accelerated rise in cardiovascular risk.",
    referenceRange: "Binary value: 1 (Male) or 0 (Female)",
    valuesExplanation: [
      { value: 1, label: "Male (1)", desc: "Biological male patient." },
      { value: 0, label: "Female (0)", desc: "Biological female patient." }
    ],
    defaultValue: 1
  },
  cp: {
    id: "cp",
    label: "Chest Pain Type (cp)",
    type: "int",
    unit: "category code (0-3)",
    category: "Symptoms & History",
    shortDesc: "Clinical categorization of chest pain or discomfort experienced by the patient.",
    fullDesc: "Chest pain is evaluated based on location, radiation, relation to physical exertion, and relief with rest or nitroglycerin. Angina results from myocardial ischemia when cardiac oxygen demand exceeds coronary blood supply.",
    clinicalSignificance: "Typical angina strongly points toward coronary obstruction, while asymptomatic presentations (silent ischemia) in high-risk patients can also carry high prognostic danger.",
    referenceRange: "Categorical scale 0 to 3 (UCI Cleveland standard):",
    valuesExplanation: [
      { value: 0, label: "0: Typical Angina", desc: "Substernal chest discomfort precipitated by physical or emotional stress, relieved by rest or nitroglycerin." },
      { value: 1, label: "1: Atypical Angina", desc: "Meets 2 of the 3 characteristics of typical angina; often burning, sharp, or atypical location." },
      { value: 2, label: "2: Non-Anginal Pain", desc: "Meets only 1 or none of the classic angina criteria; often musculoskeletal or gastrointestinal origin." },
      { value: 3, label: "3: Asymptomatic", desc: "No subjective chest pain reported; however, severe ischemic disease may still be present silently." }
    ],
    defaultValue: 0
  },
  trestbps: {
    id: "trestbps",
    label: "Resting Blood Pressure (trestbps)",
    type: "int",
    unit: "mm Hg",
    category: "Vitals & Clinical Measures",
    shortDesc: "Resting systolic blood pressure measured in mm Hg upon hospital admission.",
    fullDesc: "Systolic blood pressure reflects the maximum pressure exerted against arterial walls during ventricular contraction. Chronic elevation leads to arterial wall remodeling, endothelial damage, and increased left ventricular workload.",
    clinicalSignificance: "Hypertension is a primary etiology of coronary artery disease, heart failure, and stroke. Sustained BP above 130/80 mm Hg warrants clinical intervention.",
    referenceRange: "Normal: < 120 mm Hg | Elevated: 120-129 | Stage 1 HTN: 130-139 | Stage 2 HTN: ≥ 140 mm Hg",
    valuesExplanation: null,
    min: 80,
    max: 220,
    defaultValue: 130,
    placeholder: "e.g. 130"
  },
  chol: {
    id: "chol",
    label: "Serum Cholesterol (chol)",
    type: "int",
    unit: "mg/dl",
    category: "Laboratory Tests",
    shortDesc: "Total serum cholesterol concentration in mg/dl.",
    fullDesc: "Total cholesterol includes low-density lipoproteins (LDL), high-density lipoproteins (HDL), and very-low-density lipoproteins (VLDL). Circulating excess lipids promote atheromatous plaque formation inside coronary arteries.",
    clinicalSignificance: "Elevated serum cholesterol (> 200 mg/dl), particularly elevated LDL-C, directly accelerates atherosclerosis, creating vulnerable plaques prone to rupture and occlusion.",
    referenceRange: "Desirable: < 200 mg/dl | Borderline high: 200 - 239 mg/dl | High: ≥ 240 mg/dl",
    valuesExplanation: null,
    min: 100,
    max: 600,
    defaultValue: 240,
    placeholder: "e.g. 240"
  },
  fbs: {
    id: "fbs",
    label: "Fasting Blood Sugar > 120 mg/dl (fbs)",
    type: "int",
    unit: "binary flag (0 or 1)",
    category: "Laboratory Tests",
    shortDesc: "Flag indicating whether fasting plasma glucose exceeds 120 mg/dl (approx. 6.7 mmol/L).",
    fullDesc: "Fasting blood sugar measures plasma glucose after at least 8 hours of fasting. Values above 126 mg/dl criteria diagnose diabetes mellitus, while 100-125 indicates pre-diabetes.",
    clinicalSignificance: "Diabetes and pre-diabetes double to quadruple cardiovascular morbidity. Hyperglycemia induces chronic microvascular and macrovascular inflammation, oxidative stress, and premature vascular stiffening.",
    referenceRange: "0 = Fasting Blood Sugar ≤ 120 mg/dl (Normal) | 1 = Fasting Blood Sugar > 120 mg/dl (Elevated / Diabetic)",
    valuesExplanation: [
      { value: 0, label: "0: False (≤ 120 mg/dl)", desc: "Normal fasting blood sugar level." },
      { value: 1, label: "1: True (> 120 mg/dl)", desc: "Elevated fasting glucose indicating insulin resistance or diabetes." }
    ],
    defaultValue: 0
  },
  restecg: {
    id: "restecg",
    label: "Resting Electrocardiogram (restecg)",
    type: "int",
    unit: "category code (0-2)",
    category: "Diagnostic Tests",
    shortDesc: "Resting 12-lead electrocardiographic findings.",
    fullDesc: "A resting ECG records the electrical conduction pathways of the heart at rest. It can reveal conduction blocks, prior infarctions, ischemic ST-T changes, or structural remodeling such as ventricular hypertrophy.",
    clinicalSignificance: "Resting ST-T wave abnormalities and Left Ventricular Hypertrophy (LVH) strongly correlate with long-standing hypertension, coronary ischemia, and heightened risk of sudden cardiac death.",
    referenceRange: "Categories: 0 (Normal), 1 (ST-T wave abnormality), 2 (Left Ventricular Hypertrophy)",
    valuesExplanation: [
      { value: 0, label: "0: Normal", desc: "No pathological ST-segment or T-wave abnormalities observed on baseline ECG." },
      { value: 1, label: "1: ST-T Wave Abnormality", desc: "Inversion of T wave and/or ST elevation/depression > 0.05 mV indicating ischemia or strain." },
      { value: 2, label: "2: Left Ventricular Hypertrophy (LVH)", desc: "Showing probable or definite LVH by Estes' criteria or Sokolow-Lyon voltage criteria." }
    ],
    defaultValue: 1
  },
  thalach: {
    id: "thalach",
    label: "Max Heart Rate Achieved (thalach)",
    type: "int",
    unit: "beats per minute (bpm)",
    category: "Cardiac Stress Test",
    shortDesc: "Maximum heart rate achieved during a treadmill or bicycle exercise stress test.",
    fullDesc: "During graded physical exercise, cardiac output must increase by elevating heart rate and stroke volume. The maximum predicted heart rate is roughly estimated as 220 minus age.",
    clinicalSignificance: "Failure to achieve 85% of age-predicted maximum heart rate (chronotropic incompetence) is an independent predictor of adverse cardiovascular events and occult coronary ischemia.",
    referenceRange: "Typical stress test range: 70 - 210 bpm. Age-predicted target ~ (220 - Age).",
    valuesExplanation: null,
    min: 60,
    max: 220,
    defaultValue: 150,
    placeholder: "e.g. 150"
  },
  exang: {
    id: "exang",
    label: "Exercise Induced Angina (exang)",
    type: "int",
    unit: "binary flag (0 or 1)",
    category: "Cardiac Stress Test",
    shortDesc: "Whether the patient developed angina/chest pain during physical exertion.",
    fullDesc: "Angina that reproduces specifically during physical stress indicates that increased myocardial oxygen demand outstrips coronary perfusion capacity through stenosed arterial segments.",
    clinicalSignificance: "Exercise-induced angina is a strong clinical indicator of hemodynamically significant coronary artery stenosis requiring further angiographic evaluation.",
    referenceRange: "0 = No angina during exercise | 1 = Yes, angina occurred during exercise",
    valuesExplanation: [
      { value: 0, label: "0: No", desc: "No chest discomfort experienced during stress testing." },
      { value: 1, label: "1: Yes", desc: "Patient experienced characteristic chest tightness or pain during exercise." }
    ],
    defaultValue: 0
  },
  oldpeak: {
    id: "oldpeak",
    label: "ST Depression Induced by Exercise (oldpeak)",
    type: "float",
    unit: "millivolts (mm/mV)",
    category: "Cardiac Stress Test",
    shortDesc: "ST segment depression induced by exercise relative to resting baseline.",
    fullDesc: "On an ECG, the ST segment represents the period between ventricular depolarization and repolarization. Subendocardial ischemia leads to a transient voltage differential manifested as ST segment depression.",
    clinicalSignificance: "ST depression ≥ 1.0 mm (0.1 mV) that is horizontal or downsloping is the hallmark electrocardiographic indicator of exercise-induced myocardial ischemia.",
    referenceRange: "Normal: 0.0 mm | Mild ischemia: 0.5 - 1.5 mm | Severe ischemia: > 2.0 mm",
    valuesExplanation: null,
    min: 0.0,
    max: 6.5,
    step: 0.1,
    defaultValue: 1.2,
    placeholder: "e.g. 1.2"
  },
  slope: {
    id: "slope",
    label: "Slope of Peak Exercise ST Segment (slope)",
    type: "int",
    unit: "category code (0-2)",
    category: "Cardiac Stress Test",
    shortDesc: "The geometric slope of the ST segment at peak exercise stress.",
    fullDesc: "The morphology of the ST segment slope at peak exertion differentiates benign physiologic changes from true myocardial ischemia.",
    clinicalSignificance: "Horizontal (Flat) or Downsloping ST depression carries a high positive predictive value for severe multivessel coronary artery disease compared to rapid upsloping ST segments.",
    referenceRange: "Standard dataset encoding: 0 (Upsloping), 1 (Flat), 2 (Downsloping)",
    valuesExplanation: [
      { value: 0, label: "0: Upsloping", desc: "ST segment ascends rapidly toward baseline; usually benign or lowest risk." },
      { value: 1, label: "1: Flat (Horizontal)", desc: "ST segment remains flat; strongly indicative of subendocardial ischemia." },
      { value: 2, label: "2: Downsloping", desc: "ST segment slopes downward; associated with the highest risk of severe coronary disease." }
    ],
    defaultValue: 1
  },
  ca: {
    id: "ca",
    label: "Number of Major Vessels Colored (ca)",
    type: "int",
    unit: "vessels count (0-3)",
    category: "Fluoroscopy / Angiography",
    shortDesc: "Number of major coronary vessels (0-3) visualized with contrast dye during fluoroscopy.",
    fullDesc: "Coronary fluoroscopy with radiopaque dye highlights coronary arteries (Left Anterior Descending, Circumflex, and Right Coronary Artery). Blocked or heavily calcified vessels fail to fill smoothly with contrast dye.",
    clinicalSignificance: "The count of obstructed or abnormal major vessels (0 to 3) directly correlates with coronary disease burden, surgical revascularization urgency, and long-term mortality.",
    referenceRange: "Integer from 0 to 3 (some variations include 4 as unmeasured/abnormal)",
    valuesExplanation: [
      { value: 0, label: "0 Vessels", desc: "Zero major vessels showing fluoroscopic dye obstruction (Clear/Healthy)." },
      { value: 1, label: "1 Vessel", desc: "One major coronary vessel with noticeable dye filling defect or stenosis." },
      { value: 2, label: "2 Vessels", desc: "Two major coronary vessels exhibiting obstruction (Bivessel disease)." },
      { value: 3, label: "3 Vessels", desc: "Three major coronary vessels affected (Trivessel disease - High clinical risk)." }
    ],
    defaultValue: 0
  },
  thal: {
    id: "thal",
    label: "Thalassemia / Nuclear Stress Test (thal)",
    type: "int",
    unit: "category code (1-3)",
    category: "Nuclear Scintigraphy",
    shortDesc: "Myocardial perfusion scintigraphy defect status (Thallium-201 stress test).",
    fullDesc: "Thallium-201 nuclear stress scintigraphy evaluates blood perfusion to the heart muscle during stress and after a redistribution rest period. It determines whether heart tissue is viable, ischemic, or permanently scarred.",
    clinicalSignificance: "Reversible defects signify living heart tissue suffering from inducible ischemia (salvageable with stents or bypass). Fixed defects indicate previous myocardial infarction (scar tissue).",
    referenceRange: "UCI dataset encoding: 1 (Normal), 2 (Fixed Defect), 3 (Reversible Defect)",
    valuesExplanation: [
      { value: 1, label: "1: Normal Perfusion", desc: "Uniform radioisotope uptake across all cardiac walls during stress and rest." },
      { value: 2, label: "2: Fixed Defect", desc: "No perfusion at stress and no reperfusion at rest; indicates permanent myocardial scar tissue (old infarction)." },
      { value: 3, label: "3: Reversible Defect", desc: "Defect during exercise stress that reperfuses at rest; indicates inducible ischemia in living myocardium." }
    ],
    defaultValue: 2
  }
};

export const SAMPLE_PROFILES = {
  healthy: {
    name: "Low Risk Profile",
    subtitle: "Younger adult with optimal vitals & clear cardiac diagnostics",
    data: {
      age: 38,
      sex: 0,
      cp: 2,
      trestbps: 115,
      chol: 175,
      fbs: 0,
      restecg: 0,
      thalach: 175,
      exang: 0,
      oldpeak: 0.0,
      slope: 0,
      ca: 0,
      thal: 1
    }
  },
  highRisk: {
    name: "High Risk Profile",
    subtitle: "Senior male with hypertension, ST depression & multi-vessel involvement",
    data: {
      age: 63,
      sex: 1,
      cp: 0,
      trestbps: 152,
      chol: 295,
      fbs: 1,
      restecg: 2,
      thalach: 122,
      exang: 1,
      oldpeak: 2.8,
      slope: 2,
      ca: 2,
      thal: 3
    }
  },
  borderline: {
    name: "Moderate Risk Profile",
    subtitle: "Middle-aged patient with borderline cholesterol and mild ST depression",
    data: {
      age: 55,
      sex: 1,
      cp: 1,
      trestbps: 135,
      chol: 245,
      fbs: 0,
      restecg: 1,
      thalach: 148,
      exang: 0,
      oldpeak: 1.4,
      slope: 1,
      ca: 1,
      thal: 2
    }
  }
};

