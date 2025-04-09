export default defineEventHandler((event) => {
  const cls = getRouterParam(event, 'class')

  console.log(event.toString())

  return `hello`
})