import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CalorieSummaryProps {
  totalCalories: number;
  calorieGoal: number;
}

const CalorieSummary: React.FC<CalorieSummaryProps> = ({ totalCalories, calorieGoal }) => {
  const progressPercentage = calorieGoal > 0 ? Math.min(100, (totalCalories / calorieGoal) * 100) : 0;
  const remainingCalories = calorieGoal - totalCalories;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-foreground">Daily Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-lg font-medium">
          <span className="text-muted-foreground">Total Calories:</span>
          <span className="text-foreground">{totalCalories} kcal</span>
        </div>
        <div className="flex justify-between items-center text-lg font-medium">
          <span className="text-muted-foreground">Calorie Goal:</span>
          <span className="text-foreground">{calorieGoal > 0 ? `${calorieGoal} kcal` : 'Not set'}</span>
        </div>
        {calorieGoal > 0 && (
          <>
            <Progress value={progressPercentage} className="w-full" />
            <div className="text-center text-sm text-muted-foreground">
              {remainingCalories >= 0 ? (
                <span>{remainingCalories} kcal remaining</span>
              ) : (
                <span className="text-destructive">{Math.abs(remainingCalories)} kcal over goal</span>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CalorieSummary;