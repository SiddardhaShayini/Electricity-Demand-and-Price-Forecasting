from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
from prophet import Prophet
from sklearn.preprocessing import StandardScaler

# Load trained Prophet models
demand_model = joblib.load("model_demand.pkl")
rrp_model = joblib.load("model_rrp.pkl")

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print("Received Data:", data)

        required_fields = ["start_date", "end_date"]
        missing_fields = [field for field in required_fields if field not in data]

        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

        # Prepare future dataframe
        future_dates = pd.date_range(start=data["start_date"], end=data["end_date"], freq="D")
        future_df = pd.DataFrame({"ds": future_dates})

        # Compute regressors dynamically (use last known values)
        history = demand_model.history
        last_known = history.iloc[-1]  # Get last row of training data

        regressor_cols = [
            "demand_lag_1", "demand_lag_7", "rrp_lag_1", "rrp_lag_7",
            "min_temperature", "max_temperature", "solar_exposure",
            "rainfall", "temp_rain_interaction", "is_weekend", "extreme_weather"
        ]

        for col in regressor_cols:
            future_df[col] = last_known[col]  # Fill future with last known values

        print("Future DataFrame with Regressors:", future_df.head())

        # Predict demand and price using Prophet
        demand_forecast = demand_model.predict(future_df)
        price_forecast = rrp_model.predict(future_df)

        print("Demand Forecast:", demand_forecast.head())
        print("Price Forecast:", price_forecast.head())

        demand_predictions = demand_forecast[["ds", "yhat"]].rename(columns={"yhat": "demand_forecast"})
        price_predictions = price_forecast[["ds", "yhat"]].rename(columns={"yhat": "price_forecast"})

        result = pd.merge(demand_predictions, price_predictions, on="ds")
        result["ds"] = result["ds"].astype(str)

        return jsonify(result.to_dict(orient="records"))

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

@app.route("/")
def index():
    return app.send_static_file("index.html")