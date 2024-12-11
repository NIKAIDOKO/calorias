
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CalorieTracker = () => {
  // Estados para comidas
  const [foodName, setFoodName] = useState('');
  const [foodCalories, setFoodCalories] = useState('');
  const [savedFoods, setSavedFoods] = useState([]);

  // Estados para ejercicios
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseCalories, setExerciseCalories] = useState('');
  const [savedExercises, setSavedExercises] = useState([]);

  // Estados de resumen
  const [totalConsumedCalories, setTotalConsumedCalories] = useState(0);
  const [totalBurnedCalories, setTotalBurnedCalories] = useState(0);

  // Categorías de comidas y ejercicios
  const foodCategories = [
    'Desayuno', 'Almuerzo', 'Cena', 'Snack'
  ];

  const exerciseCategories = [
    'Cardio', 'Fuerza', 'Yoga', 'Otro'
  ];

  // Manejar guardado de comida
  const handleSaveFood = () => {
    if (foodName && foodCalories) {
      const newFood = { 
        name: foodName, 
        calories: parseFloat(foodCalories) 
      };
      
      const updatedFoods = [...savedFoods, newFood];
      setSavedFoods(updatedFoods);
      
      // Actualizar total de calorías consumidas
      const totalCalories = updatedFoods.reduce((total, food) => total + food.calories, 0);
      setTotalConsumedCalories(totalCalories);

      // Limpiar campos
      setFoodName('');
      setFoodCalories('');
    }
  };

  // Manejar guardado de ejercicio
  const handleSaveExercise = () => {
    if (exerciseName && exerciseCalories) {
      const newExercise = { 
        name: exerciseName, 
        calories: parseFloat(exerciseCalories) 
      };
      
      const updatedExercises = [...savedExercises, newExercise];
      setSavedExercises(updatedExercises);
      
      // Actualizar total de calorías quemadas
      const totalBurned = updatedExercises.reduce((total, exercise) => total + exercise.calories, 0);
      setTotalBurnedCalories(totalBurned);

      // Limpiar campos
      setExerciseName('');
      setExerciseCalories('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {/* Sección de Comidas */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Comidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Categoría de Comida" />
            </SelectTrigger>
            <SelectContent>
              {foodCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input 
            placeholder="Nombre de la Comida" 
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
          
          <Input 
            type="number" 
            placeholder="Calorías" 
            value={foodCalories}
            onChange={(e) => setFoodCalories(e.target.value)}
          />
          
          <Button 
            onClick={handleSaveFood} 
            disabled={!foodName || !foodCalories}
            className="w-full"
          >
            Guardar Comida
          </Button>
        </CardContent>
      </Card>

      {/* Sección de Ejercicios */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Ejercicios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Categoría de Ejercicio" />
            </SelectTrigger>
            <SelectContent>
              {exerciseCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input 
            placeholder="Nombre del Ejercicio" 
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          
          <Input 
            type="number" 
            placeholder="Calorías Quemadas" 
            value={exerciseCalories}
            onChange={(e) => setExerciseCalories(e.target.value)}
          />
          
          <Button 
            onClick={handleSaveExercise} 
            disabled={!exerciseName || !exerciseCalories}
            className="w-full"
          >
            Guardar Ejercicio
          </Button>
        </CardContent>
      </Card>

      {/* Resumen de Calorías */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Calorías</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Calorías Consumidas:</span>
            <span>{totalConsumedCalories} kcal</span>
          </div>
          <div className="flex justify-between">
            <span>Calorías Quemadas:</span>
            <span>{totalBurnedCalories} kcal</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Balance Calórico:</span>
            <span>{totalConsumedCalories - totalBurnedCalories} kcal</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalorieTracker;
