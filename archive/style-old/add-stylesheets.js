import { linkStylesheets, css } from '/shared/misc.js'

export function addStylesheets() {
  linkStylesheets(
    '/style/normalize.css',
    '/style/pointer.css',
    '/style/color.css',
    
    '/style/menu.css',
    // '/css/layout.css',
    // '/css/fonts.css',
    // '/css/finesse.css',
    // '/css/video.css',
    // '/css/soundcloud.css',
    // '/css/singles.css',
  )
}