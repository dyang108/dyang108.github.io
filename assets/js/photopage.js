

function getPostInfo() {
  var postInfos = []
  $('#photo-container').children().each(function (i, value) {
    postInfos.push({
      photourl: $(value).attr('photourl'),
      url: $(value).attr('url'),
      title: $(value).attr('title'),
      date: $(value).attr('date')
    })
  })
  return postInfos
}

arrangements = [
  [3, 3, 3, 3],
  [3, 3, 6],
  [3, 6, 3],
  [6, 3, 3],
  [8, 4],
  [4, 8],
  [4, 4, 4],
  [6, 6],
  [3, 4, 5],
  [3, 5, 4],
  [4, 3, 5],
  [4, 5, 3],
  [5, 3, 4],
  [5, 4, 3]
]
var options = { year: 'numeric', month: 'long', day: 'numeric' };
widths = []
getPostInfo().forEach(function (img) {
  if (widths.length === 0) {
    widths = widths.concat(arrangements[Math.floor(Math.random() * arrangements.length)])
  }
  width = widths.pop()

  $('#photo-container').append('\
    <div class="img-outer-cont col-sm-' + width + '">\
      <a href="' + img.url + '">\
      <div class="img-cont">\
        <img class="img-lineup" src="' + img.photourl + '">\
        <div class="caption-container"><p class="img-caption">' + img.title + ' <span class="label label-default"> ' + (new Date(img.date)).toLocaleDateString('en-US', options) + '</span></p></div>\
      </div>\
    </div>')
})


