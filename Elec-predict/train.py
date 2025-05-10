import pandas as pd
import joblib
from prophet import Prophet
from sklearn.preprocessing import StandardScaler

# Load dataset
file_path = "cleaned_dataset.csv"
df = pd.read_csv(file_path)

# Convert 'date' to datetime format
df["date"] = pd.to_datetime(df["date"])

# Create lag features
df["demand_lag_1"] = df["demand"].shift(1)
df["demand_lag_7"] = df["demand"].shift(7)
df["rrp_lag_1"] = df["rrp"].shift(1)
df["rrp_lag_7"] = df["rrp"].shift(7)

# Create interaction term for weather effects
df["temp_rain_interaction"] = df["min_temperature"] * df["rainfall"]

# Additional categorical features
df["weekday"] = df["date"].dt.weekday
df["is_weekend"] = (df["weekday"] >= 5).astype(int)
df["extreme_weather"] = (
    (df["max_temperature"] > df["max_temperature"].quantile(0.95)) |
    (df["rainfall"] > df["rainfall"].quantile(0.95))
).astype(int)

# Drop NaN values after shifting
df.dropna(inplace=True)

# Standardize selected features
scaler = StandardScaler()
features_to_scale = [
    "demand", "demand_lag_1", "demand_lag_7", "rrp", "rrp_lag_1", "rrp_lag_7",
    "min_temperature", "max_temperature", "solar_exposure", "rainfall", "temp_rain_interaction"
]
df[features_to_scale] = scaler.fit_transform(df[features_to_scale])
joblib.dump(scaler, "scaler.pkl")
# Train Prophet Model for Demand
demand_model = Prophet()
regressor_cols = [
    "demand_lag_1", "demand_lag_7", "rrp_lag_1", "rrp_lag_7",
    "min_temperature", "max_temperature", "solar_exposure",
    "rainfall", "temp_rain_interaction", "is_weekend", "extreme_weather"
]

for col in regressor_cols:
    demand_model.add_regressor(col)

df_demand = df.rename(columns={"date": "ds", "demand": "y"})[["ds", "y"] + regressor_cols]
demand_model.fit(df_demand)

# Train Prophet Model for RRP
rrp_model = Prophet()
for col in regressor_cols:
    rrp_model.add_regressor(col)

df_rrp = df.rename(columns={"date": "ds", "rrp": "y"})[["ds", "y"] + regressor_cols]
rrp_model.fit(df_rrp)

# Save models
joblib.dump(demand_model, "model_demand.pkl")
joblib.dump(rrp_model, "model_rrp.pkl")

print("✅ Prophet models trained and saved successfully!")
