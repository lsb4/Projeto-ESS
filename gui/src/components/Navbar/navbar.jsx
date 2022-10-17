import Container from './container'

import'./NavBar.modules.css'
import logo from '../img/image 2.svg'
import Home from '../img/Home.svg'
import Library from '../img/Library.svg'

function NavBar(){
    return(
        <nav className='navbar'> 
            <Container>
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
                <ul className = 'list'>
                    <li className="HomeAdjust">
                        <img className="HomeAdjustImage" src={Home} alt="" />
                    </li>
                    <li className="LibraryAdjust">
                    <img className="LibraryAdjustImage" src={Library} alt="" />
                    </li>
                    <li className="item">
                        <input className='lupa' type="text" name='Artists, songs, or podcasts' placeholder='Artists, songs, or podcasts' />
                    </li>
                </ul>
            </Container>
      </nav>
    )
}

export default NavBar