function comma(text) {
  text = String(text)
  return text.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}

function uncomma(text) {
  text = String(text)
  return text.replace(/[^\d]+/g, '')
}

function padZero(text) {
  return String(text).padStart(2, '0')
}


export { comma, uncomma, padZero}