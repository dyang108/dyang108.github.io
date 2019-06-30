
function subscribe(category) {
  var req = new XMLHttpRequest()
  var email = document.getElementById('email-field').value
  var pw = 'FZeKJ5axc0s05gq'
  req.open('POST', 'https://dyang108-blog-email.herokuapp.com/signup', true)
  req.setRequestHeader('Content-Type', 'application/json')
  var reqBody = { email, category, pw }
  req.send(JSON.stringify(reqBody))
}
