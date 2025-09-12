import { categories } from "../categories/categories";
import { responce } from "../Responce/responce";
const detectCategory = (itemName) => {
    if (!itemName) return "Other";
    const lower = itemName.toLowerCase().trim();

    for (const [category, keywords] of Object.entries(categories)) {
      if (!Array.isArray(keywords)) continue;
      // check if any keyword appears in the item string
      if (keywords.some((kw) => kw && lower.includes(kw.toLowerCase()))) {
        return category;
      }
    }
    return "Other"; 
};

function checkPaidTo(str) {
  const pattern = /^paid to\s+(.+)/i; // regex: starts with "paid to" then capture rest
  const match = str.match(pattern);

  if (match) {
    return { success: true, name: match[1].trim() };
  } else {
    return { success: false, name: null };
  }
}
const add=(fields,category,ammount)=>{
    fields.map((field)=>{
        if(field.name===category){
            field.amount+=ammount;
        }
    })
    return fields;
}   
export const processTransactions = (fields) => {
    const newfields=fields;
     newfields.forEach((field) => {
        console.log(field);
        field.amount =0;
    });
    responce.transactions.forEach((transaction) => {
        
        const { success, name } = checkPaidTo(transaction.description);
        if (success) {
            const category = detectCategory(name);
            console.log(`Transaction "${transaction.description}" categorized as "${category}"`);
            add(newfields, category, Math.abs(transaction.amount));
        }
        
    });
    return newfields;
}

