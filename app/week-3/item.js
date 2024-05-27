
export default function Item({name, quantity, category}) {
    return (
      <li className="bg-gray-800 text-white p-4 mb-4">
          <div className="text-2xl font-bond">{name}</div>
          <div className="text-xl"> Buy {quantity} in {category}</div>          
      </li>
    );
}