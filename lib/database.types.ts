export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
          updated_at: string
          avatar_url: string | null
          height: number | null
          weight: number | null
          date_of_birth: string | null
          gender: string | null
        }
        Insert: {
          id?: string
          email: string
          name: string
          created_at?: string
          updated_at?: string
          avatar_url?: string | null
          height?: number | null
          weight?: number | null
          date_of_birth?: string | null
          gender?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
          updated_at?: string
          avatar_url?: string | null
          height?: number | null
          weight?: number | null
          date_of_birth?: string | null
          gender?: string | null
        }
      }
      workout_types: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      workouts: {
        Row: {
          id: string
          user_id: string
          name: string
          workout_type_id: string | null
          date: string
          duration: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          workout_type_id?: string | null
          date?: string
          duration?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          workout_type_id?: string | null
          date?: string
          duration?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      exercises: {
        Row: {
          id: string
          name: string
          description: string | null
          muscle_group: string | null
          is_default: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          muscle_group?: string | null
          is_default?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          muscle_group?: string | null
          is_default?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      workout_exercises: {
        Row: {
          id: string
          workout_id: string
          exercise_id: string
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          workout_id: string
          exercise_id: string
          order_index: number
          created_at?: string
        }
        Update: {
          id?: string
          workout_id?: string
          exercise_id?: string
          order_index?: number
          created_at?: string
        }
      }
      sets: {
        Row: {
          id: string
          workout_exercise_id: string
          set_number: number
          reps: number | null
          weight: number | null
          duration: number | null
          distance: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workout_exercise_id: string
          set_number: number
          reps?: number | null
          weight?: number | null
          duration?: number | null
          distance?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workout_exercise_id?: string
          set_number?: number
          reps?: number | null
          weight?: number | null
          duration?: number | null
          distance?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          target_value: number | null
          current_value: number | null
          unit: string | null
          exercise_id: string | null
          start_date: string
          target_date: string | null
          completed: boolean
          completed_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          target_value?: number | null
          current_value?: number | null
          unit?: string | null
          exercise_id?: string | null
          start_date: string
          target_date?: string | null
          completed?: boolean
          completed_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          target_value?: number | null
          current_value?: number | null
          unit?: string | null
          exercise_id?: string | null
          start_date?: string
          target_date?: string | null
          completed?: boolean
          completed_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      body_measurements: {
        Row: {
          id: string
          user_id: string
          date: string
          weight: number | null
          body_fat_percentage: number | null
          chest: number | null
          waist: number | null
          hips: number | null
          arms: number | null
          thighs: number | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          weight?: number | null
          body_fat_percentage?: number | null
          chest?: number | null
          waist?: number | null
          hips?: number | null
          arms?: number | null
          thighs?: number | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          weight?: number | null
          body_fat_percentage?: number | null
          chest?: number | null
          waist?: number | null
          hips?: number | null
          arms?: number | null
          thighs?: number | null
          notes?: string | null
          created_at?: string
        }
      }
    }
  }
}
