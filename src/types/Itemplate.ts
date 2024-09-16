export interface ITemplate {
  company_id?: string | null
  user_id?: string | null
  name?: string
  assistant_id?: string
  vector_store_id?: string
  logo_light?: string
  logo_dark?: string
  description?: string
  system_prompt?: string
  faq?: boolean
  image_display?: boolean
  primary_color?: string
  secondary_color?: string
  font_color?: string
  model?: string
  temperature?: number
  max_token?: number
  stream?: boolean
  top_p?: number
  frequency_penalty?: number
  unique_id?: string
  first_message?: string
  context?: string
  objective?: string
  target_audience?: string
  call_to_action?: string
  format?: string
  avg_message_length?: number
  tone_and_style?: string
  framework?: string
  language: 'en' | 'ar'
  dark_mode?: boolean
  bot_avatar?: string
  user_avatar?: string
  createdAt?: Date
  updatedAt?: Date
  category?: string
  embedding_url: string
}
