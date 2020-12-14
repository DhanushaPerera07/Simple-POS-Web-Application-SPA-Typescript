import app from './app.component.html';
import appComponentStyle from './app.component.scss';


// handle app-root
var appHtml = '<div id="app" class="wrapper">' + app + '</div>'
$("app-root").replaceWith(appHtml);

// handle style
var html = '<style>' + appComponentStyle + '</style>'
$("#app").append(html);