import React from 'react'

function Components({
    children,
    textColor = 'text-white',
    bgColor = 'bg-blue-500',
    type = '',
    className = '',
    ...props
}) {
  return (
    <button className={`px-6 py-2 duration-200 rounded-full ${textColor} ${bgColor} ${className}`} type={type} {...props}>
        {children}
    </button>
  )
}

export default Components
