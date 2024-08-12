import React from 'react'

function ProgressBar({amountRaised, totalAmount }) {
    const percentage = Math.round((amountRaised/totalAmount) * 100) ; 
    
  return (
    <>
    {/* Progress bar */}
     <div className="w-full bg-gray-200 rounded-full   dark:bg-gray-700">
     <div
       className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 py-2 leading-none rounded-full"
       style={{ color : 'black',  width: `${percentage}%` }} 
     >
       {percentage}%
     </div>
   </div>
    </>
     
    
  )
}

export default ProgressBar