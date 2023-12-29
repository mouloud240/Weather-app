import Image from "next/image"
import DayOfWeekComponent from "./DayOfWeekComponent"

type dayprops={
  icon:string
  temp:string
  day:string
}
const Days = ({icon,temp,day}:dayprops) => {
  let mday=day.slice(0  ,day.indexOf(' '))
  return (
    <section>
      <div className="p-2  flex flex-col justify-center mt-[-90px] rounded-3xl shadow-xl bg-white bg-opacity-55">
        <div>
          
          <DayOfWeekComponent dateString={mday}/>
        </div>
        <div>
          <Image
          src={`images/${icon}.svg`}
          alt="temp"
          width={100}
          height={100}
          />
        </div>
        <div className="text-md text-center">
          {temp} ℃
        </div>
      </div>

    </section>
   
    
  )
}

export default Days