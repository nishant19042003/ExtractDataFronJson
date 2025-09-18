import axios from 'axios';
export const getresponce = async(pdf)=>{
        //make a post request to backend with file pdf
        const Responce = await axios.post('http://localhost:5000/api/v1/paytm',{
                headers: {
                        'Content-Type': 'application/pdf'
                },
                file: pdf
        });
        return Responce.data;
}