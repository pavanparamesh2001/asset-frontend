export interface Assignment {
  _id?: string;
  asset: string;
  employee: string;
  conditionGradeAtAssignment: 'A' | 'B' | 'C' | 'D' | 'F';
  conditionPhotosAtAssignment?: string[];
  conditionGradeAtReturn?: 'A' | 'B' | 'C' | 'D' | 'F' | null;
  conditionPhotosAtReturn?: string[];
  notes?: string;
  returnNotes?: string | null;
  returnDate?: string | null;
  assignedDate?: string;
}