import { DashboardComponent } from "./Dashboard/dashboard";
import { AddProjectComponent } from './add-project/add-project';
import { ViewProjectComponent } from './view-project/view-project';
import { AccesseriesComponent } from './add-accesseries/accesseries';

export const AppRoutes = [
  { path: '', redirectTo: '/dashboard', pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "add-project", component: AddProjectComponent },
  { path: "add-project/:projectId", component: AddProjectComponent },
  { path: "add-project/:projectId/:phaseId", component: AddProjectComponent },
  { path: "add-project/:projectId/:phaseId/:milestoneId", component: AddProjectComponent },
  { path: "add-project/:projectId/:phaseId/:milestoneId/:deviceId", component: AddProjectComponent },
  { path: "add-project/:projectId/:phaseId/:milestoneId/:deviceId/:accessoryId", component: AddProjectComponent },
  { path: "add-project/:projectId/:phaseId/:milestoneId/:deviceId/:accessoryId/:configurationId", component: AddProjectComponent },
  { path: "view-project", component: ViewProjectComponent },
  { path: "view-project/:projectId", component: ViewProjectComponent },
  { path: "view-project/:projectId/:phaseId", component: ViewProjectComponent },
  { path: "view-project/:projectId/:phaseId/:milestoneId", component: ViewProjectComponent },
  { path: "view-project/:projectId/:phaseId/:milestoneId/:deviceId", component: ViewProjectComponent },
  { path: "view-project/:projectId/:phaseId/:milestoneId/:deviceId/:accessoryId", component: ViewProjectComponent },
  { path: "view-project/:projectId/:phaseId/:milestoneId/:deviceId/:accessoryId/:configurationId", component: ViewProjectComponent },
  { path: "add-accesseries", component: AccesseriesComponent },
]
