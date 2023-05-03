function comma(text) {
  text = String(text)
  return text.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function uncomma(text) {
  text = String(text)
  return text.replace(/[^\d]+/g, '')
}

function padZero(text) {
  return String(text).padStart(2, '0')
}


export { comma, uncomma, padZero}