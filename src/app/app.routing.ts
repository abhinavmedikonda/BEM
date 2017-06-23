import { DashboardComponent } from "./Dashboard/dashboard";
import { AddProjectComponent } from './add-project/add-project';
import { ViewProjectComponent } from './view-project/view-project';
import { AccesseriesComponent } from './add-accesseries/accesseries';

export const AppRoutes = [
    { path: '', redirectTo: '/dashboard', pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent },
    { path: "add-project", component: AddProjectComponent },
    { path: "view-project", component: ViewProjectComponent },
    { path: "add-accesseries", component: AccesseriesComponent },

]



