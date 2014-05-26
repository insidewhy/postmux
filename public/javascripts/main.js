(function() {

var endpoints$

function initPostmux() {
  $('#endpoint-form').submit(function(e) {
    e.preventDefault()
    addEndpoint()
  })

  var testForm = $('#test-form')
  testForm.submit(function(e) {
    e.preventDefault()
    var input = testForm.find('input[type=text]')
    $.post('/post', input.val(), function(response) {
      alert('Posted data') // yuk
      // input.val('')
    })
  })

  endpoints$ = $('#endpoints')
  loadEndpoints()
}

function loadEndpoints() {
  $.getJSON('/endpoints', function(endpoints) {
    endpoints$.html('')
    endpoints.forEach(addEndpointToView)
  })
}

function addEndpointToView(endpoint) {
  var listItem = $('<li>')

  listItem.append($('<span>', { text: endpoint.url }))
  listItem.append($('<a>', {
    text: 'remove',
    href: 'javascript:void(0)',
    click: _.bind(removeEndpoint, this, listItem, endpoint.id)
  }))

  endpoints$.append(listItem)
}

function addEndpoint() {
  var data = $('#endpoint-form').serialize()
  $.post('/endpoints', data, addEndpointToView, 'json')
}

// signal server to delete, if that works then also delete the list item
function removeEndpoint(listItem, id) {
  $.ajax({
    url: '/endpoints/' + id,
    type: 'DELETE',
    success: function(result) { listItem.remove() }
  })
}

$(document).ready(initPostmux)

})()
