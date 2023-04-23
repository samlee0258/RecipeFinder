import MenuDrawer from "./MenuDrawer"

const menu = {
  menuHeading: 'Menu',
  menuItems: ['Home', 'Favorites']
}

export default function Navbar() {
  return (
    <div className="nav">
      <a href="/" className="site-title">RecipeFinder</a>
      <MenuDrawer menuHeading={menu.menuHeading} menuItems={menu.menuItems}/>
    </div>
  )
}
