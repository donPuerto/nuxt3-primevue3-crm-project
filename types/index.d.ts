// Import types from other folder

// components
export * from './components/toast.types';
// auth
export * from './auth/signup.types';


interface iconDimensions {
    width: number;
    height: number;
}

interface CustomContainerClass {
  [key: string]: string;
  
}

interface CustomContainerItemClass {
  [key: string]: string;
}


interface Login {
  email: string;
  password: string;
}


interface ProfileIsActiveAndUserStatus {
  is_active: boolean | null
  user_status: Database['public']['Enums']['user_status'] | null
}

type UserId = string | undefined;





