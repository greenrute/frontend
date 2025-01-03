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

declare interface apiResponseLogin {
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

declare interface apiResponseClass {
  id: number
  name: string
  description: string
  color: string
  hash: string
  country: string
  school: string
  timetable: {
    day: string
    records: {
      uuid: string
      start: string
      end: string
    }[]
  }[]
  schedule: {
    day: DayName
    lessons: Lesson[]
  }[]
  people: {
    id: number
    email: string
    name: string
    role: string
    picture: string
    password: string
    google_id: string
    created_at: string
    updated_at: string
    token: apiResponseToken
  }[]
  created_at: string
  updated_at: string
}

declare interface apiResponseScheduleChanges {
  records: {
    class: string
    lesson: number[]
    subject: string
    room: string
    new_teacher: string
    previous_teacher: string
    status: string
  }[]
  absent_teachers: string[] | null
  affected_classes: string[] | null
  created_for: string
  updated_at: string
}

declare interface ARLessons {
  lessons: Lesson[]
}

declare interface ARHomework {
  id: number,
  text: string,
  description: string,
  date: string,
  visibility: string,
  done: boolean,
  class: number,
  created_at: string,
  updated_at: string,
  lesson: Lesson,
  created_by: apiResponseUser['user']
}

declare interface apiResponse<T> {
  error: boolean
  message: string
  data?: T
}
