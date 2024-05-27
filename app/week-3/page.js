import ItemList from "./item-list";

export default function Page() {
    return (
        <main className="m-4 p-4 bg-gray-900 rounded">
            <h1 className="text-4xl font-bold text-white mb-4">Shopping List</h1>
            <ItemList/>
        </main>
    )
}