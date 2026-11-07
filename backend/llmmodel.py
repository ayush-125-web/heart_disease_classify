from dotenv import load_dotenv  # type: ignore[import-not-found]
from langchain_google_genai import ChatGoogleGenerativeAI  # type: ignore[import-not-found]

load_dotenv()

model = ChatGoogleGenerativeAI(model="gemini-3.7-flash")

def genPromptTemplate(detail_insight):
    prompt = f"""
    You are an AI-powered cardiovascular health information assistant.
    Analyze the patient's health parameters and ML model prediction
    to generate meaningful, understandable health insights.
    Keep the tone such that u are talking to the user and telling consequences and suggesting advice

    PATIENT HEALTH PARAMETERS:

    1. Age: {detail_insight['age']}
       - Patient's age in years.

    2. Sex: {detail_insight['sex']}
       - 1 = Male, 0 = Female.

    3. Chest Pain Type (cp): {detail_insight['cp']}
       - 0 = Typical angina.
       - 1 = Atypical angina.
       - 2 = Non-anginal pain.
       - 3 = Asymptomatic.

    4. Resting Blood Pressure (trestbps): {detail_insight['trestbps']}
       - Resting blood pressure measured in mmHg.

    5. Serum Cholesterol (chol): {detail_insight['chol']}
       - Serum cholesterol measured in mg/dL.

    6. Fasting Blood Sugar (fbs): {detail_insight['fbs']}
       - 1 = Above 120 mg/dL.
       - 0 = 120 mg/dL or below.

    7. Resting ECG (restecg): {detail_insight['restecg']}
       - 0 = Normal.
       - 1 = ST-T wave abnormality.
       - 2 = Left ventricular hypertrophy.

    8. Maximum Heart Rate (thalach): {detail_insight['thalach']}
       - Maximum heart rate achieved during exercise, in bpm.

    9. Exercise-Induced Angina (exang): {detail_insight['exang']}
       - 1 = Yes.
       - 0 = No.

    10. Oldpeak: {detail_insight['oldpeak']}
        - ST depression induced by exercise relative to rest.

    11. Slope: {detail_insight['slope']}
        - 0 = Upsloping.
        - 1 = Flat.
        - 2 = Downsloping.

    12. Major Vessels (ca): {detail_insight['ca']}
        - Number of major vessels colored by fluoroscopy (0-3).

    13. Thalassemia (thal): {detail_insight['thal']}
        - Thalassemia-related test category.
        - Interpret according to the dataset's encoding.

    ML MODEL RESULTS:

    - Predicted Class: {int(detail_insight['hasDisease'])}
    - Has Heart Disease if Predicted Class is 1
    - does not  have Heart Disease if Predicted Class is 0
    

    YOUR TASK:

    Generate a comprehensive but easy-to-understand health
    insights report covering:

    1. Prediction Explanation:
       Explain what the ML model's output means.

    2. Parameter Analysis:
       Identify relevant parameters and explain their
       potential significance for cardiovascular health.

    3. Potential Risk Factors:
       Highlight combinations of parameters that may
       deserve further clinical evaluation.

    4. Health Recommendations:
       Suggest general lifestyle improvements related
       to cardiovascular health.

    5. Next Steps:
       Explain what the patient should discuss with
       a qualified healthcare professional.

    IMPORTANT INSTRUCTIONS:

    - Do not diagnose the patient.
    - Do not treat ML predictions as confirmed medical facts.
    - Model probability is not necessarily actual clinical risk.
    - Do not invent missing medical information.
    - Do not assume abnormal parameters automatically
      indicate heart disease.
    - Do not recommend medicines or treatments.
    - Use simple, supportive and understandable language.
    - Clearly distinguish model predictions from clinical findings.
    - If the patient reports emergency symptoms such as
      severe chest pain or difficulty breathing, advise
      immediate medical attention.

    Return a well-structured report with clear headings.
    Avoid unnecessary medical jargon.
    """

    return prompt




def genAIResponse(detail_insight):
    prompt_template=genPromptTemplate(detail_insight)
    res=model.invoke(prompt_template)
    return res








