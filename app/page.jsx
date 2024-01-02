"use client"
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState,useRef } from 'react';
import Info from './Components/Info';
import Days from './Components/Days';
import Logo from './Components/Logo';
const Home =()=>{
  const [info,setinfo]=useState({
    icon:"",
    Temp:"",
    description:"" ,
  city_name:""
  })
    
    const[firstclick,setfirstslick]=useState(false)
  const [InputValue,SetInputValue]=useState("")
  const[fetchdata,setfetchdata]=useState(false)
  const [placeholder,setplaceholder]=useState('Search for a city ...')
  const [event,setevent]=useState(false)
  const [days, setdays] = useState([
    { icon: "", Temp: "", Day: "" },
    { icon: "", Temp: "", Day: "" },
    { icon: "", Temp: "", Day: "" },
    { icon: "", Temp: "", Day: "" },
  ]);
  const [wrong,Setwrong]=useState(false);
  let Searchfirst=useRef(null)
  let Search=useRef(null)
  const handlekeyfirstpress =(e)=>{
     if(e.key=="Enter"){
      setfirstslick(true)
      setfetchdata(true)
      e.preventDefault()
      SetInputValue(Searchfirst.current.value)
      setevent(!event)

     }
  }
  const handlekeypress=(e)=>{
    if (e.key=="Enter"){
      setfetchdata(true)
      SetInputValue(Search.current.value.charAt(0).toUpperCase() + Search.current.value.slice(1)
      )
      e.preventDefault()
      Search.current.value = ""
    }
  }
   const Api_url=`https://api.openweathermap.org/data/2.5/forecast?q=${InputValue}&APPID=6359d484b1811ba80ef01e33a7c9bb9b&lang=en`
   useEffect(()=>{
    
      if (fetchdata){
        axios.get(Api_url).then((res)=>{
          let copyinfo={...info}
          copyinfo.description=res.data.list[0].weather[0].description
          copyinfo.icon=res.data.list[0].weather[0].icon
          copyinfo.Temp=Math.floor(res.data.list[0].main.temp-272.15)
          copyinfo.city_name=res.data.city.name
          setinfo(copyinfo) 
          var copydays = [];

          let cpt = 0;
          for (let i = 1; i < 30; i += 7) {
            // Initialize the object before accessing its properties
            copydays[cpt] = {
              icon: res.data.list[i + 7].weather[0].icon,
              Temp: Math.floor(res.data.list[i + 7].main.temp - 272.15),
              Day: res.data.list[i + 7].dt_txt,
            };
            cpt++;
          }
          setplaceholder('Search for a city ...')
          setdays(copydays);
        }
        
        ).catch((err)=>{  setfirstslick(false);
          setplaceholder('Please Enter a Valid city name');
          Setwrong(true)
          if (!days[1].icon){setfirstslick(false)}
        })
        
        
      } 
      Setwrong(false)
  
    },[InputValue,event])
      

    let border=wrong?"border-red-500":''
    let txtcolor=wrong?"text-red-500":'text-slate-400'

  return (
    
<div className='bg-[url(/images/background.jpg)] w-full h-[100vh] p-0 m-0'>
  { !firstclick&&  <main className='flex justify-center h-full items-center max-sm:p-10'>
     <div className=' bg-white bg-opacity-55 rounded-3xl p-40 flex flex-col gap-10'>
      <h1 className='font-bold text-5xl text-black'>
        Weather forecast
      </h1>
         <div className={`flex justify-center `}>
           <input className={`placeholder:italic placeholder:${txtcolor}  block bg-white w-full border ${border} border-slate-300 rounded-xl py-2 pl-9 pr-3 shadow-lg focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`} placeholder={placeholder} type="text" name="search"  onKeyDown={handlekeyfirstpress} ref={Searchfirst}/>        
      </div>
      </div>

     </main>}


      {firstclick&&<main>
       
        <h1 className='font-bold text-5xl flex justify-center p-4 max-sm:text-2xl max-sm:p-8'>
          Weather app
        </h1>
      <div className='flex justify-center px-10 mx-[30vw] mt-10 h-10 max-sm:h-5 max-sm:mt-5 max-sm:px-5 '>
           
           <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-xl py-2 pl-9 pr-3 shadow-lg focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder={placeholder} type="text" name="search"  onKeyDown={handlekeypress} ref={Search}/>        
      </div>
      <div className=' grid justify-center  m-14 mt-10 p-5 max-sm:p-10 max-sm:mt-7 max-sm:m-10'>
  
      <div className='flex justify-start gap-10  bg-white bg-opacity-55 rounded-3xl  p-16 max-sm:p-20 max-sm:gap-8 '>
          <Logo
          logo={info.icon}
          />
          <Info
          city={info.city_name}
          main={info.description}
          temperature={info.Temp}
          />
      </div>
   
        <div className='flex justify-center gap-4'>
              {days.map((day,index)=>(
                <Days
                key={index}
                icon={day.icon}
                temp={day.Temp}
                day={day.Day}
                />
              ))}
        </div>
      </div>
      </main>}
</div>


  )
 
  
}
export default Home