import React from "react";
import Header from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import appStyles from "./app.module.css";
import data from "../../utils/data";

const App = () => {
  const orderedIngredients = data.filter(item => item.price > 1000);
  return (
    <div className={appStyles.app}>
      <Header />
      <main className={appStyles.container}>
        <BurgerIngredients ingredientsDetails={data}/>
        <BurgerConstructor orderDetails={orderedIngredients}/>
      </main>
    </div>
  );
};

export default App;
