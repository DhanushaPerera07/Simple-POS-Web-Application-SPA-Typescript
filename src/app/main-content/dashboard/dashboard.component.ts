import dashboard from './dashboard.component.html';
import dashboardStyle from './dashboard.component.scss';

var htmlDashboard = '<div id="dashboard">'+ dashboard +'</div>'
$("app-dashboard").replaceWith(htmlDashboard);


// console.log("I am batman !!!!");

var style = '<style>'+ dashboardStyle +'</style>';
// $("#dashboard").append(style);
$("#dashboard").append(style);