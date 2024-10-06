export interface IPackageFeature {
  name: string
  keyword: string
  type: string
  value: string | number
  _id: string
}

export interface IPrice {
  price: string
  currency: string
  stripe_id: string
  _id: string
}

export interface IPackagePrice {
  monthly: IPrice
  yearly: IPrice
}

export interface IPackage {
  price: IPackagePrice
  name: string
  description: string
  features: IPackageFeature[]
  createdAt: string
  updatedAt: string
  hidden: boolean
}
