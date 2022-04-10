function comma(text) {
  text = String(text)
  return text.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}


export { comma }