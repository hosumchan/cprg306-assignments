"use client"; 

import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json"; 
import { useState } from "react"; 

export default function Page() {
    const [items, setItems] = useState(itemsData);
    const [selectedItemName, setSelectedItemName] = useState("");

    const handleAddItem = (item) => {
        setItems([...items, item]);
    };

    const handleItemSelect = (item) => {
        // Clean up the item name to remove size and emoji
        const cleanedName = item.name.split(",")[0].trim().replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2011-\u26FF]|[\uD83D-\uDC00-\uDFFF]/g, '');
        setSelectedItemName(cleanedName);
    };

    return (
        <main className="m-4 p-4 bg-gray-900 rounded flex">
            <div className="flex-1 mr-4">
                <h1 className="text-4xl font-bold text-white mb-4">Shopping List</h1>
                <NewItem onAddItem={handleAddItem} />
                <ItemList items={items} onItemSelect={handleItemSelect} />
            </div>
            <div className="flex-1">
                {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
            </div>
        </main>
    );
}
