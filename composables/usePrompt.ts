export type DefaultOptionIcon = 'no' | 'go' | 'link'

export interface Option {
  icon: DefaultOptionIcon
  title: string
  action: () => void
}

export interface Prompt {
  show: boolean
  title: string
  description: string
  options: Option[]
}

export type PromptDraft = Pick<Prompt, 'title' | 'description' | 'options'>

export const usePrompt = () => useState<Prompt>('prompt', () => ({
  show: false,
  title: '',
  description: '',
  options: [],
}))

export const promptQuestion = (question: PromptDraft) => {
  if (question.options.length < 2 || !question.title || !question.description) return

  const p = usePrompt()

  p.value.title = question.title
  p.value.description = question.description
  p.value.options = question.options

  p.value.show = false
  void nextTick(() => {
    p.value.show = true
  })
}
