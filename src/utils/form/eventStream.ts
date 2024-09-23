/* eslint-disable no-unused-vars */
interface XhrSourceOptions {
  method?: string
  headers?: Record<string, string>
  timeout?: number
  body?: Document | null
}

function sseevent(message: string): MessageEvent {
  let type = 'message',
    start = 0
  if (message.startsWith('event: ')) {
    start = message.indexOf('\n')
    type = message.slice(7, start)
  }
  start = message.indexOf(': ', start) + 2
  let data = message.slice(start, message.length)

  return new MessageEvent(type, { data: data })
}

export function XhrSource(url: string, opts: XhrSourceOptions): EventTarget & { close: () => void } {
  const eventTarget = new EventTarget()
  const xhr = new XMLHttpRequest()

  xhr.open(opts.method || 'GET', url, true)
  for (var k in opts.headers) {
    xhr.setRequestHeader(k, opts.headers[k])
  }

  var ongoing = false,
    start = 0
  xhr.onprogress = function () {
    if (!ongoing) {
      // onloadstart is sync with `xhr.send`, listeners don't have a chance
      ongoing = true
      eventTarget.dispatchEvent(
        new CustomEvent('open', {
          detail: {
            status: xhr.status,
            headers: xhr.getAllResponseHeaders(),
            url: xhr.responseURL
          }
        })
      )
    }

    var i, chunk
    while ((i = xhr.responseText.indexOf('\n\n', start)) >= 0) {
      chunk = xhr.responseText.slice(start, i)
      start = i + 2
      if (chunk.length) {
        eventTarget.dispatchEvent(sseevent(chunk))
      }
    }
  }

  xhr.onloadend = _ => {
    eventTarget.dispatchEvent(new CloseEvent('close'))
  }

  xhr.timeout = opts.timeout || 0
  xhr.ontimeout = _ => {
    eventTarget.dispatchEvent(new CloseEvent('error', { reason: 'Network request timed out' }))
  }
  xhr.onerror = _ => {
    eventTarget.dispatchEvent(new CloseEvent('error', { reason: xhr.responseText || 'Network request failed' }))
  }
  xhr.onabort = _ => {
    eventTarget.dispatchEvent(new CloseEvent('error', { reason: 'Network request aborted' }))
  }

  const close = () => {
    xhr.abort()
  }

  xhr.send(opts.body)
  return Object.assign(eventTarget, { close })
}
