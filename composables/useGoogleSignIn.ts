import {Ref} from 'vue'

interface GSIResponse {
  clientId: string,
  client_id: string,
  credential: string,
  select_by: string,
}

const credentialResponseHandler = (response: GSIResponse) => {
  console.log(response.credential)
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
            callback: credentialResponseHandler,
          })
          resolve()
        })
      })
    })
  } else {
    return new Promise<void>(resolve => resolve())
  }
}

export const useGoogleSignIn = () => ({
  prompt: () => {
    initGSIScript().then(() => {
      (window as any).google.accounts.id.prompt()
    })
  },
  cancel: () => {
    initGSIScript().then(() => {
      (window as any).google.accounts.id.cancel()
    })
  },
  render: (
    ref: Ref,
    text: 'signin_with' | 'signup_with' | 'continue_with' | 'signin' = 'signin_with',
    logo_alignment: 'left' | 'center' = 'left',
  ) => {
    // const theme = useColorMode().value === 'dark' ? 'filled_black' : 'outline'

    initGSIScript().then(() => {
      (window as any).google.accounts.id.renderButton(
        ref.value,
        { type: 'standard', theme: 'outline', size: 'large', text, shape: 'pill', logo_alignment, width: ref.value.offsetWidth }
      )
    })
  },
})
