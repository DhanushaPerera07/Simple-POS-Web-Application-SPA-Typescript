// import mainModule from './app/app.module';
import './app/app.module';
import mainStyle from './style.scss';

// import '../node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js';
// import '../node_modules/admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js';
// import '../node_modules/admin-lte/dist/js/adminlte.js';


// $("app-root").replaceWith("<div id='main'>" + mainModule + "</div>");
var html = '<style>' + mainStyle + '</style>';
$("head").append(html);