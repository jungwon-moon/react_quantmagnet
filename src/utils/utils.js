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

function checkWeekend(date) {
  if (date.getDay() === 0) {
    date.setDate(date.getDate() - 2)
  } else if(date.getDay() === 6) {
    date.setDate(date.getDate() - 1)
  }
  return date
}

function getScreenerDate() {
  let date = new Date()
  const vsDate = new Date()
  // 비교 시간이 16:00 이전이면 전날 데이터를 호출
  vsDate.setHours(16)
  vsDate.setMinutes(0)
  if (vsDate > date) {
    date.setDate(date.getDate() - 1)
  }
  // 주말 확인
  date = checkWeekend(date)

  return date.getFullYear() + padZero(date.getMonth() + 1) + padZero(date.getDate())
}

export { comma, getKeywordsTime, getScreenerDate }