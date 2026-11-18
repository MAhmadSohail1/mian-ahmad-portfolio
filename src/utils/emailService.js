import emailjs from '@emailjs/browser'

const DEFAULT_RECIPIENT = 'ahmadlegend116@gmail.com'

function isConfiguredValue(val) {
  const cleaned = (val || '').trim()
  return Boolean(cleaned) && !cleaned.startsWith('your_') && !cleaned.includes('here')
}

function getWeb3FormsKey() {
  const key = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim()
  return isConfiguredValue(key) ? key : null
}

function getEmailJSConfig() {
  const serviceId = (import.meta.env.VITE_EMAILJS_SERVICE_ID || '').trim()
  const templateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '').trim()
  const publicKey = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '').trim()

  if (
    !isConfiguredValue(serviceId) ||
    !isConfiguredValue(templateId) ||
    !isConfiguredValue(publicKey)
  ) {
    return null
  }

  return { serviceId, templateId, publicKey }
}

/**
 * Returns the active email transport configured via environment variables.
 * Priority:
 * 1. Web3Forms (VITE_WEB3FORMS_ACCESS_KEY) — works immediately on localhost & production
 * 2. EmailJS (VITE_EMAILJS_*) — works immediately on localhost & production
 * 3. FormSubmit fallback — works on live public domains after one-time email activation
 */
export function getEmailProviderInfo() {
  const recipient = (import.meta.env.VITE_CONTACT_EMAIL || DEFAULT_RECIPIENT).trim()
  if (getWeb3FormsKey()) return { provider: 'web3forms', recipient }
  if (getEmailJSConfig()) return { provider: 'emailjs', recipient }
  return { provider: 'formsubmit', recipient }
}

/**
 * Sends a real contact message to Ahmad Sohail's email inbox.
 * Throws a descriptive Error if delivery is not confirmed by the email provider.
 */
export async function sendContactEmail({ name, email, subject, message }) {
  const cleanPayload = {
    name: name.trim().slice(0, 120),
    email: email.trim().slice(0, 160),
    subject: subject.trim().slice(0, 180),
    message: message.trim().slice(0, 4000),
  }

  if (
    !cleanPayload.name ||
    !cleanPayload.email ||
    !cleanPayload.subject ||
    !cleanPayload.message
  ) {
    throw new Error('All contact form fields are required.')
  }

  const recipient = (import.meta.env.VITE_CONTACT_EMAIL || DEFAULT_RECIPIENT).trim()

  // 1. Web3Forms (Fastest 1-key setup; works on localhost and deployed sites)
  const web3FormsKey = getWeb3FormsKey()
  if (web3FormsKey) {
    let response
    try {
      response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: cleanPayload.name,
          email: cleanPayload.email,
          replyto: cleanPayload.email,
          subject: `[Portfolio Inquiry] ${cleanPayload.subject}`,
          message: cleanPayload.message,
          from_name: 'Ahmad Sohail Portfolio',
        }),
      })
    } catch {
      throw new Error(
        'Network error while connecting to Web3Forms. Please check your internet connection.'
      )
    }

    let data = null
    try {
      data = await response.json()
    } catch {
      // Non-JSON response
    }

    if (!response.ok || !data?.success) {
      throw new Error(
        data?.message || `Email delivery failed (HTTP ${response.status}). Please try again.`
      )
    }

    return {
      provider: 'web3forms',
      delivered: true,
      needsActivation: false,
    }
  }

  // 2. EmailJS (Works on localhost and deployed sites)
  const emailJsConfig = getEmailJSConfig()
  if (emailJsConfig) {
    try {
      const result = await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: cleanPayload.name,
          from_email: cleanPayload.email,
          reply_to: cleanPayload.email,
          to_email: recipient,
          subject: cleanPayload.subject,
          message: cleanPayload.message,
        },
        {
          publicKey: emailJsConfig.publicKey,
        }
      )

      if (result.status !== 200) {
        throw new Error(`Email service returned status ${result.status}.`)
      }

      return {
        provider: 'emailjs',
        delivered: true,
        needsActivation: false,
      }
    } catch (error) {
      const detail = error?.text || error?.message || 'Unable to send via EmailJS.'
      throw new Error(`Email delivery failed: ${detail}`)
    }
  }

  // 3. FormSubmit fallback (Works best on deployed HTTPS domains; localhost often blocks activation)
  const formSubmitTarget = (import.meta.env.VITE_FORMSUBMIT_ID || recipient).trim()
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(formSubmitTarget)}`

  let response
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: cleanPayload.name,
        email: cleanPayload.email,
        _replyto: cleanPayload.email,
        _subject: `[Portfolio Inquiry] ${cleanPayload.subject}`,
        subject: cleanPayload.subject,
        message: cleanPayload.message,
        _template: 'table',
        _captcha: 'false',
      }),
    })
  } catch {
    throw new Error(
      'Network error while reaching the email service. Please check your internet connection or email directly.'
    )
  }

  let data = null
  try {
    data = await response.json()
  } catch {
    // Non-JSON response
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Email service responded with HTTP ${response.status}. Please try again.`
    )
  }

  const isSuccess = data?.success === true || data?.success === 'true'
  if (!isSuccess) {
    const rawMsg = String(data?.message || '')
    const isLocalhost =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

    if (isLocalhost && rawMsg.toLowerCase().includes('activat')) {
      throw new Error(
        'FormSubmit blocks activation on localhost. Add a free Web3Forms Access Key (VITE_WEB3FORMS_ACCESS_KEY) in your .env file to receive real emails immediately on both localhost and live hosting.'
      )
    }

    throw new Error(
      rawMsg || 'The email service did not confirm delivery. Please try again.'
    )
  }

  return {
    provider: 'formsubmit',
    delivered: true,
    needsActivation: false,
    serverMessage: data?.message || null,
  }
}
