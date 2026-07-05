import { Button, type ButtonProps } from '@/components/ui/Button'
import { FALLBACK_EMAIL } from '@/constants/contact'
import { useTranslation } from '@/translations'

type EmailButtonProps = Pick<ButtonProps, 'size'>

/** Mailto button showing the contact email (navbar pill + contact section CTA). */
export const EmailButton = ({ size }: EmailButtonProps) => {
  const { t } = useTranslation()
  const email = t('contact.email') || FALLBACK_EMAIL

  return (
    <Button href={`mailto:${email}`} size={size} aria-label={`Send email to ${email}`}>
      {email}
    </Button>
  )
}
