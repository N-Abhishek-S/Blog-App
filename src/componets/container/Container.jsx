import React from 'react'

function Container({children}) { /*Here we are creating a container which store a our styling property means whenever 
                                   we need this styling will give our component as prop*/
  return (
    <div className='w-full max-w-7xl max-auto px-4 '>
        {children}
    </div>
  )
}

export default Container
