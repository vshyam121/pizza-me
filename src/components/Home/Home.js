import React from "react";
import "./Home.scss";
import ItemBox from "../UI/ItemBox/ItemBox";
import CheesePizza from "../../assets/images/pizza_cheese.jpg";
import PepperoniPizza from "../../assets/images/pizza_pepperoni.jpg";
import MeatLoversPizza from "../../assets/images/pizza_meat_lovers.webp";
import SupremePizza from "../../assets/images/pizza_supreme.webp";


const Home = props => {
    return (
        <div className="home">
            <ItemBox itemName="Cheese Pizza" price={18.29} imageSrc={CheesePizza} />
            <ItemBox itemName="Pepperoni Pizza" price={20.93} imageSrc={PepperoniPizza}/>
            <ItemBox itemName="Meat Lover's Pizza" price={22.99} imageSrc={MeatLoversPizza}/>
            <ItemBox itemName="Supreme Pizza" price={22.99} imageSrc={SupremePizza}/>
            <ItemBox create_pizza itemName="Cheese Pizza" price={18.29} imageSrc={CheesePizza}/>
        </div>
    )
}

export default Home;