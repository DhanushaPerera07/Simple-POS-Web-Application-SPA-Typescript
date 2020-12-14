import mainSideBar from './main-sidebar.component.html';
import mainSideBarStyle from './main-sidebar.component.scss';


// handle app-main-sidebar
$("app-main-sidebar").replaceWith('<div id="mainSideBar">' + mainSideBar + '</div>');
