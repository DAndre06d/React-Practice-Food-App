import Style from "./availableMeal.module.css";
import Card from "../UI/Card/Card";
import MealItem from "./mealItem/MealItem";
const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99
  }
];
const AvailableMeal = () => {
  const mealList = DUMMY_MEALS.map((data) => (
    <MealItem key={data.id} meal={data} />
  ));
  return (
    <>
      <section className={Style.meals}>
        <Card>
          <ul>{mealList}</ul>
        </Card>
      </section>
    </>
  );
};
export default AvailableMeal;
