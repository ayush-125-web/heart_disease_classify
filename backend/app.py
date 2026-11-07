from fastapi import FastAPI # type: ignore[import-untyped]
import joblib  # type: ignore[import-untyped]
from pydantic import BaseModel  # type: ignore[import-untyped]
import numpy as np   # type: ignore[import-untyped]
import pandas as pd   # type: ignore[import-untyped]
from fastapi.middleware.cors import CORSMiddleware # type: ignore[import-untyped]
from llmmodel import genAIResponse




class PatientSchema(BaseModel):
    age:int
    sex:int
    cp:int
    trestbps:int
    chol:int
    fbs:int
    restecg:int
    thalach:int
    exang:int
    oldpeak:float
    slope:int
    ca:int
    thal:int	


class InsightsSchema(PatientSchema):
    hasDisease: bool

app=FastAPI()





origins = [
    "http://localhost:3000",  # React Vite frontend
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load("heart_disease_model.pkl")
scaler = joblib.load("scaler.pkl")
columns=joblib.load('data_column.pkl')

# print(columns)

@app.post('/predict')
def getPrediction(patientInfo:PatientSchema):
    df=pd.DataFrame([patientInfo.model_dump()])
    print(type(patientInfo))

    df = pd.get_dummies(df,columns=['cp', 'restecg', 'slope', 'thal'])
    df = df.reindex(columns=columns, fill_value=0)

    for col in columns:
        if col!='oldpeak':
            df[col]=df[col].astype(int)

    scaleColumns=['age','trestbps',	'chol','thalach']

    df[scaleColumns]=scaler.transform(df[scaleColumns])
    prediction=model.predict(df)
    

    print(prediction)
    

    return {
        "prediction": int(prediction[0]),
    }


@app.post('/ai-insights')
def genAIInsights(infoForInsight:InsightsSchema):
    response=genAIResponse(infoForInsight.model_dump())
    return {
        "response":response.text
    }


