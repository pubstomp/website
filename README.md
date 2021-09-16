# Pubstomp Media Website
> Simple Hugo site using the zen theme to display Pubstomp Media's content.

## Deployment

We deploy this site to Cloudflare Pages, and we embed the Anchor.fm episode using a custom Hugo shortcode. Notice that the shortcode URL points to a Cloudflare Worker that accepts the episode number as part of the URL. Behind the scenes, the worker is searching for the URL on Anchor.fm and providing the correct episode.

