import style from "./mealSummary.module.css";
const MealSummary = () => {
  return (
    <section className={style.summary}>
      <h2>Foood Deliver to yoouu</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
  );
};
export default MealSummary;
