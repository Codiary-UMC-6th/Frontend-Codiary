import { GeneralResponse } from "@/shared/api/generalResponse";

export interface Team {
    team_id: number;
    team_name: string;
}

export interface TeamListResult {
    teams: Team[]
}

export type GetTeamListResponse = GeneralResponse<TeamListResult>;
