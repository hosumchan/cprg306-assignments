export default function Item({ name, quantity, category, onSelect }) {
  return (
      <li className="bg-gray-800 text-white p-4 mb-4 cursor-pointer" onClick={onSelect}>
          <div className="text-2xl font-bold">{name}</div>
          <div className="text-xl"> Buy {quantity} in {category}</div>
      </li>
  );
}
