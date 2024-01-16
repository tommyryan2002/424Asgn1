import { useAuth } from "./context/AuthProvider";
import { LoginForm } from "./LoginForm";
export const Home = () => {
  const { value } = useAuth();
  return (
    <>
      <h2>Home (Public)</h2>
      <LoginForm></LoginForm>
  	</>
	);
};