export interface MatchesInfo {
  newCases: number;
  waitingCases: number;
  inProcess: number;
  closedCases: number;
}

export interface TableInfo {
  caseId: string;
  fileDate: Date;
  violenceType: number[];
  location: string;
  reports: number;
  status: string;
  referredTo: string;
  flag: boolean;
}

export interface NewReports {
  reportId: number;
  date: Date;
  violenceType: string[];
  location: string;
  complaintFiled: boolean;
}

export interface Reports {
  matchesInfo: MatchesInfo;
  tableInfo: TableInfo[];
  newReports: NewReports[];
}
