/* SoundCloud widgets

Todo
-auto decide track/plist
-optional parameters

URLs as copied...
-in browser: https://soundcloud.com/sglewis/sg-lewis-robyn-channel-tres
-in app:     https://on.soundcloud.com/BY5jL8av5pWydxif6

*/

import { html } from "/ui/html.js"
import { ba } from "/utils/misc.js"
import SC from '/soundcloud-api.js'

async function getTrackData(url) {
  const request = 'https://soundcloud.com/oembed?format=json&url=' + url
  let response = await fetch(request) 
  response = await response.json()
  JSON.stringify(response)
  return response

  /*
    curl "https://soundcloud.com/oembed" \\ -d 'format=json' \\ -d 'url=https://soundcloud.com/forss/flickermood'

    {
      "version":1.0,
      "type":"rich",
      "provider_name":"soundcloud",
      "provider_url":"https://soundcloud.com",
      "height":400,
      "width":"100%",
      "title":"Flickermood by Forss",
      "description":"From the Soulhack album,&nbsp;recently featured in this ad <a href=\"https://www.dswshoes.com/tv_commercial.jsp?m=october2007\">https://www.dswshoes.com/tv_commercial.jsp?m=october2007</a> ","thumbnail_url":"https://i1.sndcdn.com/artworks-000067273316-smsiqx-t500x500.jpg",
      "html":
        "<iframe width=\"100%\" height=\"400\" scrolling=\"no\" frameborder=\"no\" src=\"https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F293&show_artwork=true\"></iframe>",
      "author_name": "Forss",
      "author_url": "https://soundcloud.com/forss"
    }

    fetch('https://soundcloud.com/oembed?format=json&url=https://soundcloud.com/forss/flickermood', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "id": 78912 })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
  */
}

async function testGetTrackData(url) {
  if (! url) return
  const data = await getTrackData(url)
  console.log(data)
  ba(
    H.img(data.thumbnail_url), 
    H.p(data.title), 
    newSoundcloudEmbed(url)
  )
}

function soundcloudWidget(trackUrl) {
  const el = H.tag('iframe')
  const src = new URL('https://w.soundcloud.com/player/')

  //el.style.maxWidth = '100%'
  //el.setAttribute('width', '480')
  //el.setAttribute('height', '166')
  el.setAttribute('scrolling', 'no')
  el.setAttribute('frameborder', 'no')
  el.setAttribute('allow', 'autoplay')

  src.searchParams.append('url', trackUrl)
  src.searchParams.append('color',           '#ff0000') // %23ff5500 #ff0000
  src.searchParams.append('hide_related',    'true')
  src.searchParams.append('single_active',   'false')
  src.searchParams.append('auto_play',       'false')
  src.searchParams.append('continuous_play', 'false')
  src.searchParams.append('show_user',       'true')
  src.searchParams.append('show_teaser',     'false')
  src.searchParams.append('show_reposts',    'false')
  src.searchParams.append('show_comments',   'false')
  src.searchParams.append('show_download',   'false')
  src.searchParams.append('show_playcount',  'false')
  src.searchParams.append('show_artwork',    'false')
  src.searchParams.append('visual',          'false')
  src.searchParams.append('buying',          'false')
  src.searchParams.append('liking',          'false')
  src.searchParams.append('sharing',         'false')
  //src.searchParams.append('origin',        'tumblr')
  // start_track

  el.setAttribute('src', src)

  //console.log(src.href)

  return el

  /*
  large player => visual=true (&& 300)
  
  medium player => visual=false && height="166". viaual=true gir full horisontal waveform. visual=false gir venstrestilt artwork fra 350px+.
  
  mini player => height:"20" && visual=false
  
  input: normal soundcloud url. cut str: "/user/track". sanitize whitelist: lowercase letters, numbers(?) and dash (-).
  
  default for the embedded player is to get the track directly from the api, which hasnt been public since a few years, e.g. src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/103052311".
  
  example track: https://soundcloud.com/claptone/r-f-s-sundream-claptone-remix
  
  btw, multiple SC embeds will pause each other. if lag with many, consider temporarily display: none; on older loaded embeds. 
  */
}

export { getTrackData, testGetTrackData, soundcloudWidget }