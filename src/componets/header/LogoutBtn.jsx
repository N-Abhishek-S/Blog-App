import React from "react";
import { useDispatch } from "react-redux";
import { Logout } from "../../store/authSlice"; // ✅ Corrected import
import authentication from "../../appwrite/authservices";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const navigate = useNavigate(); // ✅ Correctly initialize navigate
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await authentication.Logout(); // ✅ Ensure logout function is correct
      dispatch(Logout());
      navigate("/login"); // ✅ Redirect user after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={logoutHandler}
      className="bg-red-500 text-white px-4 py-2 rounded-md"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
