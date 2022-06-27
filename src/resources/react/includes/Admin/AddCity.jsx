import React, {useState} from 'react'
import AdminService from '../../service/AdminService';

function AddCity ({cities}) {

  const updateCity = async id => {
    await AdminService.updateCity(id, {
      name: editCity
    })
    .then(e => {
      console.log(e);
    })
    .catch(e => {
      console.log(e);
      setCityId()
    })
    setCityId()
  }
  const addCity = e => {
    AdminService.addCity({
      name: cityValue
    })
    .then(e => {
      console.log(e);
    })
  }

  const [cityValue, setCityValue] = useState('')
  const [cityId, setCityId] = useState()
  const [editCity, setEditCity] = useState('')

  const [search, setSearch] = useState('')

  const filtered = cities.filter(city => {
    return city.name.toLowerCase().includes(search)
  })



  return (
    <div className="add-city">
      <h2>Довление города</h2>
      <div className="add-city-inner">
        <div className="add-city-form">
          <form className="regform">
              <div className="regform-inputs">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Название города"
                  value={cityValue}
                  onChange={e => setCityValue(e.target.value)}
                />
                <button type="button" onClick={addCity}>
                  Добавить город
                </button>
              </div>
          </form>
        </div>
          <div className="app-search">
            <input type="text" placeholder="Поиск по городу" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        <div className="city-column">
          <div className="admin-table">
            <div className="admin-table-inner">
              <div className="admin-table-head">
                <div className="admin-table-head-item">Id города</div>
                <div className="admin-table-head-item">Название города</div>
                <div className="admin-table-head-item">Редактирование</div>
              </div>
              {filtered.map(city => {
                  return (
                    <div className="admin-table-body" key={city.id}>
                      <div className="admin-table-item">{city.id}</div>
                      <div className="admin-table-item">{city.name}</div>
                      <div className="admin-table-item">
                      {cityId === city.id ? 
                        <button onClick={e => updateCity(city.id)}>
                          изменить
                        </button>
                        :
                        <button onClick={e => setCityId(city.id)}>
                          редактировать
                        </button> 
                      }
                      {cityId === city.id 
                        ? <input type="text" value={editCity} onChange={e => setEditCity(e.target.value)} placeholder="Введите название города" /> 
                        : null}
                      </div>
                    </div>
                  )
                })} 
            </div>
          </div>
        </div>
  
      </div>
    </div>
  )
}

export default AddCity
