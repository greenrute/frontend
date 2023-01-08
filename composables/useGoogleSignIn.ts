import {Ref} from 'vue'

interface GSIResponse {
  clientId: string,
  client_id: string,
  credential: string,
  select_by: string,
}

export const useGoogleSignIn = () => {
  const initGSIScript = (): Promise<void> => {
    const config = useRuntimeConfig()

    if (!Array.from(document.querySelectorAll('script')).map(s => s.src).includes('https://accounts.google.com/gsi/client')) {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      document.head.append(script)

      return new Promise<void>(resolve => {
        script.addEventListener('load', () => {
          void nextTick(() => {
            (window as any).google.accounts.id.initialize({
              client_id: config.public.gsiClientID,
              callback: async (res: GSIResponse) => {
                await $fetch('/users/login/google', {
                  method: 'POST',
                  body: {credential: res.credential},
                  baseURL: useRuntimeConfig().public.apiBase,
                })
                  .then(async r => {
                    const date = new Date()
                    date.setMonth(date.getMonth() + 6)
                    useCookie('token', {
                      expires: date,
                      sameSite: true,
                    }).value = (r as apiResponse).data?.token?.token || null
                    useCookie<UserCookie>('user', {
                      expires: date,
                      sameSite: true,
                    }).value = {
                      id: (r as apiResponse).data?.user?.id,
                      email: (r as apiResponse).data?.user?.email,
                      name: (r as apiResponse).data?.user?.name,
                      picture: (r as apiResponse).data?.user?.picture,
                    }
                    await navigateTo('/dashboard')
                    setTimeout(() => {
                      pushNotification({
                        status: 'success',
                        message: (r as apiResponse).message,
                      })
                    }, 150)
                  })
                  .catch(error => {
                    pushNotification({
                      status: 'error',
                      message: error.data?.message,
                    })
                  })
              },
            })
            resolve()
          })
        })
      })
    } else {
      return new Promise<void>(resolve => resolve())
    }
  }

  return {
    prompt: () => {
      initGSIScript().then(() => {
        (window as any).google.accounts.id.prompt()
      })
    },
    cancel: () => {
      initGSIScript().then(() => {
        (window as any)?.google?.accounts?.id?.cancel()
      })
    },
    render: (
      ref: Ref,
      text: 'signin_with' | 'signup_with' | 'continue_with' | 'signin' = 'continue_with',
      logo_alignment: 'left' | 'center' = 'left',
    ) => {
      // const theme = useColorMode().value === 'dark' ? 'filled_black' : 'outline'

      initGSIScript().then(() => {
        (window as any).google.accounts.id.renderButton(
          ref.value,
          {type: 'standard', theme: 'outline', size: 'large', text, shape: 'pill', logo_alignment, width: ref.value.offsetWidth},
        )
      })
    },
  }
}
