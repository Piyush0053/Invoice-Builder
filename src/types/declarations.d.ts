// Type declarations for missing modules
declare module 'react-router-dom' {
  export interface NavigateFunction {
    (to: string, options?: { replace?: boolean; state?: any }): void;
    (delta: number): void;
  }
  
  export function useNavigate(): NavigateFunction;
  export function Link(props: any): JSX.Element;
  export function Route(props: any): JSX.Element;
  export function Routes(props: any): JSX.Element;
  export function BrowserRouter(props: any): JSX.Element;
  export function Outlet(props: any): JSX.Element;
  export function Navigate(props: any): JSX.Element;
}

declare module 'firebase/auth' {
  export interface Auth {
    currentUser: any;
    onAuthStateChanged: (auth: Auth, callback: (user: any) => void) => void;
  }
  
  export interface GoogleAuthProvider {
    new(): any;
  }
  
  export function getAuth(): Auth;
  export function signInWithPopup(auth: Auth, provider: any): Promise<any>;
  export function signOut(auth: Auth): Promise<void>;
  export function onAuthStateChanged(auth: Auth, callback: (user: any) => void): () => void;
  export const GoogleAuthProvider: GoogleAuthProvider;
}

declare module 'react-icons/fc' {
  export function FcGoogle(props: any): JSX.Element;
}
