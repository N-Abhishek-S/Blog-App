import React from "react";
import { useId } from "react";
import { forwardRef } from "react";

const InputComponents = forwardRef(function InputComponents(
  {
    /*forwardRef use case is following:-
    This is a component and we will use this in many places.
    So whenever we use this component we will need it's state access.
    But we are not putting our state in this component because it'separate component.
    But we need it's state in other component and for that we need to use forwardRef
    For reference of this component. because we has to now what is the state of this component
    */
    label,
    type = "text",
    className = "",
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label //if user pass label then show this component otherwise it will not show
          className="inline-block pl-1 mb-1"
          htmlFor={id}
        >
          {/*The htmlFor attribute links a <label> element to an input element by specifying the id of the input.
                   This improves accessibility and makes it easier for users to interact with forms.*/}

          {label}
        </label>
      )}

      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full
         ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default InputComponents;
