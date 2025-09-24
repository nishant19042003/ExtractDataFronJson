export const giveTime=async(time)=>{
    let response=[];
    if(time=="1day"){
        console.log("1day");
        const date = new Date();
        // date of today - 1 day
    } 
    else if(time=="1week") {
        console.log("1week");
        const date = new Date();
        // date of today - 7 days
    }
    else if(time=="1month") {
        console.log("1month");
        const date = new Date();
        //name 
    }
    else if(time=="3months") {
        console.log("3months");
        const date = new Date();
        const last3Months = new Date(date.getFullYear(), date.getMonth() - 3, date.getDate());
        return last3Months;
    }
    else if(time=="6months") {
        console.log("6months");
        const date = new Date();
        const last6Months = new Date(date.getFullYear(), date.getMonth() - 6, date.getDate());
        return last6Months;
    }
    else if(time=="1year") {
        console.log("1year");
        const date = new Date();
        const lastYear = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
        return lastYear;
    }
    else return 0;
}