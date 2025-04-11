/* 
  Docs
  https://developers.soundcloud.com/docs/api/html5-widget
  
  Large player => visual=true (&& 300)
  Medium player => visual=false && height="166". viaual=true gir full horisontal waveform. visual=false gir venstrestilt artwork fra 350px+.
  Mini player => height:"20" && visual=false
  Input: normal soundcloud url. cut str: "/user/track". sanitize whitelist: lowercase letters, numbers(?) and dash (-).
  Default for the embedded player is to get the track directly from the api, which hasnt been public since a few years, e.g. src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/103052311".
  Example track: https://soundcloud.com/claptone/r-f-s-sundream-claptone-remix
  Multiple SC embeds will pause each other. if lag with many, consider temporarily display: none; on older loaded embeds. 
*/

import SC from './soundcloud-widget-api.js';

const iframeConfig = {
  width:        '100%',
  height:       '166',  // 166
  scrolling:    'no',
  frameBorder:  'no',
  allow:        'autoplay',
  src:          '',  // Placeholder
};

const widgetConfig = {
  auto_play:        false,
  buying:           false,
  color:            "#ff7700",
  continuous_play:  false,
  download:         false,
  hide_related:     true,
  liking:           false,
  sharing:          false,
  show_artwork:     true,
  show_comments:    false,
  show_download:    false,
  show_playcount:   true,
  show_reposts:     false,
  show_teaser:      false,
  show_user:        true,
  single_active:    false,
  start_track:      0,
  visual:           false,
};

// Allows control widget from parent page
function getAPIforWidget(target) {
  return SC.Widget(target);  // Iframe element or id
}

export function createSoundCloudIframe(trackUrl) {
  const iframe = Object.assign(document.createElement('iframe'), iframeConfig);
  const src = new URL('https://w.soundcloud.com/player/');
  
  src.searchParams.set('url', trackUrl);
  Object.entries(widgetConfig).forEach(([k, v]) => src.searchParams.set(k, v));

  iframe.src = src;
  return iframe;
}