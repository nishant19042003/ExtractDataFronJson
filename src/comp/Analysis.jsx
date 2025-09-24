import React, { useEffect } from 'react'
import { companyCategories } from '../categories/categories.js'
function Analysis({ data }) {
    useEffect(() => {
        data.forEach(email => {
            companyCategories.forEach(category => {
                if(email.company===category.name){
                    category.amount += email.totalAmount;
                    console.log(email.company, email.totalAmount, category.amount);
                }
            });
        });
        //sort categories by amount in descending order
        //companyCategories.sort((a, b) => { if (b.amount >= a.amount) { const z = a; a = b; b = z; } });
        console.log(companyCategories);
    }, [data]);
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold text-gray-800'>Analysis</h2>
      <p className='text-gray-600'>Total Invoices: {data.length}</p>
      <p className='text-gray-600'>Total Amount: ₹{data.reduce((acc, email) => acc + email.totalAmount, 0).toFixed(2)}</p>
        <div className='mt-4'>
          {companyCategories.map(category => (
            <div key={category.name} className='flex justify-between'>
              <span className='text-gray-600 font-medium'>{category.name}</span>
              <span className='text-gray-600 font-medium'>₹{category.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className='mt-4 flex justify-between'>
            <span className='text-gray-800 font-semibold '>Most Spending On  :  </span>
             {companyCategories.reduce((max, category) => category.amount > max.amount ? category : max, {name: '', amount: 0}).name}   ₹{companyCategories.reduce((max, category) => category.amount > max.amount ? category : max, {name: '', amount: 0}).amount.toFixed(2)}
        </div>
    </div>
  )
}

export default Analysis
