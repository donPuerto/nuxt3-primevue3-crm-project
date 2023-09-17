interface Signin {
  email: string
  password: string
}

interface SignUp {
  firstName: string
  lastName: string
  username: string
  email: string
  password: {
    password: string
    confirmPassword: string
  }

}

interface AuthResponse {
  success: boolean | null
  error: string | null
}
