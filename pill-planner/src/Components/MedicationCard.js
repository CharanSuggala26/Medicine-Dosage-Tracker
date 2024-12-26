// import React from 'react';
// import { Clock, Pill, CheckCircle2, AlertCircle } from 'lucide-react';

// interface MedicationCardProps {
//   name: string;
//   time: string;
//   dosage: string;
//   taken: boolean;
//   onMarkTaken: () => void;
// }

// const MedicationCard: React.FC<MedicationCardProps> = ({
//   name,
//   time,
//   dosage,
//   taken,
//   onMarkTaken,
// }) => {
//   return (
//     <div className={`transform transition-all duration-300 hover:scale-105 ${
//       taken ? 'bg-green-50' : 'bg-white'
//     } rounded-xl shadow-lg p-6 mb-4`}>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <div className={`p-3 rounded-full ${taken ? 'bg-green-100' : 'bg-blue-100'}`}>
//             <Pill className={`w-6 h-6 ${taken ? 'text-green-500' : 'text-blue-500'}`} />
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
//             <div className="flex items-center text-gray-600 space-x-2">
//               <Clock className="w-4 h-4" />
//               <span>{time}</span>
//             </div>
//           </div>
//         </div>
//         <button
//           onClick={onMarkTaken}
//           className={`transform transition-all duration-200 ${
//             taken
//               ? 'bg-green-500 hover:bg-green-600'
//               : 'bg-blue-500 hover:bg-blue-600'
//           } text-white px-4 py-2 rounded-lg flex items-center space-x-2`}
//         >
//           {taken ? (
//             <>
//               <CheckCircle2 className="w-5 h-5" />
//               <span>Taken</span>
//             </>
//           ) : (
//             <>
//               <AlertCircle className="w-5 h-5" />
//               <span>Mark as Taken</span>
//             </>
//           )}
//         </button>
//       </div>
//       <div className="mt-4">
//         <p className="text-gray-600">Dosage: {dosage}</p>
//       </div>
//     </div>
//   );
// };

// export default MedicationCard;

import React from 'react';
import { Clock, Pill, CheckCircle2, AlertCircle } from 'lucide-react';

const MedicationCard = ({
  name,
  time,
  dosage,
  taken,
  onMarkTaken,
}) => {
  return (
    <div className={`transform transition-all duration-300 hover:scale-105 ${taken ? 'bg-green-50' : 'bg-white'} rounded-xl shadow-lg p-6 mb-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${taken ? 'bg-green-100' : 'bg-blue-100'}`}>
            <Pill className={`w-6 h-6 ${taken ? 'text-green-500' : 'text-blue-500'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <div className="flex items-center text-gray-600 space-x-2">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onMarkTaken}
          className={`transform transition-all duration-200 ${taken ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-lg flex items-center space-x-2`}
        >
          {taken ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Taken</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5" />
              <span>Mark as Taken</span>
            </>
          )}
        </button>
      </div>
      <div className="mt-4">
        <p className="text-gray-600">Dosage: {dosage}</p>
      </div>
    </div>
  );
};

export default MedicationCard;
