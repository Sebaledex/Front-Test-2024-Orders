import { create } from "zustand";
import { User } from "../../../domain/entities/user.entity";
import { authLogin, authSignup } from "../../../actions/auth/auth";
import { useNavigation } from "@react-navigation/native";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthState {
  status: AuthStatus;
  access_token?: string;
  user?: User;

  login: (username: string, password: string) => Promise<boolean>;
  signup: (name: string, username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  access_token: undefined,
  user: undefined,

  login: async (username: string, password: string) => {
    console.log("Attempting login with username:", username); // Log para depuración
    const resp = await authLogin(username, password);

    if (!resp || !resp.access_token || !resp.user_id) {
      console.error("Login failed, response invalid:", resp); // Log del fallo
      set({ status: 'unauthenticated', access_token: undefined, user: undefined });
      return false;
    }

    console.log("Login successful, saving token and user_id"); // Log de éxito
    await StorageAdapter.setItem('token', resp.access_token);
    await StorageAdapter.setItem('user_id', resp.user_id);

    set({ status: 'authenticated', access_token: resp.access_token, user: resp.user });
    return true;
  },

  signup: async (name: string, username: string, email: string, password: string) => {
    console.log("Attempting signup with email:", email); // Log para depuración
    const resp = await authSignup(name, username, email, password);

    if (!resp || !resp.access_token || !resp.user_id) {
      console.error("Signup failed, response invalid:", resp); // Log del fallo
      set({ status: 'unauthenticated', access_token: undefined, user: undefined });
      return false;
    }

    console.log("Signup successful, user registered:", resp.user); // Log de éxito
    set({ status: 'authenticated', access_token: resp.access_token, user: resp.user });
    return true;
  },

  logout: async () => {
    console.log("Logging out user"); // Log para depuración
    await AsyncStorage.multiRemove(['token', 'user_id']);
    set({ status: 'unauthenticated', access_token: undefined, user: undefined });
  },
}));
