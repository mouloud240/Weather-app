type infoprops={
    city:string
    main:string
    temperature:string
    
}
type capsprops={
  word:string
}
const Info = ({city,main,temperature}:infoprops) => {
 
city=city.charAt(0).toUpperCase() + city.slice(1);
  return (
    <div className="flex flex-col gap-5">
        <h1 className="text-2xl">
        Today
        </h1>
        <h1 className="font-bold text-7xl">
          {city}
        </h1>
        <h1 className="text-2xl">
          Temperutare : {temperature} ℃
        </h1>
        <h1 className="text-2xl">
             {main}
        </h1>
        


    </div>
  )
}

export default Info