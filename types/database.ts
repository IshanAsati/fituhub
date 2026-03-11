export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      quiz_results: {
        Row: {
          id: string
          user_id: string
          score: number
          status: string
          focus_level: number
          discipline_level: number
          distraction_level: number
          answers: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          score: number
          status: string
          focus_level: number
          discipline_level: number
          distraction_level: number
          answers: Json
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['quiz_results']['Insert']>
        Relationships: []
      }
      challenges_completed: {
        Row: {
          id: string
          user_id: string
          challenge_text: string
          category: string
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          challenge_text: string
          category: string
          completed_at?: string
        }
        Update: Partial<Database['public']['Tables']['challenges_completed']['Insert']>
        Relationships: []
      }
      streaks: {
        Row: {
          id: string
          user_id: string
          current_streak: number
          longest_streak: number
          last_activity_date: string | null
          total_completed: number
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string | null
          total_completed?: number
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['streaks']['Insert']>
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

export type QuizResult = Database['public']['Tables']['quiz_results']['Row']
export type ChallengeCompleted = Database['public']['Tables']['challenges_completed']['Row']
export type Streak = Database['public']['Tables']['streaks']['Row']
