import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import CalorieInputForm from '@/components/CalorieInputForm';
import FoodLog from '@/components/FoodLog';
import CalorieSummary from '@/components/CalorieSummary';
import CalorieGoalSetter from '@/components/CalorieGoalSetter';
import { FoodItem, CalorieGoal } from '@/types';

const LOCAL_STORAGE_FOOD_KEY = 'calorieQuestFoodLog';
const LOCAL_STORAGE_GOAL_KEY = 'calorieQuestGoal';

const CalorieQuest: React.FC = () => {
  const today = useMemo(() => new Date().toISOString().split('T')[0], []); // YYYY-MM-DD

  const [foodItems, setFoodItems] = useState<FoodItem[]>(() => {
    const storedItems = localStorage.getItem(LOCAL_STORAGE_FOOD_KEY);
    if (storedItems) {
      const parsedItems: FoodItem[] = JSON.parse(storedItems);
      // Filter items for today's date
      return parsedItems.filter(item => item.date === today);
    }
    return [];
  });

  const [calorieGoal, setCalorieGoal] = useState<number>(() => {
    const storedGoal = localStorage.getItem(LOCAL_STORAGE_GOAL_KEY);
    if (storedGoal) {
      const parsedGoal: CalorieGoal = JSON.parse(storedGoal);
      // If the goal was set today, use it. Otherwise, reset or use default.
      // For simplicity, we'll just use the last set goal regardless of date for now.
      // A more complex app might reset daily or prompt.
      return parsedGoal.goal;
    }
    return 0; // Default no goal
  });

  // Effect to save food items to local storage whenever they change
  useEffect(() => {
    // When saving, we need to merge today's items with previous days' items
    const allStoredItems = localStorage.getItem(LOCAL_STORAGE_FOOD_KEY);
    let existingItems: FoodItem[] = [];
    if (allStoredItems) {
      existingItems = JSON.parse(allStoredItems);
    }

    // Filter out old items for today and add current items
    const updatedAllItems = [
      ...existingItems.filter(item => item.date !== today),
      ...foodItems
    ];

    localStorage.setItem(LOCAL_STORAGE_FOOD_KEY, JSON.stringify(updatedAllItems));
  }, [foodItems, today]);

  // Effect to save calorie goal to local storage whenever it changes
  useEffect(() => {
    const goalData: CalorieGoal = {
      goal: calorieGoal,
      lastUpdated: today,
    };
    localStorage.setItem(LOCAL_STORAGE_GOAL_KEY, JSON.stringify(goalData));
  }, [calorieGoal, today]);

  const handleAddItem = (item: FoodItem) => {
    setFoodItems((prevItems) => [...prevItems, item]);
  };

  const handleRemoveItem = (id: string) => {
    setFoodItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSetGoal = (goal: number) => {
    setCalorieGoal(goal);
  };

  const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        <div className="lg:col-span-1 space-y-6">
          <CalorieInputForm onAddItem={handleAddItem} />
          <CalorieGoalSetter currentGoal={calorieGoal} onSetGoal={handleSetGoal} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <CalorieSummary totalCalories={totalCalories} calorieGoal={calorieGoal} />
          <FoodLog foodItems={foodItems} onRemoveItem={handleRemoveItem} />
        </div>
      </main>
    </div>
  );
};

export default CalorieQuest;
