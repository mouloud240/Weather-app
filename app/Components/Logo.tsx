import Image from 'next/image'
import React from 'react'
type logoprops={
  logo:string;
}
const Logo = ({logo}:logoprops) => {
  return (
    <section>
          <Image
    src={`images/${logo}.svg`}
    alt='cloudy moon'
    width={300}
    height={300}
    />
    </section>
  
  )
}

export default Logo