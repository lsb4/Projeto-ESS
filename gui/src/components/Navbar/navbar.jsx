import Container from './container'

import'./NavBar.modules.css'
import logo from '../../img/image 2.svg'
import Home from '../../img/Home.svg'
import Library from '../../img/Library.svg'
import { useEffect } from 'react'
import axiosInstance from '../common/server'

function NavBar(){
//     useEffect((axiosInstance)=>{
//         async function fetchCategories() {
//             const response = await axiosInstance({
//               method: "post",
//               url: `/getUser`,
//               headers: {},
//               data: {
//                 category: parseInt(localStorage.getItem(''),10)
//               },
//             });
//             let val = await response.data
//             return val
//         }
//     })
    return(
        <nav className='navbar'> 
            <Container>
                <div className='ajusteProfile'>
                    <table className='profilePosition'>
                        <tr>
                            <td>
                                <img src={logo} alt = "Costs"/>
                            </td>
                            <td className='text-user'>
                                maya <br />
                                view profile
                            </td>
                        </tr>
                    </table>
                </div>
                <div className='ajusteOptions'>
                    <ul className = 'list'>
                        <li className="HomeAdjust">
                            <a href='/'>
                                <img className="HomeAdjustImage" src={Home} alt="" />
                            </a>
                        </li>
                        <li className="LibraryAdjust">
                            <a href='/listPlaylistByCategory'>
                                <img className="LibraryAdjustImage" src={Library} alt="" />
                            </a>
                        </li>
                        <li className="item">
                            <input className='lupa' type="text" name='Artists, songs, or podcasts' placeholder='Artists, songs, or podcasts' />
                        </li>
                    </ul>
                </div>
            </Container>
      </nav>
    )
}