import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { demoUser } from "../data/mockData";
import { auth, firebaseEnabled } from "../lib/firebase";
import { createDefaultUser, ensureUserProfile, getUserProfile } from "../services/users";
import type { UserProfile } from "../types";

interface AuthContextValue {
  firebaseUser: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  demoLogin: () => void;
  logout: () => Promise<void>;
  setProfile: (profile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(firebaseEnabled ? null : demoUser);
  const [demoSession, setDemoSession] = useState(!firebaseEnabled);
  const [loading, setLoading] = useState(firebaseEnabled);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    return onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        const userProfile =
          (await getUserProfile(user.uid)) ||
          (await ensureUserProfile({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }));
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!auth) {
      setProfile(demoUser);
      setDemoSession(true);
      return;
    }
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    await ensureUserProfile({
      uid: result.user.uid,
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
    });
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    if (!auth) {
      setProfile({ ...demoUser, email: email || demoUser.email });
      setDemoSession(true);
      return;
    }
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signUpWithEmail = useCallback(
    async (email: string, password: string, displayName: string) => {
      if (!auth) {
        setProfile({
          ...createDefaultUser({ uid: `demo-${Date.now()}`, email, displayName }),
          credits: 10,
          totalEarned: 10,
        });
        setDemoSession(true);
        return;
      }
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const createdProfile = await ensureUserProfile({
        uid: result.user.uid,
        displayName,
        email,
        photoURL: result.user.photoURL,
      });
      setProfile(createdProfile);
    },
    [],
  );

  const demoLogin = useCallback(() => {
    setProfile(demoUser);
    setDemoSession(true);
  }, []);

  const logout = useCallback(async () => {
    if (auth) await signOut(auth);
    setFirebaseUser(null);
    setProfile(null);
    setDemoSession(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      firebaseUser,
      profile,
      loading,
      isAuthenticated: Boolean(firebaseUser || demoSession),
      isDemoMode: !firebaseEnabled || demoSession,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      demoLogin,
      logout,
      setProfile,
    }),
    [
      demoLogin,
      demoSession,
      firebaseUser,
      loading,
      logout,
      profile,
      signInWithEmail,
      signInWithGoogle,
      signUpWithEmail,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
