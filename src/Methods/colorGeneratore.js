// generate unique random colors
export const generateColors = (count) => {
  const generated = new Set();  // to avoid duplicates
  const result = [];

  while (result.length < count) {
    // create a random hex color
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // only add if not already generated
    if (!generated.has(color)) {
      generated.add(color);
      result.push(color);
    }
  }
  return result;
};


export const process = (emails,fields,category) => {
    // reset amounts
    const updatedFields = fields.map((f) => ({ ...f, amount: 0 }));

    emails.forEach((email) => {
      const items = email.items || [];
      for (let item of items) {
        const itemName = item.name.toLowerCase();
        for (let key in category) {
            for (let keyword of category[key]) {
                if(keyword.toLowerCase() === itemName) {
                    console.log(`Matched ${itemName} to category ${key}`);
                    const fieldIndex = updatedFields.findIndex(
                        (f) => f.name === key
                    );
                    if (fieldIndex !== -1) {
                        console.log(`Updating ${key} with amount ${item.price}`);
                        updatedFields[fieldIndex].amount += item.price;
                    }
                }
            }
        }
      }
    });
    // sort the fields by amount in descending order
    updatedFields.sort((a, b) => b.amount - a.amount);
    return [...updatedFields];
  };
