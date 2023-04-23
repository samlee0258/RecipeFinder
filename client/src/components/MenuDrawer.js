import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import './MenuDrawer.css';

export default function MenuDrawer({ menuHeading, menuItems }) {
  const [isOpened, setIsOpened] = useState(false);
  const [lastClicked, setLastClicked] = useState('');

  function handleLastClicked(item) {
    item !== lastClicked && setLastClicked(item);
    handleMenu();
  }

  function handleMenu() {
    setIsOpened(!isOpened);
  }


  return (
    <div className='container'>
      {!isOpened && <button className='menu-button' onClick={handleMenu}><FaBars size={28} /></button>}
      <div className={isOpened ? 'menu show' : 'menu hide'}>
        <h2 className='menu-heading'>{menuHeading}</h2>
        <ItemLinks items={menuItems} handleLinkClick={handleLastClicked} />
      </div>
      <div className='overlay'
        onClick={handleMenu}
        style={{ opacity: isOpened ? 0.5 : 0, pointerEvents: isOpened ? 'all' : 'none' }}>
      </div>
    </div>
  )
}

function ItemLinks({ items, handleLinkClick }) {
  const itemLinks = items.map((item) => <a href={`${item}`} className='menu-item' key={item} onClick={() => handleLinkClick(item)}>{item}</a>)

  return (
    <>
      {itemLinks}
    </>
  )
}
