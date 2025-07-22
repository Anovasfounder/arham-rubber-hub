export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'admin' | 'teacher' | 'student' | 'parent'
          avatar_url: string | null
          phone: string | null
          address: string | null
          date_of_birth: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: 'admin' | 'teacher' | 'student' | 'parent'
          avatar_url?: string | null
          phone?: string | null
          address?: string | null
          date_of_birth?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'admin' | 'teacher' | 'student' | 'parent'
          avatar_url?: string | null
          phone?: string | null
          address?: string | null
          date_of_birth?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      schools: {
        Row: {
          id: string
          name: string
          address: string | null
          phone: string | null
          email: string | null
          website: string | null
          logo_url: string | null
          principal_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          logo_url?: string | null
          principal_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          logo_url?: string | null
          principal_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          id: string
          user_id: string | null
          school_id: string | null
          student_id: string
          class_id: string | null
          admission_date: string | null
          parent_phone: string | null
          parent_email: string | null
          emergency_contact: string | null
          medical_info: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          school_id?: string | null
          student_id: string
          class_id?: string | null
          admission_date?: string | null
          parent_phone?: string | null
          parent_email?: string | null
          emergency_contact?: string | null
          medical_info?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          school_id?: string | null
          student_id?: string
          class_id?: string | null
          admission_date?: string | null
          parent_phone?: string | null
          parent_email?: string | null
          emergency_contact?: string | null
          medical_info?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      teachers: {
        Row: {
          id: string
          user_id: string | null
          school_id: string | null
          teacher_id: string
          department: string | null
          qualification: string | null
          experience_years: number | null
          specialization: string | null
          salary: number | null
          joining_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          school_id?: string | null
          teacher_id: string
          department?: string | null
          qualification?: string | null
          experience_years?: number | null
          specialization?: string | null
          salary?: number | null
          joining_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          school_id?: string | null
          teacher_id?: string
          department?: string | null
          qualification?: string | null
          experience_years?: number | null
          specialization?: string | null
          salary?: number | null
          joining_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      classes: {
        Row: {
          id: string
          school_id: string | null
          name: string
          grade_level: number
          section: string | null
          class_teacher_id: string | null
          max_students: number | null
          academic_year_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          school_id?: string | null
          name: string
          grade_level: number
          section?: string | null
          class_teacher_id?: string | null
          max_students?: number | null
          academic_year_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          school_id?: string | null
          name?: string
          grade_level?: number
          section?: string | null
          class_teacher_id?: string | null
          max_students?: number | null
          academic_year_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      subjects: {
        Row: {
          id: string
          school_id: string | null
          name: string
          code: string | null
          description: string | null
          color: string | null
          credits: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          school_id?: string | null
          name: string
          code?: string | null
          description?: string | null
          color?: string | null
          credits?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          school_id?: string | null
          name?: string
          code?: string | null
          description?: string | null
          color?: string | null
          credits?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      assignments: {
        Row: {
          id: string
          class_subject_id: string | null
          title: string
          description: string | null
          instructions: string | null
          due_date: string | null
          max_marks: number | null
          attachment_url: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          class_subject_id?: string | null
          title: string
          description?: string | null
          instructions?: string | null
          due_date?: string | null
          max_marks?: number | null
          attachment_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          class_subject_id?: string | null
          title?: string
          description?: string | null
          instructions?: string | null
          due_date?: string | null
          max_marks?: number | null
          attachment_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      attendance: {
        Row: {
          id: string
          student_id: string | null
          class_subject_id: string | null
          date: string
          status: 'present' | 'absent' | 'late' | 'excused'
          remarks: string | null
          marked_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id?: string | null
          class_subject_id?: string | null
          date: string
          status: 'present' | 'absent' | 'late' | 'excused'
          remarks?: string | null
          marked_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string | null
          class_subject_id?: string | null
          date?: string
          status?: 'present' | 'absent' | 'late' | 'excused'
          remarks?: string | null
          marked_by?: string | null
          created_at?: string
        }
        Relationships: []
      }
      announcements: {
        Row: {
          id: string
          school_id: string | null
          title: string
          content: string
          priority: 'low' | 'normal' | 'high' | 'urgent' | null
          target_audience: 'all' | 'students' | 'teachers' | 'parents' | null
          class_id: string | null
          attachment_url: string | null
          published: boolean | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          school_id?: string | null
          title: string
          content: string
          priority?: 'low' | 'normal' | 'high' | 'urgent' | null
          target_audience?: 'all' | 'students' | 'teachers' | 'parents' | null
          class_id?: string | null
          attachment_url?: string | null
          published?: boolean | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          school_id?: string | null
          title?: string
          content?: string
          priority?: 'low' | 'normal' | 'high' | 'urgent' | null
          target_audience?: 'all' | 'students' | 'teachers' | 'parents' | null
          class_id?: string | null
          attachment_url?: string | null
          published?: boolean | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      grades: {
        Row: {
          id: string
          exam_subject_id: string | null
          student_id: string | null
          marks_obtained: number | null
          grade_letter: string | null
          remarks: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          exam_subject_id?: string | null
          student_id?: string | null
          marks_obtained?: number | null
          grade_letter?: string | null
          remarks?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          exam_subject_id?: string | null
          student_id?: string | null
          marks_obtained?: number | null
          grade_letter?: string | null
          remarks?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "admin" | "teacher" | "student" | "parent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
