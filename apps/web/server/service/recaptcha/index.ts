export async function verifyRecaptchaAsync(recaptchaV2: string): Promise<boolean> {
  const config = useRuntimeConfig()
  const secretKey = config.recaptcha.key
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaV2}`

  const response = await fetch(url, { method: 'POST' })
  const data = await response.json()

  return data.success
}
