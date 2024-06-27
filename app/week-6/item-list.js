"use client"; // run in client mode

import { useState } from "react"; // React hook that allows you to add state to your functional components
import Item from "./item";
import itemsData from "./items.json"; // import the data from the JSON file

export default function ItemList() {

    // Defensive copy of itemsData
    let itemsArray = itemsData.map(item => ({...item})); //map: reate a new array of item objects by spreading the properties of each item

    let [sortBy, setSortBy] = useState("name"); //determines how the items should be sorted. It's initialized to "name"

    // Sorting function, .sort() method sorts the itemsArray array in place

    // the array is sorted alphabetically by the name property
    if (sortBy === "name") {
        // 'a' and 'b' are item objects from the itemsArray
        // Compare the 'name' properties of 'a' and 'b'
        itemsArray.sort((a, b) => { 
            if (a.name < b.name) return -1; // if 'a'comes before 'b', return -1
            if (a.name > b.name) return 1; // if 'a'comes after 'b', return 1
            return 0; // 'a' and 'b' are the same
        });

    // the array is sorted alphabetically by the category property.        
    } else if (sortBy === "category") {
        itemsArray.sort((a, b) => {
            if (a.category < b.category) return -1;
            if (a.category > b.category) return 1;
            return 0;
        });
    }

    // Grouping by category if sortBy is "group"
    let groupedItems = {};
    if (sortBy === "group") {
        itemsArray.forEach(item => {
            if (!groupedItems[item.category]) {
                groupedItems[item.category] = [];
            }
            groupedItems[item.category].push(item);
        });
        // Sort items within each category
        // for...in loop sorts the items within each category alphabetically by name.
        for (let category in groupedItems) {
            groupedItems[category].sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        }
    }

    return (
      <section className="p-4">
          <div className="flex justify-between mb-4">
              <label className="text-white text-lg">Sort by:</label>
              <div className="flex space-x-2">
                  {/* onClick handlers call setSortBy to update the sortBy state
                  onClick event handler is used to handle click events on a button or other clickable elements.
                  onChange event handler is used to handle changes to the value of an input element (e.g., <input>, <textarea>, <select>).
                  It is used when you want to execute some code when the user changes the value of an input element. 
                  Ternary Operator : condition ? expressionIfTrue : expressionIfFalse */}
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

          {/* Ternary Operator : condition ? expressionIfTrue : expressionIfFalse  */}
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
                              />
                          ))}
                      </ul>
                  </div>
              ))
          ) : (
              <ul className="list-none p-0">
                  {itemsArray.map(item => (
                      <Item
                          key={item.id}
                          name={item.name}
                          quantity={item.quantity}
                          category={item.category}
                      />
                  ))}
              </ul>
          )}
      </section>
    );
}
