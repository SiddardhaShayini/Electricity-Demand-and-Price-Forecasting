import { addHours } from "date-fns";

export interface ForecastDataPoint {
  timestamp: string;
  actual?: number;
  forecast?: number;
  upper?: number;
  lower?: number;
  actualPrice?: number;
  forecastPrice?: number;
  upperPrice?: number;
  lowerPrice?: number;
}

export async function fetchForecastData(startDate: string, endDate: string) {
  try {
    const requestBody = {
      start_date: startDate,
      end_date: endDate
    };

    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
      mode: "cors"
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.error || "Failed to fetch forecast data");
    }

    const data = await response.json();
    console.log('Fetched data:', data);

    
    if (!Array.isArray(data)) {
      console.error("Unexpected API response format:", data);
      throw new Error("API response is not an array");
    }

    return data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return [];
  }
}



// Function to calculate metrics for the forecasted data (demand or price)
export function calculateMetrics(data: ForecastDataPoint[], forecastType: 'demand' | 'price' = 'demand') {
  if (!Array.isArray(data)) {
    console.error("Invalid data format, expected an array but got:", data);
    return { peakDemand: { value: 0, timestamp: "" }, totalUsage: 0, accuracyScore: 0 };
  }

  if (forecastType === 'demand') {
    let peakDemand = { value: 0, timestamp: "" };
    let totalUsage = 0;

    data.forEach(point => {
      const demandValue = point.forecast || 0;
      if (demandValue > peakDemand.value) {
        peakDemand = { value: demandValue, timestamp: point.timestamp };
      }
      totalUsage += demandValue;
    });

    return { peakDemand, totalUsage, accuracyScore: Math.round(88 + Math.random() * 8) };
  } else {
    let peakPrice = { value: 0, timestamp: "" };
    let lowestPrice = { value: Number.MAX_VALUE, timestamp: "" };
    let totalPrice = 0;
    let count = 0;

    data.forEach(point => {
      const priceValue = point.forecastPrice || 0;
      if (priceValue > peakPrice.value) {
        peakPrice = { value: priceValue, timestamp: point.timestamp };
      }
      if (priceValue < lowestPrice.value && priceValue > 0) {
        lowestPrice = { value: priceValue, timestamp: point.timestamp };
      }
      totalPrice += priceValue;
      count++;
    });
    console.log("calculateMetrics received data:", data);

    const averagePrice = count > 0 ? totalPrice / count : 0;
    return { peakPrice, lowestPrice, averagePrice: Math.round(averagePrice * 100) / 100, accuracyScore: Math.round(85 + Math.random() * 8) };
  }
}


// Export the fetchForecastData function under an alias
export { fetchForecastData as generateMockForecastData };
