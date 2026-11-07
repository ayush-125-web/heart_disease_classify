# CardioSense AI - Heart Disease Prediction Frontend

A modern, responsive React + Tailwind CSS web interface built for Heart Disease Machine Learning Prediction models.

## ✨ Features

- **Interactive Feature Explainability**: Every single input box has a dedicated, clickable **Info Icon (`i`)** beside it. Clicking it opens a comprehensive clinical explanation including:
  - What the metric measures in plain language
  - Its clinical significance in cardiovascular disease
  - Normal vs. pathological reference ranges (AHA / ACC guidelines)
  - Detailed breakdown of each integer/categorical code
- **Strictly Typed Input Model**: Handles all 13 canonical UCI Cleveland Heart Disease dataset features:
  1. `age` (int) - Age in years
  2. `sex` (int) - Biological sex (1 = Male, 0 = Female)
  3. `cp` (int) - Chest pain type (0-3)
  4. `trestbps` (int) - Resting blood pressure in mm Hg
  5. `chol` (int) - Serum cholesterol in mg/dl
  6. `fbs` (int) - Fasting blood sugar > 120 mg/dl (1 = True, 0 = False)
  7. `restecg` (int) - Resting ECG findings (0-2)
  8. `thalach` (int) - Maximum heart rate achieved (bpm)
  9. `exang` (int) - Exercise induced angina (1 = Yes, 0 = No)
  10. `oldpeak` (float) - ST depression induced by exercise (mm)
  11. `slope` (int) - Slope of peak exercise ST segment (0-2)
  12. `ca` (int) - Number of major vessels colored by fluoroscopy (0-3)
  13. `thal` (int) - Thalassemia defect status (1-3)
- **1-Click Sample Patient Profiles**: Instant test buttons for **Low Risk**, **High Risk**, and **Moderate Risk** profiles.
- **Backend Ready & Simulated Mode**: Seamlessly works out-of-the-box with a realistic simulated clinical inference engine, or connects via POST request to your Python ML backend (FastAPI / Flask / Django).
- **JSON Inspector**: Inspect and copy the exact JSON payload sent to your ML endpoint.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Connecting to Your Python Backend (Flask / FastAPI)
By default, the app can send a POST request with the JSON payload to `http://localhost:5000/predict` (customizable in the API Settings modal).

Example FastAPI endpoint:
```python
from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI()

class PatientData(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

@app.post("/predict")
def predict(data: PatientData):
    features = np.array([[
        data.age, data.sex, data.cp, data.trestbps, data.chol,
        data.fbs, data.restecg, data.thalach, data.exang,
        data.oldpeak, data.slope, data.ca, data.thal
    ]])
    prediction = model.predict(features)[0] # 0 or 1
    probability = model.predict_proba(features)[0][1] # risk probability
    return {
        "prediction": int(prediction),
        "probability": float(probability)
    }
```

