import React, { useState } from 'react'
import { HiMenuAlt3, HiUser, HiHome } from 'react-icons/hi'
import { MdSpaceDashboard } from 'react-icons/md'
import { AiOutlineDown } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'


const Sidebar = (  ) => {
    const [sidebar, setSidebar] = useState(true);
    const [submenu, setSubmenu] = useState(true);

    const menus = [
        { title: 'user', link:'/user' ,icon: HiUser },
        { title: 'workplace', link: '/workplace', icon: MdSpaceDashboard },
        { title: 'home', link: '/', icon: HiHome }
        
    ];



  return (
    <div className='flex gap-6'>
        <div className={ `bg-[#0e0e0e] min-h-screen ${sidebar ? 'w-72' : 'w-16'} duration-500 text-gray-100 px-4` }>
            <div className='py-3 flex justify-end mb-8'>
                <HiMenuAlt3 size={26} className='cursor-pointer' onClick={() => setSidebar( !sidebar )}/>
            </div>
            <div className='mt-4 flex flex-col gap-4 relative'>
                { menus?.map(( menu, index ) => (
                    <NavLink 
                        to={ menu?.link }
                        key={ index }
                        className={`flex items-center text-sm gap-3.5 font-medium p-2`}
                    >   
                        
                        <div>{ React.createElement( menu?.icon, { size:'20' } ) }</div>
                        <h2 className={`whitespace-pre duration-500 ${!sidebar && 'opacity-0 overflow-hidden'}`}>{menu?.title}</h2>
                        
                    </NavLink>
                    
                ))}
            </div>
            
        </div>
    </div>
  )
}

export default Sidebar