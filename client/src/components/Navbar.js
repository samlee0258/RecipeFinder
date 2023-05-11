import { Link } from "react-router-dom";
import MenuDrawer from "./MenuDrawer";

const menu = {
  menuHeading: 'Menu',
  menuItems: ['Favorites']
}

export default function Navbar() {
  return (
    <div className="nav">
      <Link to="/" className="site-title">RecipeFinder</Link>
      <MenuDrawer menuHeading={menu.menuHeading} menuItems={menu.menuItems}/>
    </div>
  )
}
