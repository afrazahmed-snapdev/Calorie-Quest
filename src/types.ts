export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  date: string; // Storing date to allow for future multi-day tracking
}

export interface CalorieGoal {
  goal: number;
  lastUpdated: string;
}