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

declare interface apiResponseUser {
  user: {
    id: number
    email: string
    name: string
    picture: string
    password: string
    google_id: string
    created_at: string
    updated_at: string
    token: apiResponseToken
  }
}

declare interface apiResponseClass {
  id: number
  name: string
  description: string
  color: string
  hash: string
  timetable: any[]
  schedule: {
    day: string
    lessons: Lesson[]
  }[]
  created_at: string
  updated_at: string
}

declare interface ARLessons {
  lessons: Lesson[]
}

declare interface apiResponse<T> {
  error: boolean
  message: string
  data?: T
}
