import '../ComNav/Nav.css'
import { Link } from 'react-router-dom'
function Navigate(){
    return(
<div className="Navcontainer">   
<h1 className='NavHeader'>GameVerse</h1>
    <Link to ='/' className='NavHomeLink'>Home</Link>
           </div>
    )
}
export default Navigate