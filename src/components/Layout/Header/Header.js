import React from "react";
import imgMeals from "../../../assets/meals.jpg";
import style from "./header.module.css";
import HeaderButton from "./HeaderButton";

const Header = (props) => {
  return (
    <>
      <header className={style.header}>
        <h1> React Meals</h1>
        <HeaderButton onShow={props.onShow} />
      </header>
      <div className={style["main-image"]}>
        <img src={imgMeals} alt="table full of food" />
      </div>
    </>
  );
};
export default Header;
