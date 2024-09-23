import React from 'react';
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

export default function StatsCard({ title, value, change, changeType, icons, cradType }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 pt-2 pb-2 flex gap-4">
      <div>
        <div className='flex gap-2'>
          <HiAdjustmentsHorizontal className='mt-2 text-xl' />
          <h4 className="text-2xl mb-2">{title}</h4>
        </div>
       {cradType === 'ads' && (
          <div className='flex gap-2'>
            <p className="text-gray-600 card-icon-text">Pending<br/>{value}</p>
            <p className="text-gray-600 card-icon-text">Approved<br/>{change}</p>
            <p className="text-gray-600 card-icon-text">Rejected<br/>{changeType}</p>
          </div>
        )}
        {cradType === 'users' && (
          <div className='flex gap-2'>
            <p className="text-gray-600 card-icon-text">Register<br/>{value}</p>
            <p className="text-gray-600 card-icon-text">Active<br/>{change}</p>
          </div>
        )}
      </div>
      {
    cradType === 'ads' ? (
        <img src={icons} alt='adsicon' className='w-16 h-16 mt-5' />
    ) : (
        <img src={icons} alt='adsicon' className='w-16 h-16 mt-5 ml-20' />
    )
}

    </div>
  );
}