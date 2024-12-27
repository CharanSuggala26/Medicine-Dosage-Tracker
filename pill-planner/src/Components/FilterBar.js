import React from 'react';
import { Search } from 'lucide-react';

export default function FilterBar({
  specialtyFilter,
  searchQuery,
  onSpecialtyChange,
  onSearchChange,
}) {
  const specialties = ['All', 'Cardiologist', 'Pediatrician', 'Dermatologist'];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search doctors..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-2">
        {specialties.map((specialty) => (
          <button
            key={specialty}
            onClick={() => onSpecialtyChange(specialty === 'All' ? '' : specialty)}
            className={`px-4 py-2 rounded-md ${
              (specialty === 'All' ? '' : specialty) === specialtyFilter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {specialty}
          </button>
        ))}
      </div>
    </div>
  );
}



// import React from 'react';
// import { Search } from 'lucide-react';

// interface FilterBarProps {
//   specialtyFilter: string;
//   searchQuery: string;
//   onSpecialtyChange: (specialty: string) => void;
//   onSearchChange: (query: string) => void;
// }

// export default function FilterBar({
//   specialtyFilter,
//   searchQuery,
//   onSpecialtyChange,
//   onSearchChange,
// }: FilterBarProps) {
//   const specialties = ['All', 'Cardiologist', 'Pediatrician', 'Dermatologist'];

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
//       <div className="relative flex-1">
//         <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search doctors..."
//           value={searchQuery}
//           onChange={(e) => onSearchChange(e.target.value)}
//           className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//         />
//       </div>
//       <div className="flex gap-2">
//         {specialties.map((specialty) => (
//           <button
//             key={specialty}
//             onClick={() => onSpecialtyChange(specialty === 'All' ? '' : specialty)}
//             className={`px-4 py-2 rounded-md ${
//               (specialty === 'All' ? '' : specialty) === specialtyFilter
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             {specialty}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }