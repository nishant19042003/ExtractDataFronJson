import React, { useState} from 'react'
import { fields } from '../categories/categories'
import { processTransactions } from '../InvoiceProcess/paytm'
import PdfViewer from '../comp/pdfViewer'
function ExpaceTracker() {
    const [currfields, setcurrFields] = useState(fields);
    const [data,setdata]=useState(0);
    // detect category by searching keywords (first match wins)
    const process = () => {
        const processedFields = processTransactions(currfields);
        setcurrFields(processedFields);
        setdata(data+1);
    }
    

  return (
    <div>
        <h1 className='text-3xl font-bold underline bg-amber-300 text-center p-5'>Expense Tracker</h1>
        
        <PdfViewer/>
        
        
      {
        currfields.map((field)=>{
        if(field.amount!== 0)  return (
            //amount and name in one line and gape between them make it look good
            <div key={field.id} className='border-2 border-black m-5 p-5   '>
              <h1 className='text-2xl font-bold inline '>{field.name}</h1>  
              <div className='inline-block ml-5'>
                <h1 className='text-xl font-semibold inline'>Amount : {field.amount}</h1>
              </div>
            </div>
          )
        })
      }
        <div className='text-center'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={process}>Process Transactions</button>
        </div>
    </div>
    
  )
}

export default ExpaceTracker
