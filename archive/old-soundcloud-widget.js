import { html } from "/shared/html.js";

export function soundcloudWidget(trackUrl) {
  const el = html.create('iframe');
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
  src.searchParams.append('visual',          'true')
  src.searchParams.append('buying',          'false')
  src.searchParams.append('liking',          'false')
  src.searchParams.append('sharing',         'false')
  //src.searchParams.append('origin',        'tumblr')
  // start_track

  el.setAttribute('src', src)

  //console.log(src.href)

  return el

  /* info
    large player => visual=true (&& 300)
    
    medium player => visual=false && height="166". viaual=true gir full horisontal waveform. visual=false gir venstrestilt artwork fra 350px+.
    
    mini player => height:"20" && visual=false
    
    input: normal soundcloud url. cut str: "/user/track". sanitize whitelist: lowercase letters, numbers(?) and dash (-).
    
    default for the embedded player is to get the track directly from the api, which hasnt been public since a few years, e.g. src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/103052311".
    
    example track: https://soundcloud.com/claptone/r-f-s-sundream-claptone-remix
    
    btw, multiple SC embeds will pause each other. if lag with many, consider temporarily display: none; on older loaded embeds. 
  */
}

// Wrapper function to style the SoundCloud widget
export function soundcloudWidgetWrapper(trackUrl) {
  const wrapper = html.create('div');
  const widget = soundcloudWidget(trackUrl);

  // Style the wrapper to be 100% width
  wrapper.style.width = '100%';
  wrapper.style.position = 'relative';
  wrapper.style.paddingBottom = '56.25%'; // Aspect ratio (16:9)
  wrapper.style.height = '0';
  wrapper.style.overflow = 'hidden';

  // Make the iframe fill the wrapper
  widget.style.position = 'absolute';
  widget.style.top = '0';
  widget.style.left = '0';
  widget.style.width = '100%';
  widget.style.height = '100%';

  // Initially hide the widget
  widget.style.display = 'none';

  // Append the iframe to the wrapper
  wrapper.appendChild(widget);

  // Function to reveal the widget when clicked
  wrapper.addEventListener('click', () => {
    widget.style.display = 'block'; // Show the widget
    wrapper.style.cursor = 'default'; // Change cursor to default
  });

  return wrapper;
}

// Function to return a clickable element to reveal the widget
export function clickableWidgetReveal(trackUrl) {
  const revealElement = html.create('div');
  revealElement.textContent = "Click to reveal the SoundCloud player"; // Placeholder text
  revealElement.style.cursor = 'pointer';
  revealElement.style.textAlign = 'center';
  revealElement.style.padding = '10px';
  revealElement.style.backgroundColor = '#ff0000';
  revealElement.style.color = 'white';
  revealElement.style.borderRadius = '5px';

  // Create the hidden widget wrapped in the widgetWrapper
  const widgetWrapper = soundcloudWidgetWrapper(trackUrl);

  // Append the widget to the reveal element when clicked
  revealElement.addEventListener('click', () => {
    revealElement.style.display = 'none'; // Hide the reveal element after click
    widgetWrapper.style.display = 'block'; // Show the widget
  });

  // Initially hide the widget
  widgetWrapper.style.display = 'none';

  // Append the wrapper and reveal element together
  const container = html.create('div');
  container.appendChild(revealElement);
  container.appendChild(widgetWrapper);

  return container;
}