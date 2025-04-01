import { useState } from 'react'
import emailjs from 'emailjs-com'
import { useTranslation } from 'react-i18next'

export const Contact = () => {
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target as HTMLFormElement,
        import.meta.env.VITE_PUBLIC_KEY,
      )
      .then(() => {
        alert(t('contact.success'))
        setFormData({ name: '', email: '', message: '' })
      })
      .catch(() => alert(t('contact.error')))
  }

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-2xl px-4"
        >
          <h2>{t('contact.title')}</h2>

          {/* Name */}
          <input
            type="text"
            name="name"
            required
            placeholder={t('contact.name')}
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            required
            placeholder={t('contact.email')}
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {/* Message */}
          <textarea
            name="message"
            rows={5}
            required
            placeholder={t('contact.message')}
            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
          >
            {t('contact.send')}
          </button>
        </form>
      </div>
    </section>
  )
}
