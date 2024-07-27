"use client";

import { useState, useEffect } from "react";

export default function MealIdeas({ ingredient }) {
    const [meals, setMeals] = useState([]);

    // Function to fetch meal ideas from TheMealDB API
    const fetchMealIdeas = async (ingredient) => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        return data.meals || [];
    };

    // Function to load meal ideas and set the state
    const loadMealIdeas = async () => {
        const meals = await fetchMealIdeas(ingredient);
        setMeals(meals);
    };

    // Use useEffect to load meal ideas when the ingredient changes
    useEffect(() => {
        if (ingredient) {
            loadMealIdeas();
        }
    }, [ingredient]);

    return (
        <div className="p-4 bg-gray-800 rounded">
            <h2 className="text-2xl font-bold text-white mb-4">Meal Ideas for {ingredient}</h2>
            <ul className="list-none p-0">
                {meals.map(meal => (
                    <li key={meal.idMeal} className="mb-2">
                        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-16 h-16 inline-block mr-4 rounded" />
                        <span className="text-white">{meal.strMeal}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
