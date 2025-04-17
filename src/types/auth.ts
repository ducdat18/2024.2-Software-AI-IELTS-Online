// src/types/auth.d.ts

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type UserRole = "admin" | "content_manager" | "candidate";
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterData extends LoginCredentials {
    name: string;
    confirmPassword: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface ResetPasswordData {
    email: string;
  }
  
  export interface UpdatePasswordData {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }
  
  export interface UserProfile extends Omit<User, "role" | "password"> {
    phone?: string;
    country?: string;
    targetScore?: number;
    testDate?: Date;
    bio?: string;
    preferences?: UserPreferences;
  }
  
  export interface UserPreferences {
    emailNotifications: boolean;
    testReminders: boolean;
    studyReminders: boolean;
    weeklyReports: boolean;
    theme: "light" | "dark" | "system";
    language: "en" | "vi";
  }
  
  export interface UserStats {
    testsCompleted: number;
    averageScore: number;
    totalStudyTime: number; // in minutes
    lastActiveDate: Date;
    progressBySkill: {
      listening: number; // 0-100 percentage
      reading: number;
      writing: number;
    };
  }