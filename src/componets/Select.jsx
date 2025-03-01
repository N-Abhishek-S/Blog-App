import React,{forwardRef, useId} from 'react'

function Select({
    options,    //whenever user pass options we will gate it in array every time
    label,
    className="",
    ...props

}, ref) {
    const id = useId()
  return (
    <div>
      {label &&
     <label htmlFor={id} className={`${className}`}></label>  }
     <select
      {...props}
       id={id} 
       ref={ref} 
       className={`px-4 py-2 rounded-lg bg-white text-black
        outline-none focus:bg-gray-50 duration-200 border
         border-gray-200 w-full 
         ${className}`
         }>
        { options?.map((options)=>(
            <option key={options} value={options}>
                {options}
            </option>
        ))
        }
     </select>
    </div>
  )
}

export default forwardRef(Select) //This is the another way to wrap the component with forwardRef
