'use client'

import EmbeddingWidget from '@/components/reusable/common/embedding_widget'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { useFormContext } from 'react-hook-form'

export default function EmbeddedWidgets() {
  const { watch } = useFormContext()
  const embedding_url = watch('embedding_url')

  return (
    <FormWrapper>
      <SingleAccordion value='widget' label='Embeddable Widget'>
        <EmbeddingWidget label='Full page widget' slug={embedding_url} />
        <EmbeddingWidget label='Small widget' slug={embedding_url} isPopup />
      </SingleAccordion>
    </FormWrapper>
  )
}
