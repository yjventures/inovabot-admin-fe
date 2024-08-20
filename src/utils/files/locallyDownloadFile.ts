export const locallyDownloadFile = (url: string, name: string) => {
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.download = name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
