import React from 'react'
import Storage from "../service/Storage"

function Cities({name, label, handleChange, ...rest}) {

  const cities = Storage.get('cities') ?? []
    
  return (
    <select
      onChange={handleChange}
      name={name}
      {...rest}>
      {cities.map(city => {
        return (
          <option key={city.id} value={label ? city.name : city.id}>{city.name}</option>
        )
      })}
    </select>
  )
}

export default Cities