from fastapi import FastAPI # type: ignore[import-untyped]
import joblib  # type: ignore[import-untyped]
from pydantic import BaseModel  # type: ignore[import-untyped]
import numpy as np   # type: ignore[import-untyped]
import pandas as pd   # type: ignore[import-untyped]



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

app=FastAPI()

model = joblib.load("heart_disease_model.pkl")
scaler = joblib.load("scaler.pkl")
columns=joblib.load('data_column.pkl')

# print(columns)

@app.post('/report')
def getPrediction(patientInfo:PatientSchema):
    df=pd.DataFrame([patientInfo.model_dump()])

    df = pd.get_dummies(df,columns=['cp', 'restecg', 'slope', 'thal'])
    df = df.reindex(columns=columns, fill_value=0)

    for col in columns:
        if col!='oldpeak':
            df[col]=df[col].astype(int)

    scaleColumns=['age','trestbps',	'chol','thalach']

    df[scaleColumns]=scaler.transform(df[scaleColumns])
    prediction=model.predict(df)
    

    return prediction

