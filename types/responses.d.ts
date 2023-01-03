declare interface apiResponseToken {
  token: {
    id: number
    user_id: number
    email: string
    token: string
    expiry: string
    created_at: string
    updated_at: string
  }
}

declare interface apiResponse {
  error: boolean
  message: string
  data?: apiResponseToken
}
