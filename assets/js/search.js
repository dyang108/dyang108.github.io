/* global $, jQuery, lunr, search_results */
// search.js
jQuery(function () {
  // Initalize lunr with the fields it will be searching on. I've given title
  // a boost of 10 to indicate matches on this field are more important.
  window.idx = lunr(function () {
    this.field('id')
    this.field('title', { boost: 10 })
    this.field('content')
  })
  // Download the data from the JSON file we generated
  window.data = $.getJSON('/search_data.json')

  // Wait for the data to load and add it to lunr
  window.data.then(function (loaded_data) {
    $.each(loaded_data, function (index, value) {
      window.idx.add(
        $.extend({'id': index}, value)
      )
    })
    var query = unescape(getQueryString('q', document.URL))
    query = query.replace(/\+/g, ' ')
    $('#search_box').val(query)
    var results = window.idx.search(query)
    document.title = 'Search - ' + '\"' + query + '\"'
    display_search_results(results, query)
  })

  window.data.fail(function () {
    console.log('failed')
  })

  // display_search_results renders search results onto a page
  function display_search_results (results, query) {
    // history.pushState(null, null, '/faqs/search?q=' + slugify(query))
    var $search_results = $('#search_results')
    // Wait for data to load
    window.data.then(function (loaded_data) {
      // Are there any results?
      if (results.length) {
        // there are results! generate a heading
        var search_heading = document.createElement('h4')
        $(search_heading).html('Results for "' + query + '"')
        $search_results.append(search_heading)

        // Iterate over the results to generate HTML entries
        results.forEach(function (result) {
          // create a wrapper for the new result
          var result_wrapper = document.createElement('div')
          var item = loaded_data[result.ref]

          // get title
          var curr_result = document.createElement('h2')
          $(curr_result).html(item.title)

          // get context
          var content_preview = document.createElement('p')
          content_preview.className = 'show'
          $(item.content).text()

          // make a dummy div to extract text
          var div = document.createElement('div')
          div.innerHTML = item.content
          var text = div.textContent || div.innerText || ''

          // populate content preview with html
          $(content_preview).html(get_context(text, query))
          $(result_wrapper).append(curr_result)
          $(curr_result).wrap(function () {
            return '<a href=\"' + item.url + '\"></a>'
          })
          $(result_wrapper).append(content_preview)
          // Add it to the results list
          $search_results.append(result_wrapper)
        })
      } else { // no results
        $search_results.append('<h2>No results found for \"' + query + '\"</h2>')
      }
      $('#all-content').html(search_results)
    })
  }

  // get_context returns a paragraph to display as the search query context
  function get_context (full_content, query) {
    // take a number of characters before and after query to display
    var center_pt = -1
    var query_words = query.split(' ')

    // do some processing on the content to get better context
    full_content = get_bolded(full_content, query_words)
    full_content = full_content.replace(/\s+/g, ' ')
    full_content = full_content.trim()

    // loop through words to find a center pt
    var i = 0
    while (center_pt === -1 && i < query_words.length) {
      var thisre = new RegExp(query_words[i], 'i')
      center_pt = full_content.search(thisre)
      i++
    }

    // return the context of the result
    if (center_pt === -1) {
      if (full_content.length < 300) {
        return full_content.slice(0, 300)
      } else {
        return full_content.slice(0, 300) + '...'
      }
    }
    if (center_pt - 50 <= 0) {
      if (full_content.length < 300) {
        return full_content.slice(0, 300)
      } else {
        return full_content.slice(0, 300) + '...'
      }
    } else if (center_pt - 50 > 0) {
      if (full_content.length < center_pt + 250) {
        return '...' + full_content.slice(full_content.length - 300)
      } else {
        return '...' + full_content.slice(center_pt - 50, center_pt + 250) + '...'
      }
    }
  }

  // get_bolded returns the string with the query strings bolded
  function get_bolded (content, query_words) {
    var first_indices = new Array(query_words.length)
    // search for word in query
    for (var i = 0; i < query_words.length; i++) {
      var thisre = new RegExp(query_words[i], 'i')
      first_indices[i] = content.search(thisre)
    }
    // set the min to infinity
    var min = Infinity
    var minIndex = -1
    for (i = 0; i < first_indices.length; i++) {
      if (first_indices[i] <= min && first_indices[i] !== -1) {
        minIndex = i
        min = first_indices[i]
      }
    }
    // return the concatenated string if there's more, and return the content if not
    if (minIndex !== -1) {
      return content.slice(0, min) + '<b>' + content.slice(min, min + query_words[minIndex].length) + '</b>' + get_bolded(content.slice(min + query_words[minIndex].length), query_words)
    } else {
      return content
    }
  }

  // get query string from URL
  function getQueryString (field, url) {
    var href = url
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i')
    var string = reg.exec(href)
    return string ? string[1] : null
  }
})
