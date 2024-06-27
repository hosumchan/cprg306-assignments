"use client"; 

import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json"; 
import { useState } from "react"; 


export default function Page() {
    // Initialize a state variable called 'items' with the data from items.json.
    const [items, setItems] = useState(itemsData);

    // Event handler function for adding a new item to the list.
    const handleAddItem = (item) => {
        // Update the state by adding the new item to the existing list of items.
        setItems([...items, item]);
    };

    return (
        <main className="m-4 p-4 bg-gray-900 rounded">
            <h1 className="text-4xl font-bold text-white mb-4">Shopping List</h1>

            {/* Render the NewItem component and pass the handleAddItem function as a prop */}
            <NewItem onAddItem={handleAddItem} />

            {/* Render the ItemList component and pass the items state as a prop */}
            <ItemList items={items} />
        </main>
    );
}
