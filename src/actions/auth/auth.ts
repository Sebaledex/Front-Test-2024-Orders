import { serviceAxiosApi } from "../../config/api/serviceAxiosApi";
import { User } from "../../domain/entities/user.entity";
import { AuthResponse } from "../../infrastructure/interfaces/auth.responses";

const returnUserToken = (data: AuthResponse) => {
  console.log("Processing AuthResponse:", data); // Log para depuración

  const user: User = {
    id: data.user_id,
    // rol1: data.user_role, // Descomenta si se necesita
    name: data.name || '',
    username: data.username || '',
    email: ""
  };

  return {
    user,
    access_token: data.access_token,
    user_id: data.user_id,
  };
};

export const authLogin = async (username: string, password: string) => {
  try {
    const { data } = await serviceAxiosApi.post<AuthResponse>('/v2/auth/signin', {
      username,
      password,
    });
    console.log("Login Response:", data); // Log para depuración
    return returnUserToken(data);
  } catch (error) {
    console.error("Error in authLogin:", error); // Muestra el error completo
    return null;
  }
};

export const authSignup = async (name: string, username: string, email: string, password: string) => {
  email = email.toLowerCase();
  try {
    const { data } = await serviceAxiosApi.post<AuthResponse>('/v2/auth/signup', {
      name,
      username,
      email,
      password,
    });
    console.log("Signup Response:", data); // Log para depuración
    return returnUserToken(data);
  } catch (error) {
    console.error("Error in authSignup:", error); // Muestra el error completo
    return null;
  }
};
