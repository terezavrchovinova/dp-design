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
      className="min-h-screen flex items-center justify-center py-24 px-6"
      style={{ backgroundColor: 'var(--color-dark)' }}
    >
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-2xl backdrop-blur-md border border-[var(--color-border)] bg-[var(--color-surface)]/80 rounded-2xl p-8 shadow-xl"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: 'var(--color-white)' }}
          >
            {t('contact.title')}
          </h2>

          {/* Name */}
          <input
            type="text"
            name="name"
            required
            placeholder={t('contact.name')}
            className="w-full bg-transparent border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-white)] placeholder-[var(--color-gray)] transition focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            required
            placeholder={t('contact.email')}
            className="w-full bg-transparent border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-white)] placeholder-[var(--color-gray)] transition focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
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
            className="w-full bg-transparent border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-white)] placeholder-[var(--color-gray)] transition focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[var(--color-accent)] text-white py-3 px-6 rounded-xl font-medium transition hover:brightness-110 hover:shadow-[0_0_15px_var(--color-accent)]"
          >
            {t('contact.send')}
          </button>
        </form>
      </div>
    </section>
  )
}
