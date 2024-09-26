export const genUserRole = user => {
  return user?.type === 'super-admin'
    ? 'Super Admin'
    : user?.type === 'admin'
    ? 'Admin'
    : user?.type === 'company-admin'
    ? 'Company Admin'
    : user?.type === 'reseller'
    ? 'Reseller'
    : user?.company_position === 'editor'
    ? 'Editor'
    : 'Viewer'
}
