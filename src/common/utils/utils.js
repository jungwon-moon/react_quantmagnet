function comma(text) {
  text = String(text)
  return text.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}

function padZero(text) {
  return String(text).padStart(2, '0')
}

function getKeywordsTime() {
  const date = new Date()
  const min = date.getMinutes()
  if (min < 10) {
    date.setHours(date.getHours() - 1)
  }
  date.setMinutes(10)
  date.setHours(parseInt(date.getHours() / 3) * 3)
  return date.getFullYear() + padZero(date.getMonth() + 1) + padZero(date.getDate()) + padZero(date.getHours()) + '05'
}

export { comma, getKeywordsTime }