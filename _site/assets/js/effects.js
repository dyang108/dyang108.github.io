/* global $, history */
window.onload = function () {
  // assign unique id's to each h2 and p
  var h2s = document.getElementsByTagName('h2')
  var ps = document.getElementsByTagName('p')

  // add elements for better user experience
  // to each entry
  for (var i = 0; i < h2s.length; i++) {
    // add a bullet pt
    // var bullet = document.createElement('img')
    // bullet.id = h2s[i].id + '-b'
    // bullet.src = '/faqs/assets/img/bullet.png'
    // bullet.className = 'bullet'

    // create a link to the bigger question
    var link = document.createElement('a')
    link.innerHTML = 'Expand >'
    link.className = 'expand-link'
    var addition = $(h2s[i]).parent().attr('id')
    link.href =  addition
    // stop parent behavior on this element
    $(link).click(function (e) {
      e.stopPropagation()
    })

    // add id to paragraph
    ps[i].id = h2s[i].id + '-a'

    // add new elements to the DOM
    // $(h2s[i]).prepend(bullet)
    $(h2s[i]).append(link)
    $(h2s[i]).click(function (event) {
      event.preventDefault()
      handleClick(this.id)
    })
  }

  // wrap text in a div to control behavior
  $('p').wrapInner("<div class='answer-div'></div>")

  // align window if there is a hash
  if (window.location.hash !== undefined &&
      window.location.hash !== '') {
    var newUrl = document.URL
    window.location = newUrl
    var num = window.location.hash.slice(1)
    expand(h2s[num].id)
  }
}

// handleClick handles a click on a question
function handleClick (qId) {
  if (document.getElementById(qId + '-a').className === '') {
    expand(qId)
    history.pushState(null, null, '#' + qId)
  } else {
    // document.getElementById(qId + '-b').className = 'bullet'
    document.getElementById(qId + '-a').className = ''
  }
}

// expand a question
function expand (qId) {
  // document.getElementById(qId + '-b').className = 'question-clicked'
  // document.getElementById(qId + '-a').className = 'answer'
}
