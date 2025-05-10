# ⚡️ Forecastly — Electricity Demand & Price Forecasting

![Python](https://img.shields.io/badge/Python-3.10-blue?logo=python)
![Flask](https://img.shields.io/badge/Flask-API-lightgrey?logo=flask)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)
![Prophet](https://img.shields.io/badge/Facebook%20Prophet-Forecasting-blueviolet)
![Status](https://img.shields.io/badge/React-brightgreen)

> **Forecastly** is a smart and simple tool for forecasting electricity **demand (KWh)** and **price** using historical data and machine learning. Built with a modern UI, a Flask backend, and powerful time-series modeling using Facebook’s Prophet.

---

## ✨ Features

- 🔮 **Dual Forecasting**: Predict both electricity **demand** and **price**
- 📈 **Interactive UI**: Input custom date ranges and see results dynamically
- 🧠 **Prophet ML Model**: Uses seasonality-aware time series forecasting
- ⚡ **Real-World Dataset**: Trained on actual electricity market data
- 🎨 **Minimal UI**: Styled with Tailwind CSS for a clean, modern look
- 🔌 **Lightweight Flask API**: Fast and scalable backend server

---

## 🖼️ Project Preview

<img src="output1.png" width="800"/>
<img src="output2.png" width="800"/>
<img src="output3.png" width="800"/>

> *Enter a date range → get instant predictions → visualize with charts*

---

## 🛠️ Tech Stack

| Layer       | Technologies Used                            |
|-------------|-----------------------------------------------|
| 💻 Frontend | HTML, Tailwind CSS, React                     |
| 🧠 Backend  | Python, Flask, JSON APIs                      |
| 📊 ML Model | Facebook Prophet (time-series forecasting)    |
| 📂 Data     | Cleaned historical electricity dataset (CSV) |
| 📈 Charts   | Chart.js for demand & price visualization     |

---

## 🚀 How It Works

1. User selects a **future date range**
2. Frontend sends the data to the Flask **backend**
3. Backend loads pre-trained **Prophet models**
4. Forecasts are generated for both **demand** and **price**
5. Results are returned to the UI and displayed as **tables + charts**

---

## 🔧 Prerequisites
- Python 3.10+
- Node.js & npm (for frontend)

## ▶️ Getting Started

### 🔧 Installation

## ⚙ Backend Setup (Flask + Prophet)

1️⃣ Clone the Repository
  git clone https://github.com/your-username/ui FIXED.git         
  

2️⃣ Create a Virtual Environment
         
          
          python -m venv venv

  #### Windows: 
  
  
  
          venv\Scripts\activate
  
  #### macOS/Linux: 
  
  
          source venv/bin/activate
  
3️⃣ Install Python Dependencies

  #### If you have a requirements.txt:
  
  
          pip install -r requirements.txt
  
  #### Or install manually:
  
  
          pip install flask pandas prophet scikit-learn
  
4️⃣ Run the Backend Server 
 
 Separately, open CMD by navigating to the app.py file, and run:

    

        python app.py



  
## 🎨Frontend Setup (Tailwind + HTML + Chart.js)

  The UI is a lightweight HTML page styled using Tailwind CSS and powered by Chart.js.
  #### Step 1: Navigate to the project directory.
  
  
  
        cd <YOUR_PROJECT_NAME>

#### Step 2: Install the necessary dependencies.



        
        npm i

#### Step 3: Start the development server with auto-reloading and an instant preview.




      npm run dev


  
## 🧪 Testing
1️⃣ Start the backend server:
    
python app.py

2️⃣ Open your browser and test API response:
    
http://localhost:8080/forecast

3️⃣ Verify the frontend UI by selecting a date range and checking predictions.

## ❓ FAQ

Clear some common confusion for users .

**Q: Do I need internet access to run this app?**  
A: No, the app runs locally and uses local models.

**Q: Can I use this for other regions?**  
A: Yes, just supply your own formatted dataset and retrain the models.

**Q: Why are my predictions showing negative values?**  
A: Ensure proper data scaling. Check if scaler.pkl is used correctly.


## 📄 License

This project is licensed under the [MIT License](LICENSE).
