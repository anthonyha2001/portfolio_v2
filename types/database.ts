export type UserRole = 'client' | 'admin';
export type InvoiceStatus = 'unpaid' | 'paid';

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  google_id: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  status: string | null;
  current_stage: number;
  created_at: string;
  updated_at: string;
}

export interface IntakeForm {
  id: string;
  project_id: string;
  data: Record<string, any> | null;
  locked: boolean;
  submitted_at: string | null;
}

export interface Invoice {
  id: string;
  project_id: string;
  amount: number;
  status: InvoiceStatus;
  due_date: string | null;
  paid_at: string | null;
}

export interface ProjectNote {
  id: string;
  project_id: string;
  content: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>;
      };
      intake_forms: {
        Row: IntakeForm;
        Insert: Omit<IntakeForm, 'id'>;
        Update: Partial<Omit<IntakeForm, 'id'>>;
      };
      invoices: {
        Row: Invoice;
        Insert: Omit<Invoice, 'id'>;
        Update: Partial<Omit<Invoice, 'id'>>;
      };
      project_notes: {
        Row: ProjectNote;
        Insert: Omit<ProjectNote, 'id' | 'created_at'>;
        Update: Partial<Omit<ProjectNote, 'id' | 'created_at'>>;
      };
    };
  };
}

