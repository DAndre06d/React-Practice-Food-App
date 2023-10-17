import Style from "./availableMeal.module.css";
import Card from "../UI/Card/Card";
import MealItem from "./mealItem/MealItem";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/UseHttp";

const AvailableMeal = () => {
  const [meals, setMeals] = useState([]);
  const { sendRequest, isLoading, error } = useHttp();
  useEffect(() => {
    const transformfetchMeal = (meal) => {
      const loadedMeals = [];
      for (const key in meal) {
        loadedMeals.push({
          id: key,
          name: meal[key].name,
          description: meal[key].description,
          price: meal[key].price
        });
      }
      setMeals(loadedMeals);
    };
    sendRequest(
      {
        url:
          "https://react-movie-practice-2d98d-default-rtdb.asia-southeast1.firebasedatabase.app/Meal.json"
      },
      transformfetchMeal
    );
  }, [sendRequest]);
  const mealList = meals.map((data) => <MealItem key={data.id} meal={data} />);
  return (
    <>
      <section className={Style.meals}>
        <Card>
        {error ? <p>{error}</p> : isLoading ?<p>Loading....</p> : <ul>{mealList}</ul> }
        </Card>
      </section>
    </>
  );
};
export default AvailableMeal;
