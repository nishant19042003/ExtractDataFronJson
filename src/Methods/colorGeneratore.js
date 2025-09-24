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

function parseDate(input) {
  if (!input) {
    console.error("parseDate: empty value");
    throw new Error("No date provided");
  }

  let s = String(input).trim();

  // --- Numeric timestamps ---
  if (/^-?\d+$/.test(s)) {
    const n = Number(s);
    if (s.length === 10) return new Date(n * 1000); // unix seconds
    return new Date(n); // ms
  }

  // remove ordinal suffixes (1st, 2nd, 3rd, 4th)
  s = s.replace(/\b(\d{1,2})(st|nd|rd|th)\b/gi, "$1");

  // normalize punctuation
  s = s.replace(/,/g, " ").replace(/[\/\-\._]/g, " ").replace(/\s+/g, " ").trim();

  // --- Native parsing ---
  let d = new Date(s);
  if (!isNaN(d)) return d;

  // --- Month name map ---
  const months = {
    jan: 0, january: 0,
    feb: 1, february: 1,
    mar: 2, march: 2,
    apr: 3, april: 3,
    may: 4,
    jun: 5, june: 5,
    jul: 6, july: 6,
    aug: 7, august: 7,
    sep: 8, sept: 8, september: 8,
    oct: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, december: 11,
  };
  const monthNamesRegex = Object.keys(months).join("|");

  function buildDate(y, m, d, h = 0, min = 0, sec = 0) {
    const dt = new Date(Number(y), Number(m), Number(d), Number(h || 0), Number(min || 0), Number(sec || 0));
    return isNaN(dt) ? null : dt;
  }

  // --- "17 Sep 2025" ---
  let re = new RegExp(`^(\\d{1,2})\\s+(${monthNamesRegex})\\s+(\\d{4})(?:\\s+(\\d{1,2}):(\\d{2})(?::(\\d{2}))?)?$`, "i");
  let m = s.match(re);
  if (m) {
    const day = m[1], mon = months[m[2].toLowerCase()], year = m[3];
    return buildDate(year, mon, day, m[4], m[5], m[6]);
  }

  // --- "Sep 17 2025" ---
  re = new RegExp(`^(${monthNamesRegex})\\s+(\\d{1,2})\\s+(\\d{4})(?:\\s+(\\d{1,2}):(\\d{2})(?::(\\d{2}))?)?$`, "i");
  m = s.match(re);
  if (m) {
    const mon = months[m[1].toLowerCase()], day = m[2], year = m[3];
    return buildDate(year, mon, day, m[4], m[5], m[6]);
  }

  // --- Pure numeric tokens ---
  const parts = s.split(" ");
  if (parts.length >= 3 && /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1]) && /^\d+$/.test(parts[2])) {
    const a = Number(parts[0]), b = Number(parts[1]), c = Number(parts[2]);

    if (String(parts[0]).length === 4) {
      // YYYY MM DD
      return buildDate(a, b - 1, c);
    }
    if (String(parts[2]).length === 4) {
      // DD MM YYYY or MM DD YYYY
      const y = c;
      const DEFAULT_DAY_FIRST = true; // change to false for MM/DD default

      if (a > 12 && b <= 12) return buildDate(y, b - 1, a);
      if (b > 12 && a <= 12) return buildDate(y, a - 1, b);
      return DEFAULT_DAY_FIRST ? buildDate(y, b - 1, a) : buildDate(y, a - 1, b);
    }
  }

  // --- Compact ISO 20250917 ---
  m = s.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (m) return buildDate(m[1], m[2] - 1, m[3]);

  // --- Last resort ---
  d = new Date(String(input));
  if (!isNaN(d)) return d;

  console.error("Failed to parse date:", input);
  throw new Error("Unsupported date format: " + input);
}

function addOrderToMonth(orderDate, monthslist, orderAmount) {
  console.log("addOrderToMonth called with:", orderDate, orderAmount);
  if (!orderDate) {
    console.warn("addOrderToMonth: empty orderDate");
    return;
  }
  const date = parseDate(orderDate);
  const monthIndex = date.getMonth(); // 0 = Jan ... 11 = Dec
  console.log("monthIndex:", monthIndex);
  monthslist[monthIndex].amount += Number(orderAmount || 0);
}


export const process = (emails,fields,category,monthslist) => {
    // reset amounts
    const updatedFields = fields.map((f) => ({ ...f, amount: 0 }));
    
    emails.forEach((email) => {
      const items = email.items || [];
      for (let item of items) {
        const itemName = item.name.toLowerCase();
        for (let key in category) {
            for (let keyword of category[key]) {
                if(keyword.toLowerCase() === itemName) {
                    
                    const fieldIndex = updatedFields.findIndex(
                        (f) => f.name === key
                    );
                    if (fieldIndex !== -1) {
                        console.log(`Updating ${key} with amount ${item.price}`);
                        //addOrderToMonth(email.orderDate, monthslist, item.price);
                        updatedFields[fieldIndex].amount += item.price;
                    }
                }
            }
        }
      }
    });
    
    updatedFields.sort((a, b) => b.amount - a.amount);
    console.log(monthslist)
    return { updatedFields, monthslist };
  };
  