import { useEffect, useState } from "react";
import BonusTable from "../Components/Bonus/BonusTable";
import UserBonus from "../Components/Bonus/UserBonus";
import axios from "axios";
import Footer from "../Components/Footer/Footer";

export default function Bonus(){
    const [data, setData] = useState()
    const getBonus = async () =>{
        try{
            const response = await axios.get('/bonus/get-bonus-information-me',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            setData(response.data)
        }catch(error){

        }
    }
    useEffect(()=>{
        getBonus()
    },[])

    console.log(data)
    return(
        <div className="pt-[100px]">
            <UserBonus data={data}/>
            <BonusTable data={data?.more}/>
            <Footer/>
        </div>
    )
}