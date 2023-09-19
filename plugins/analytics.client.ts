import { inject } from '@vercel/analytics'
 
export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV === 'production') {
    inject()
  }
})
