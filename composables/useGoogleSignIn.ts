interface GSIResponse {
  clientId: string,
  client_id: string,
  credential: string,
  select_by: string,
}

export const useGoogleSignIn = () => {
  const { t, locale } = useI18n()
  const forceLogin = useState('forceLogin')
  const forceRegister = useState('forceRegister')

  const makeRequest = async (res: GSIResponse) => {
    if (forceRegister.value !== 1 && useRoute().name === 'register') {
      forceRegister.value = 1
    }

    await $fetch('/users/google', {
      method: 'POST',
      query: { force: forceLogin.value, forceRegister: forceRegister.value },
      headers: { 'Accept-Language': locale.value },
      body: {credential: res.credential},
      baseURL: useRuntimeConfig().public.apiBase,
    })
      .then(async r => {
        if ((r as apiResponse<any>).message === 'assign or deny') {
          promptQuestion({
            title: t('google sign in.assign or deny.title'),
            description: t('google sign in.assign or deny.description'),
            options: [
              {
                title: t('google sign in.assign'),
                icon: 'link',
                action: () => {
                  forceLogin.value = 1
                  makeRequest(res)
                },
              },
              {
                title: t('google sign in.deny'),
                icon: 'no',
                action: () => {
                  usePrompt().value.show = false
                },
              },
            ],
          })
          forceLogin.value = 0
          forceRegister.value = 0
          return
        }

        if ((r as apiResponse<any>).message === 'create or deny') {
          promptQuestion({
            title: t('google sign in.create or deny.title'),
            description: t('google sign in.create or deny.description'),
            options: [
              {
                title: t('google sign in.create'),
                icon: 'go',
                action: () => {
                  forceRegister.value = 1
                  makeRequest(res)
                },
              },
              {
                title: t('google sign in.deny'),
                icon: 'no',
                action: () => {
                  usePrompt().value.show = false
                },
              },
            ],
          })
          forceLogin.value = 0
          forceRegister.value = 0
          return
        }
        forceLogin.value = 0
        forceRegister.value = 0

        const date = new Date()
        date.setMonth(date.getMonth() + 6)
        const token = useCookie('token', {
          expires: date,
          sameSite: true,
        })
        token.value = (r as apiResponse<apiResponseToken>).data?.token?.token || null
        const user = useCookie<UserCookie>('user', {
          expires: date,
          sameSite: true,
        })
        user.value = {
          id: (r as apiResponse<apiResponseUser>).data?.user?.id,
          email: (r as apiResponse<apiResponseUser>).data?.user?.email,
          name: (r as apiResponse<apiResponseUser>).data?.user?.name,
          picture: (r as apiResponse<apiResponseUser>).data?.user?.picture,
        }
        await navigateTo('/dashboard')
        setTimeout(() => {
          pushNotification({
            status: 'success',
            message: (r as apiResponse<any>).message,
          })
        }, 150)
      })
      .catch(error => {
        pushNotification({
          status: 'error',
          message: error.data?.message || t('could not connect to the server'),
        })
      })
  }

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
              callback: makeRequest,
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
      const theme = useColorMode().value === 'dark' ? 'filled_black' : 'outline'

      initGSIScript().then(() => {
        (window as any).google.accounts.id.renderButton(
          ref.value,
          {type: 'standard', theme, size: 'large', text, shape: 'pill', logo_alignment, width: ref.value.offsetWidth},
        )
      })
    },
  }
}
