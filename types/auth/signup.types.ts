interface SignUp {
  firstName: string
  lastName: string
  username: string
  email: string
  password: {
    password: string
    confirmPassword: string
  }
  // accepted: boolean | string;
}
