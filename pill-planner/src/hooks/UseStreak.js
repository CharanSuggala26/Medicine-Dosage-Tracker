// import { useState, useEffect } from 'react';

// const UseStreak = () => {
//   const [streak, setStreak] = useState(() => {
//     const saved = localStorage.getItem('medicationStreak');
//     return saved ? JSON.parse(saved) : 0;
//   });

//   const [lastCompletedDate, setLastCompletedDate] = useState(() => {
//     const saved = localStorage.getItem('lastCompletedDate');
//     return saved ? new Date(JSON.parse(saved)) : null;
//   });

//   useEffect(() => {
//     localStorage.setItem('medicationStreak', JSON.stringify(streak));
//     if (lastCompletedDate) {
//       localStorage.setItem('lastCompletedDate', JSON.stringify(lastCompletedDate));
//     }
//   }, [streak, lastCompletedDate]);

//   const updateStreak = (allTaken) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (allTaken) {
//       if (!lastCompletedDate) {
//         setStreak(1);
//         setLastCompletedDate(today);
//       } else {
//         const lastDate = new Date(lastCompletedDate);
//         lastDate.setHours(0, 0, 0, 0);
//         const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

//         if (diffDays === 1) {
//           setStreak(s => s + 1);
//         } else if (diffDays > 1) {
//           setStreak(1);
//         }
//         setLastCompletedDate(today);
//       }
//     }
//   };

//   return { streak, updateStreak };
// };

// export default UseStreak;

import { useState, useEffect, useCallback } from 'react';

const UseStreak = () => {
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('medicationStreak');
    return saved ? JSON.parse(saved) : 0;
  });

  const [lastCompletedDate, setLastCompletedDate] = useState(() => {
    const saved = localStorage.getItem('lastCompletedDate');
    return saved ? new Date(JSON.parse(saved)) : null;
  });

  useEffect(() => {
    localStorage.setItem('medicationStreak', JSON.stringify(streak));
    if (lastCompletedDate) {
      localStorage.setItem('lastCompletedDate', JSON.stringify(lastCompletedDate));
    }
  }, [streak, lastCompletedDate]); // Dependencies are correctly listed here

  // Memoize the updateStreak function using useCallback to prevent unnecessary re-renders
  const updateStreak = useCallback((allTaken) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (allTaken) {
      if (!lastCompletedDate) {
        setStreak(1);
        setLastCompletedDate(today);
      } else {
        const lastDate = new Date(lastCompletedDate);
        lastDate.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          setStreak((s) => s + 1);
        } else if (diffDays > 1) {
          setStreak(1);
        }
        setLastCompletedDate(today);
      }
    }
  }, [lastCompletedDate]); // Ensure `updateStreak` is stable across renders

  return { streak, updateStreak };
};

export default UseStreak;
