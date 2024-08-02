"use client";

import { useState } from "react"; // React hook that allows you to add state to your functional components
import Item from "./item";

export default function ItemList({ items, onItemSelect }) {
    let [sortBy, setSortBy] = useState("name"); // determines how the items should be sorted. It's initialized to "name"

    // Create a sorted copy of the items array based on the sortBy state.
    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "category") {
            return a.category.localeCompare(b.category);
        }
        return 0;
    });

    // Group items by category if sortBy is "group"
    const groupedItems = sortedItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <section className="p-4">
            <div className="flex justify-between mb-4">
                <label className="text-white text-lg">Sort by:</label>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setSortBy("name")}
                        className={`px-4 py-2 rounded ${sortBy === "name" ? "bg-orange-500 text-white" : "bg-gray-300 text-black"}`}
                    > Name </button>
                    <button
                        onClick={() => setSortBy("category")}
                        className={`px-4 py-2 rounded ${sortBy === "category" ? "bg-orange-500 text-white" : "bg-gray-300 text-black"}`}
                    > Category </button>
                    <button
                        onClick={() => setSortBy("group")}
                        className={`px-4 py-2 rounded ${sortBy === "group" ? "bg-orange-500 text-white" : "bg-gray-300 text-black"}`}
                    > Grouped Category </button>
                </div>
            </div>

            {sortBy === "group" ? (
                Object.keys(groupedItems).sort().map(category => (
                    <div key={category}>
                        <h2 className="text-2xl font-bold text-white mt-4 capitalize">{category}</h2>
                        <ul className="list-none p-0">
                            {groupedItems[category].map(item => (
                                <Item
                                    key={item.id}
                                    name={item.name}
                                    quantity={item.quantity}
                                    category={item.category}
                                    onSelect={() => onItemSelect(item)}
                                />
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <ul className="list-none p-0">
                    {sortedItems.map(item => (
                        <Item
                            key={item.id}
                            name={item.name}
                            quantity={item.quantity}
                            category={item.category}
                            onSelect={() => onItemSelect(item)}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}
