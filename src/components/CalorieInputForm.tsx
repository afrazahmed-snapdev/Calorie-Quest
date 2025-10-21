import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FoodItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { showSuccess, showError } from '@/utils/toast';

interface CalorieInputFormProps {
  onAddItem: (item: FoodItem) => void;
}

const CalorieInputForm: React.FC<CalorieInputFormProps> = ({ onAddItem }) => {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calorieValue = parseInt(calories, 10);

    if (!foodName.trim() || isNaN(calorieValue) || calorieValue <= 0) {
      showError('Please enter a valid food name and positive calorie amount.');
      return;
    }

    const newItem: FoodItem = {
      id: uuidv4(),
      name: foodName.trim(),
      calories: calorieValue,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    onAddItem(newItem);
    setFoodName('');
    setCalories('');
    showSuccess('Food item added!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-sm bg-card">
      <h2 className="text-xl font-semibold text-foreground">Add Food Item</h2>
      <div>
        <Label htmlFor="foodName" className="text-muted-foreground">Food Name</Label>
        <Input
          id="foodName"
          type="text"
          placeholder="e.g., Apple, Chicken Breast"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="calories" className="text-muted-foreground">Calories</Label>
        <Input
          id="calories"
          type="number"
          placeholder="e.g., 95, 165"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="mt-1"
        />
      </div>
      <Button type="submit" className="w-full">Add Item</Button>
    </form>
  );
};

export default CalorieInputForm;