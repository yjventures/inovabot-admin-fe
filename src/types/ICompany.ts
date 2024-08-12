export interface ICompany {
  user_id: string
  name: string
  description: string
  logo: string
  industry: string
  web_url: string
  payment_status: boolean
  payment_amount: number
  recurring_date: Date
  package?: string
  last_subscribed: Date | string
  expires_at: Date | string
  stripe_customer_id: string
  address?: string
  createdAt: Date | string
  updatedAt: Date | string
}
