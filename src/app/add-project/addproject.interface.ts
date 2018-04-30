export interface Project {

    projectId: string;
    projectName: string;
    projectDetails: string;
    phase: string;
    milestone: string;
    deviceName: string;
    id: string;
    name: string;
    components: string;
    description:string;
    units: number;
    subsystem: string;
    assignedTo: string;
    testTeam: string;
    location: string;
    priority: number;
    targetDate: Date;
    shippedDate: Date;
    unitsShipped: number;
    prvisioned: string;
    smoketest: string;
    notes: string;


}