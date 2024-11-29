import { html } from "/shared/html.js";
import { css }  from "/shared/misc.js";

export function baslak() {
  css(`
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center; /* Centers text inside elements */
      min-height: 100vh;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    div {
      margin: 1rem 0;
    }

    a {
      margin-right: 1rem; /* Adjust the margin between the links */
      white-space: normal; /* Allows text to wrap */
      word-wrap: break-word; /* Breaks long words */
      overflow-wrap: break-word; /* Additional support for breaking words in certain browsers */
      display: inline; /* Ensures the link is inline and can wrap */
      text-decoration: none; /* Removes underline */
      color: #007bff;
    }

    img {
      max-width: 500px; /* Limit the size of the image */
      width: 100%; /* Make sure it scales down responsively */
      height: auto; /* Keep the aspect ratio */
      margin: 1rem 0; /* Adds uniform margin above and below the image */
    }

    iframe {
      max-width: 500px; /* Make sure the iframe scales responsively */
      height: 500px;
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
      a {
        display: block; /* Stack the links vertically on smaller screens */
        margin-bottom: 1rem;
        margin-right: 0;
      }

      img {
        max-width: 300px; /* Reduce image size further on mobile */
      }
    }
  `);
  document.body.append(
    html.h1('Baslak'),
    html.div( 
      html.create('a',
        { href: 'https://instagram.com/badallmann', target: '_blank' }, 
        'Instagram'
      ),
      html.create('a',
        { href: 'https://vsco.co/badallmann', target: '_blank' }, 
        'VSCO'
      ),
      html.create('a',
        { href: 'https://open.spotify.com/user/115564945?si=0ed9dbeb1eeb48ac', target: '_blank' }, 
        'Spotify'
      ),
      html.create('a',
        { href: 'https://soundcloud.com/badallmann', target: '_blank' }, 
        'SoundCloud'
      ),
      html.create('a',
        { href: 'https://www.youtube.com/@badallmann', target: '_blank' }, 
        'YouTube'
      )
    ),
    html.img('/assets/1.jpg'),
    html.br()
  );
}