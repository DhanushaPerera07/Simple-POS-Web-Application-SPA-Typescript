import brandLogo from './brand-logo.component.html';
import brandLogoStyle from './brand-logo.component.scss';

// handle app-brand-logo
// var htmlBrandLogo = '<div id="brandLogo">' + brandLogo + '</div>';
var htmlBrandLogo = brandLogo;
$("app-brand-logo").replaceWith(htmlBrandLogo);