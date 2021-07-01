import React from "react";
import Header from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import appStyles from "./app.module.css";
// import data from "../../utils/data";
import useFetch from "../../hooks/use-fetch";
import {URL} from "../../utils/constants";

const App = () => {
  const { data, hasError, isLoading } = useFetch(URL);
  if (hasError) {
    console.log({hasError})
  }
  if (isLoading) {
    console.log('Загрузка')
  }
  const orderIngredients = data.filter(item => item.price > 1000);
  
  return (
    <div className={appStyles.app}>
      <Header />
      <main className={appStyles.container}>
        <BurgerIngredients ingredientsDetails={data}/>
        <BurgerConstructor orderedIngredients={orderIngredients}/>
      </main>
    </div>
  );
};

export default App;
