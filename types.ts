
export enum UserRole {
  STUDENT = 'STUDENT',
  LECTURER = 'LECTURER',
  ADMIN = 'ADMIN'
}

export enum AttendanceStatus {
  IDLE = 'IDLE',
  PERMISSION_NEEDED = 'PERMISSION_NEEDED',
  SCANNING = 'SCANNING',
  VERIFYING = 'VERIFYING',
  SUCCESS = 'SUCCESS',
  ERROR_LOCATION = 'ERROR_LOCATION',
  ERROR_EXPIRED = 'ERROR_EXPIRED',
  ERROR_DENIED = 'ERROR_DENIED',
  ALREADY_MARKED = 'ALREADY_MARKED'
}

export interface Course {
  id: string;
  code: string;
  name: string;
  room: string;
  time: string;
  imageUrl: string;
  isActive?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}
