import React, {useState, useEffect} from 'react'
import useForm from '../../includes/LogReg/useForm';
import AdminService from '../../service/AdminService';
import MainService from '../../service/MainService';

const AddUser = ({users, cities, setLoading, succ, fail}) => {

  const defaultAvatar = (process.env.MIX_APP_URL + '/images/default-avatar.jpg')


  const [searchName, setSearchName] = useState("")
  const [searchId, setSearchId] = useState("")
  const [searchRole, setSearchRole] = useState("")

  
   
  
  const [month, setMonth] = useState(1)
  const [roleId, setRoleId] = useState('')
  const [roleIdRemove, setRoleIdRemove] = useState('')
  const [wallet, setWallet] = useState('')
  const [walletId, setWalletId] = useState('')
  const [role, setRole] = useState("curator")
  const [checkBox, setCheckBox] = useState(false)

  const data = {
    user_id: roleId,
    role: role,
    month: month,
  }

  const setUserRole = () => {
    setLoading(true)
    AdminService.setRole(data)
    .then(e => {
      console.log(e);
      succ()
      setLoading(false)
      document.location.reload()
    })
    .catch(e => {
      setLoading(false)
      fail()
      console.log(e);
    })
  }
  const removeRole = () => {
    setLoading(true)
    AdminService.removeRole(roleIdRemove)
    .then(e => {
      console.log(e);
      succ()
      setLoading(false)
      document.location.reload()
    })
    .catch(e => {
      setLoading(false)
      fail()
      console.log(e);
    })
  }
  const getRole = () => {
    MainService.getRole({
      id: roleIdRemove
    })
    .then(e => {
      console.log(e, "role");
    })
  }
  useEffect(e => {
    getRole()
  }, [])
  


  const increaase = () => {
    setMonth(month + 1)
    setCheckBox(false)
  }
  const decrease = () => {
    if (month > 1) {
      setMonth(month - 1)
      setCheckBox(false)
    }

  }

  const handleCheckBox = e => {
    if (month != null) {
      setMonth(null)
      setCheckBox(true)
    } else {
      setMonth(1)
      setCheckBox(false)
    }
  }
  
 
  const admins = users.filter(user => user?.roles?.[0]?.name == 'Admin')
  const curators = users.filter(user => user?.roles?.[0]?.name == 'Curator')
  const busAngels = users.filter(user => user?.roles?.[0]?.name == 'Business Angel')
  const boosters = users.filter(user => user?.roles?.[0]?.slug == 'booster')
  const noRole = users.filter(user => user?.roles?.length < 1)

  const array = admins.concat(curators, busAngels, boosters)

  const searched = array.filter(user => {
    return (
      user.name?.toLowerCase().includes(searchName) &&
      `${user.id}`.includes(searchId) &&
      user?.roles?.[0]?.name.toLowerCase().includes(searchRole)
  )})
  const searchedUser = noRole.filter(user => {
    return (
      user.name?.toLowerCase().includes(searchName) &&
      `${user.id}`.includes(searchId) 
  )})

  const walletData = {
    id: walletId,
    tokens: wallet,
    password: '(Za-(*+(nSw4c=u#',
  }

  const toWallet = e => {
    setLoading(true)
    AdminService.toWallet(walletData)
    .then(e => {
      console.log(e, "data");
      succ()
      setLoading(false)
      document.location.reload()
    })
    .catch(e => {
      console.log(e);
      fail()
      setLoading(false)
    })

  }
  
  return (
    <div className="Add-user">
      <h2>???????????????????? ????????????????????????</h2>
      <div className="Add-user-inner">
      <div className="all-users-table">
        <h2>?????????????? ??????????????????????</h2>
        <div className="admin-table">
          <div className="admin-table-inner">
            <div className="admin-table-head">
              <div className="admin-table-head-item">id ????????????????????????</div>
              <div className="admin-table-head-item">????????</div>
              <div className="admin-table-head-item">????????????????????????</div>
              <div className="admin-table-head-item">????????????????</div>
            </div>
            <div className="admin-table-body">
              <div className="admin-table-item">
                <input 
                  type="number" 
                  placeholder="id ????????????????????????"
                  value={roleId}
                  onChange={e => setRoleId(e.target.value)} />
              </div>
              <div className="admin-table-item">
                <select placeholder="" value={role} onChange={e => setRole(e.target.value)}>
                  <option value="curator">??????????????</option>
                  <option value="b-angel">???????????? ??????????</option>
                  <option value="booster">????????????</option>
                </select>
              </div>
              <div className="admin-table-item">
                <div className="admin_set_month">
                  <button onClick={increaase}>
                    +
                  </button>
                  <output>
                    {month} ??????????
                  </output>       
                  <button onClick={decrease}>
                    -
                  </button>
                  <div style={{marginLeft: '15px'}}>
                    <input type="checkbox" name="" id="" onChange={handleCheckBox}
                    checked={checkBox ? true : false}/>
                    <span>????????????????</span>
                  </div>
                </div>

              </div>

              <div className="admin-table-item">
                <button className="admin_setrole_btn" onClick={setUserRole}>????????????</button>
              </div>
            </div>
            <div className="admin-table-body">
              <div className="admin-table-item">
                <input 
                  type="text" 
                  placeholder="id ????????????????????????"
                  value={roleIdRemove}
                  onChange={e => setRoleIdRemove(e.target.value)}/>
              </div>
              <div className="admin-table-item">
                <button className="admin_removerole_btn" onClick={removeRole}>
                  ?????????????? ????????
                </button>
              </div>
            </div>
            <div className="admin-table-body">
              <div className="admin-table-item">
                <input 
                  type="text" 
                  placeholder="id ????????????????????????"
                  value={walletId}
                  onChange={e => setWalletId(e.target.value)}/>
              </div>
              <div className="admin-table-item" style={{display: 'flex'}}>
                <input type="number" name="" id="" value={wallet} onChange={e => setWallet(e.target.value)} placeholder="????????????????????"/>
              </div>
              <div className="admin-table-item">
                <button className="admin_setrole_btn"  onClick={toWallet}>??????????????????</button>
              </div>
            </div>
          </div>
        </div>

      <h2>?????????????? ???????? ??????????????????????????</h2>
        <div className="admin-table">
          <div className="admin-table-inner">
            <div style={{display: 'flex'}}>
              <div className="user-search">
                <input type="text"  placeholder="?????????? ???? id" value={searchId} onChange={e => setSearchId(e.target.value)}/>
              </div>

              <div className="user-search">
                <input type="text"  placeholder="?????????? ???? ??????????" value={searchName} onChange={e => setSearchName(e.target.value)}/>
              </div>
              <div className="user-search">
                <input type="text"  placeholder="?????????? ???? ????????" value={searchRole} onChange={e => setSearchRole(e.target.value)}/>
              </div>
            </div>

            <table >
              <tbody>
                <tr>
                <th>Id</th>
                <th>????????</th>
                <th>?????? ????????????????????????</th>
                <th>????????</th>
                <th>???????? (????.)</th>
                <th>email</th>
                <th>??????????????</th>
                <th>??????????</th>
                <th>??????????????????????????</th>
                <th>???????? ????????????????</th>
                </tr>
                {searched.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td >{user.id}</td>
                      <td className="table-img-item">                
                        <img src={user.image ?? defaultAvatar} alt=""/>
                      </td>
                      <td >{user.name}</td>
                      <td >{user?.roles?.map(role => {
                        return <div key={role.id}>{role.name}</div>
                      })}
                      </td>
                      <td >{user.wallet}</td>
                      <td >{user.email}</td>
                      <td >{user.telephone ?? "?????? ????????????"}</td>
                      <td >{cities?.[user?.city_id - 1]?.name ?? "?????????? ???? ????????????"}</td>
                      <td >{user.email_verified_at != null 
                        ? <span style={{color: 'cyan'}}>????</span>
                        : <span>??????</span>
                        }</td>
                      <td >{user?.created_at?.slice(0, 10)}</td>
                    </tr>
                  )
                })}
                {searchedUser.map(user => {
                  return (
                    <tr key={user.id}>
                      <td >{user.id}</td>
                      <td className="table-img-item">                
                        <img src={user.image ?? defaultAvatar} alt=""/>
                      </td>
                      <td >{user.name}</td>
                      <td >{user?.roles?.map(role => {
                        return <div key={role.id}>{role.name}</div>
                      })}
                      </td>
                      <td >{user.wallet}</td>
                      <td >{user.email}</td>
                      <td >{user.telephone ?? "?????? ????????????"}</td>
                      <td >{cities?.[user?.city_id - 1]?.name ?? "?????????? ???? ????????????"}</td>
                      <td >{user.email_verified_at != null 
                        ? <span style={{color: 'cyan'}}>????</span>
                        : <span>??????</span>
                        }</td>
                      <td >{user?.created_at?.slice(0, 10)}</td>
                    </tr>
                  )
                })}
              </tbody>   
            </table> 
          </div>
        </div>
      </div>

      </div>
 
    </div>
  )
}  

export default AddUser





{/* <div style={{display: 'flex'}}>
<div className="user-search">
  <input type="text"  placeholder="?????????? ???? id" value={searchId} onChange={e => setSearchId(e.target.value)}/>
</div>

<div className="user-search">
  <input type="text"  placeholder="?????????? ???? ??????????" value={searchName} onChange={e => setSearchName(e.target.value)}/>
</div>

<div className="user-search">
  <input type="text"  placeholder="?????????? ???? ????????" value={searchRole} onChange={e => setSearchRole(e.target.value)}/>
</div>
</div> */}







// {showForm ? 
//   <div className="reg Add-user-form">
//   <form className="regform" onSubmit={handleSubmit}>
//       <div className="regform-inputs">
//         <input
//               id="name"
//               type="text"
//               name="name"
//               className="form-input"
//               placeholder="?????? ????????????????????????"
//               value={values.name}
//               onChange={handleChange}
//             />
//             {errors.name && <p className="input-error">{errors.name}</p>}
//       </div>
      
//       <div className="regform-inputs">
//         <input
//               id="role"
//               type="text"
//               name="role"
//               className="form-input"
//               placeholder="?????????????? ????????"
//               //  value={values}
//               //  onChange={handleChange}
//             />
//       </div>
    
//       <div className="regform-inputs">
//         <input 
//               id="email"
//               type="email"
//               name="email"
//               className="form-input"
//               placeholder="?????????? ????????????????????????"
//               value={values.email}
//               onChange={handleChange}
//             />
//             {errors.email && <p className="input-error"> {errors.email}</p>}
//       </div>
//       <div className="regform-inputs">

//         <input 
//               id="password"
//               type="password"
//               name="password"
//               className="form-input"
//               placeholder="???????????????????? ????????????"
//               value={values.password}
//               onChange={handleChange}
//             />
//             {errors.password && <p className="input-error">{errors.password}</p>}
//       </div>

//       <div className="regform-inputs">
//         {/* <label htmlFor="password_confirmation" className="form-label">
//             ?????????????????????????? ????????????
//         </label> */}
//         <input 
//               id="password_confirmation"
//               type="password"
//               name="password_confirmation"
//               className="form-input"
//               placeholder="?????????????????????? ????????????"
//               value={values.password_confirmation}
//               onChange={handleChange}
//             />
//             {errors.password_confirmation && <p className="input-error">{errors.password_confirmation}</p>}
//       </div>
//       <div className="form-create">
//       <button className="form-input-btn" type="submit">
//         ?????????????? ??????????????
//       </button>
//       {/* <span className="form-input-login">
//         <br/> ?????? ????????????????????????????????? ???????????? "
//         <Link to= "/login">
//             ?????????? ??????????
//         </Link>".
//       </span> */}
//       </div>
//   </form>
//   </div>
//   : 
//   null
// }