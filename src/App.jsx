import { useEffect, useState } from "react";
import { Login, Logout } from "../src/store/authSlice";
import authentication from "./appwrite/authservices";
import { useDispatch } from "react-redux";
import  Header  from "./componets/header/Header";
import Footer from "./componets/footer/Footer";
import { Outlet } from "react-router-dom";


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authentication.getUser()
      .then((userData) => {
        if (userData) {
          dispatch(Login({ userData }));
        } else {
          dispatch(Logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-white to-blue-500 text-white flex flex-col">
      <Header />
      <main className="flex-1  flex justify-center items-center p-6">
        <div className="max-w-4xl w-auto bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-xl p-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
