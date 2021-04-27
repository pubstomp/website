// 1. Go to https://anchor.fm/pubstomp
// 2. Open Developer Console
// 3. Run this line, then the data will be in your clipboard
Array.from(document.querySelectorAll('a[class*=episodeImage')).map(el => 'https://anchor.fm/' + el.getAttribute('href').replace('/pubstomp/', 'pubstomp/embed/'))

/*
 * This is currently being done in a Cloudflare Worker
 */
const anchorUrl = 'https://anchor.fm/pubstomp'

function createEmbedUrl(href) {
  return 'https://anchor.fm/' + href.replace('/pubstomp/', 'pubstomp/embed/')
}

async function fetchEpisodeUrl(episodeNumber) {
  let response = await fetch(anchorUrl)
  const rewriter = new HTMLRewriter()
  let matches = []
  rewriter.on(`a[href*=Episode-${parseInt(episodeNumber)}-]`, {
    element(element) {
      matches.push(createEmbedUrl(element.getAttribute('href')))
    }
  })

  await rewriter.transform(response).text()

  return matches[0]
}

async function handleRequest(request) {
  const requestURL = new URL(request.url)
  const episodeNumber = requestURL.pathname.split("/episode/")[1]
  let episodeUrl = await fetchEpisodeUrl(episodeNumber)

  if (episodeUrl == null) {
    return new Response("Not Found", {
      status: 404,
    })
  }

  return Response.redirect(episodeUrl, 301)
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request))
})
