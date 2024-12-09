// components/ElevatedButton.js

export default function ElevatedButton({ text, onClick, Icon }) {
  return (
    <button
      className="flex items-center gap-2 px-6 py-3 bg-[#a855f7] text-white font-medium rounded-lg shadow-md hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-blue-300 active:shadow-lg transition-all font-sans"
      onClick={onClick}
    >
      {Icon && <Icon className="text-lg" />} {/* Render the icon if provided */}
      {text}
    </button>
  );
}
