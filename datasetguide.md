# AgriSaathi ML Dataset Procurement & Training Guide

This guide details exactly where and how to download authenticated datasets to replace the Simulated AI endpoints inside AgriSaathi with genuine Machine Learning predictability models based on the Indian agricultural context.

## 1. Crop Recommendation & Yield Prediction
**Objective:** Recommend optimal crops and predict exact yield output based on NPK values, pH, Temperature, and Rainfall.

### The Dataset
*   **Kaggle Crop Recommendation Dataset:** The standard dataset for multi-classification of 22 different agricultural crops.
*   **Direct Link:** [Kaggle Crop Recommendation Dataset](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset)
*   **How to Download:**
    1.  Create a Kaggle account.
    2.  Click "Download" (Yields a `Crop_recommendation.csv` file).
    3.  Columns include: `N`, `P`, `K`, `temperature`, `humidity`, `ph`, `rainfall`, and `label` (Target crop).

### Training Approach (Scikit-Learn)
```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv("Crop_recommendation.csv")
X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = df['label']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Save your model
import joblib
joblib.dump(model, "crop_recommender.joblib")
```

---

## 2. Pest & Disease Computer Vision Model
**Objective:** Replace the text-based pest simulator with an image-upload endpoint where a farmer uploads a leaf photo and Convolutional Neural Networks (CNNs) detect the disease.

### The Dataset
*   **PlantVillage Dataset (New Plant Diseases Dataset on Kaggle)**
*   **Direct Link:** [Plant Disease Prediction Dataset](https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset)
*   **Size:** Contains ~87,000 RGB images of healthy and diseased crop leaves categorized into 38 different classes.

### Training Approach (PyTorch/TensorFlow Vision)
To build this, you should use **Transfer Learning** on a pretrained Vision model (like MobileNetV2, which is lightweight and fast for mobile inferences).
1.  Download the dataset folder structure (Train / Valid).
2.  Use `torchvision.datasets.ImageFolder` to load.
3.  Fine-tune `torchvision.models.mobilenet_v2(pretrained=True)` replacing the final classifier layer with 38 outputs.

---

## 3. Remote Sensing (Satellite) Index Models
**Objective:** Replace the random NDVI generator with literal analysis of multiband GeoTIFF images.

### The Dataset
Since this requires LIVE data rather than a static training set, you don't "download" a dataset; you query an API for recent imagery.
*   **Provider:** **Sentinel-Hub (ESA)** via `sentinelhub` Python package.
*   **Documentation:** [Sentinel Hub Python API](https://sentinelhub-py.readthedocs.io/en/latest/)

### Production Integration approach
Instead of guessing NDVI, you pull the B4 (Red) and B8 (Near-Infrared) bands for a bounding box:
```python
# NDVI Formula
# NDVI = (B08 - B04) / (B08 + B04)
# In production, use the sentinelhub-py library to fetch these specific bands
```

---

## 4. Market Price Prediction (Time-Series)
**Objective:** Forecast tomorrow's or next week's crop price based on historical Mandi pricing data across India.

### The Dataset
*   **Source:** **Agmarknet (Government of India)**
*   **Direct Link:** [data.gov.in (Wholesale Prices)](https://data.gov.in/catalog/daily-wholesale-prices-certain-agricultural-commodities)
*   **How to Download:**
    1.  Navigate to data.gov.in.
    2.  Search for "Daily Wholesale Prices of certain Agricultural Commodities".
    3.  Download JSON/CSV dumps of historical APMC prices.

### Training Approach (Prophet / LSTM)
Use Facebook's **Prophet** library for easy time-series forecasting, capturing yearly agricultural seasonality.
```python
from prophet import Prophet
import pandas as pd

# DataFrame must have 'ds' (Date) and 'y' (Price) columns
m = Prophet(yearly_seasonality=True)
m.fit(historical_price_df)
future = m.make_future_dataframe(periods=30)
forecast = m.predict(future)
```

---

## 5. Bhashini Translation Implementation
**Objective:** Shift away from standard APIs to Bhashini for robust context-aware agricultural translation in India.

### Integration Steps
1.  Register on [Bhashini (bhashini.gov.in)](https://bhashini.gov.in/).
2.  Acquire your API keys via their ULCA portal.
3.  Bhashini provides specialized REST endpoints for Indic Language Translation.
4.  Replace the open-source `deep-translator` in `ml-backend/services.py` with direct `POST` requests to Bhashini's translation endpoints, specifying the agricultural domain if prompted.

### Implementing Free Audio Alerts (TTS) System
As instructed for Voice Alerts, you can utilize the entirely free **gTTS (Google Text-to-Speech)** library in python as an immediate alternative to Google Cloud Text-to-Speech.

*Install using:* `pip install gTTS`

When the `/api/cron/trigger-alerts` fires a Telugu alert, you can save it as an MP3 and dispatch it via Telegram Voice feature.
```python
from gtts import gTTS
tts = gTTS(text="రేపు భారీ వర్షం వచ్చే అవకాశం ఉంది.", lang='te')
tts.save("alert.mp3")
# Then send the alert.mp3 via Telegram Bot using sendAudio
```
