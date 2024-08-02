"use client"; 

import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { useEffect, useState } from "react"; 
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service"; 

export default function Page() {
    const [items, setItems] = useState([]); //initialize with an empty array now
    const [selectedItemName, setSelectedItemName] = useState("");
    const { user } = useUserAuth();
    
    // Load items from Firestore
    const loadItems = async () => {
        try {
            if (user) {
                const userItems = await getItems(user.uid); // Fetch items using Firestore
                setItems(userItems);
            }
        } catch (error) {
            console.error("Failed to load items:", error);
        }
    };  

    useEffect(() => {
        // Check if user is defined before loading items
        if (user) {
            loadItems(); // Load items when the component mounts and user is authenticated
        }
    }, [user]); // Dependency on user for when it changes
    
    const handleItemSelect = (item) => {
        // Clean up the item name to remove size and emoji
        const cleanedName = item.name.split(",")[0].trim().replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2011-\u26FF]|[\uD83D-\uDC00-\uDFFF]/g, '');
        setSelectedItemName(cleanedName);
    };

    const handleAddItem = async (item) => {
        try {
            const itemId = await addItem(user.uid, item); // Save to Firestore
            setItems([...items, { ...item, id: itemId }]); // Add item with ID to the list
        } catch (error) {
            console.error("Failed to add item:", error);
        }
    };

    if (!user) {
        return <p> You are not allowed to use the app. Please sign in.</p>;
    }

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
