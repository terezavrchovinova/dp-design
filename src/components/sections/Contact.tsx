import { useState } from 'react'
import emailjs from 'emailjs-com'
import { useTranslation } from 'react-i18next'
import { Button } from '../Button'

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
      className="min-h-screen flex items-center justify-center bg-[var(--color-dark)] px-6 py-24"
    >
      <div className="w-full max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 backdrop-blur-md border border-[var(--color-border)] bg-[var(--color-surface)]/80 rounded-[var(--radius-xl)] p-10 shadow-[var(--shadow-soft)] transition-all"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--color-white)] mb-2">
            {t('contact.title')}
          </h2>

          {/* Input Field */}
          {[
            { name: 'name', type: 'text', placeholder: t('contact.name') },
            { name: 'email', type: 'email', placeholder: t('contact.email') },
          ].map((field) => (
            <div
              key={field.name}
              className="relative w-full group transition-all duration-300"
            >
              <input
                type={field.type}
                name={field.name}
                required
                placeholder={field.placeholder}
                value={formData[field.name as 'name' | 'email']}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                className="w-full bg-transparent border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-white)] placeholder-[var(--color-light-gray)] transition-all duration-300 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] focus:scale-[1.02]"
              />
            </div>
          ))}

          {/* Textarea */}
          <div className="relative w-full group transition-all duration-300">
            <textarea
              name="message"
              rows={5}
              required
              placeholder={t('contact.message')}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full bg-transparent border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-white)] placeholder-[var(--color-light-gray)] transition-all duration-300 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] focus:scale-[1.02]"
            />
          </div>

          {/* Button */}
          <div className="flex justify-center pt-2">
            <Button
              as="button"
              type="submit"
              className="px-10 py-3 hover:scale-105 active:scale-100 transition-transform duration-200"
            >
              {t('contact.send')}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
