
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

interface SignUp {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: {
    password: string;
    confirmPassword: string;
  };
  // accepted: boolean | string;
}

interface ProfileIsActiveAndUserStatus {
  is_active: boolean | null
  user_status: Database['public']['Enums']['user_status'] | null
}

type UserId = string | undefined;





