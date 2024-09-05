export interface ICompany {
  email: string
  user_id: string
  name: string
  description: string
  logo?: string
  logo_dark?: string
  industry: string
  web_url: string
  payment_status: boolean
  payment_amount: number
  recurring_date: Date
  package?: string
  last_subscribed: string
  expires_at: string
  stripe_customer_id: string
  address?: string
  createdAt: string
  updatedAt: string
  bots: number
  recurring_type: 'monthly' | 'yearly'
  active: boolean
  price_id: string
}
