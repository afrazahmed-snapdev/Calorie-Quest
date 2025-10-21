import React from 'react';
import { FoodItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { showError, showSuccess } from '@/utils/toast';

interface FoodLogProps {
  foodItems: FoodItem[];
  onRemoveItem: (id: string) => void;
}

const FoodLog: React.FC<FoodLogProps> = ({ foodItems, onRemoveItem }) => {
  const handleRemove = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}"?`)) {
      onRemoveItem(id);
      showSuccess(`"${name}" removed.`);
    } else {
      showError('Removal cancelled.');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-foreground">Today's Food Log</CardTitle>
      </CardHeader>
      <CardContent>
        {foodItems.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No food items added yet. Start tracking!</p>
        ) : (
          <ul className="space-y-2">
            {foodItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-md shadow-sm">
                <span className="text-foreground font-medium">{item.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">{item.calories} kcal</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(item.id, item.name)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodLog;