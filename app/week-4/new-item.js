//Import the useState hook from React.
"use client";

import { useState } from "react";


export default function NewItem() {

    //The initial value of name should be an empty string (""), indicating that the name field is initially blank
    const [name, setName] = useState(""); //Use the useState hook to create a state variable called name and a setter function called setName.

    //The initial value of quantity should be 1, indicating that the quantity field is initially set to 1.
    const [quantity, setQuantity] = useState(1);

    //The initial value of category should be "produce", indicating that the category field is initially set to "Produce".
    const [category, setCategory] = useState("produce");


    const handleSubmit = (event) => {

        //Prevent the form's default submission behavior.
        event.preventDefault(); 
        
        //Create an item object with the current values of name, quantity, and category
        const item = { 
            name, quantity, category
        };

        //Log the item object to the console.
        console.log(item);

        //Display an alert with the current state of name, quantity, and category.
        alert(`
        Added item: 
        Name: ${name}  
        Quantity: ${quantity} 
        Category: ${category}`);

        //Reset the state variables to their initial values.
        setName("");
        setQuantity(1);
        setCategory("produce");
    };

    //Create functions called handleNameChange / handQuantityChange / handleCategoryChange
    //Take an "event" object as an argument
    //Sets the name state variable to the value of the input element.
    const handleNameChange = (event) => setName(event.target.value);
    const handleQuantityChange = (event) => setQuantity(Number(event.target.value)); //to convert the input to a Number before setting the state
    const handleCategoryChange = (event) => setCategory(event.target.value);



    return (
        <main>
            
            {/* Create a form element with an onSubmit event handler that calls the handleSubmit function. */}
            <form onSubmit = {handleSubmit} className = "bg-gray-800 p-6 rounded-lg space-y-2">

            {/* Create a label element with a htmlFor attribute set to "name" and a text content of "Item Name: ". */}
            <div>
                <label className="block text-gray-300" for="name">Item Name: </label>
                <input 
                    id="name" /*for="name" and id="name" should match here*/
                    type="text" /*Create an input field of type text*/
                    value={name} /*The value of the input field should be tied to the name state variable, meaning that it displays the current value of name*/
                    onChange={handleNameChange} /*Add an onChange event handler that calls the handleNameChange function.*/
                    required /*Add required attribute to the input field to ensure that the user cannot submit the form without providing a name*/
                    className="w-full p-2 rounded text-gray-700 bg-gray-300"
                />
            </div>
            <div>
                <label className="block text-gray-300" for="quantity">Quantity: </label>
                <input
                    id="quantity"
                    type="number"
                    min="1" /*Set the min attribute to "1"*/
                    max="99" /*the max attribute to "99" to limit the range of valid quantities*/
                    value={quantity}
                    onChange={handleQuantityChange}
                    required
                    className="w-full p-2 rounded text-gray-700 bg-gray-300"
                />
            </div>
            <div>
                <label className="block text-gray-300" for="category">Category: </label>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    required
                    className="w-full p-2 rounded text-gray-700 bg-gray-300"
                >
                    {/*Create various option elements within the select*/}
                    <option value="produce">Produce</option> 
                    <option value="dairy">Dairy</option>
                    <option value="bakery">Bakery</option>
                    <option value="meat">Meat</option>
                    <option value="frozen">Frozen Foods</option>
                    <option value="canned">Canned Goods</option>
                    <option value="dry">Dry Goods</option>
                    <option value="beverages">Beverages</option>
                    <option value="snacks">Snacks</option>
                    <option value="household">Household</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"> Add Item </button>
            </div>

            </form>
            
        </main>    
    );
}