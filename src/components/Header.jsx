import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Contexto from "../Contexto";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from '@mui/icons-material/Home';

export default () => {
  const { loguejat, setLoguejat } = useContext(Contexto);
  const redirect = useNavigate();

  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoguejat(null);
    redirect("/login"); // Utiliza navigate para redirigir
  };

  return (
    <header>
      <div className="flex flex-row justify-between p-4 bg-cream-header border-b border-header-border">
        <h1 onClick={() => redirect("/Home")}>Hanami</h1>
        <div className=" flex flex-row gap-2 ">
          {!loguejat && ( // Muestra solo si no está logueado
            <>
              <Link to="/login" className="rounded-md border">
                Login
              </Link>
              <Link to="/register" className="rounded-md border">
                Register
              </Link>
            </>
          )}
          {loguejat && ( // Muestra solo si está logueado
            <>
              <PowerSettingsNewIcon onClick={logout} />
              <PersonIcon onClick={() => redirect("/miperfil")} />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
