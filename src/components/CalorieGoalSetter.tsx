import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { showSuccess, showError } from '@/utils/toast';

interface CalorieGoalSetterProps {
  currentGoal: number;
  onSetGoal: (goal: number) => void;
}

const CalorieGoalSetter: React.FC<CalorieGoalSetterProps> = ({ currentGoal, onSetGoal }) => {
  const [newGoal, setNewGoal] = useState(currentGoal > 0 ? String(currentGoal) : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goalValue = parseInt(newGoal, 10);

    if (isNaN(goalValue) || goalValue <= 0) {
      showError('Please enter a valid positive calorie goal.');
      return;
    }

    onSetGoal(goalValue);
    showSuccess('Daily calorie goal updated!');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-foreground">Set Daily Calorie Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="calorieGoal" className="text-muted-foreground">Your Goal (kcal)</Label>
            <Input
              id="calorieGoal"
              type="number"
              placeholder="e.g., 2000"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">Set Goal</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CalorieGoalSetter;