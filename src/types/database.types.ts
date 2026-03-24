export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          slug: string
          category: string
          subcategory: string
          short_description: string | null
          description: string | null
          specs: string[] | null
          material: string | null
          work_type: string | null
          tag: string | null
          image_urls: string[] | null
          featured: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          category: string
          subcategory: string
          short_description?: string | null
          description?: string | null
          specs?: string[] | null
          material?: string | null
          work_type?: string | null
          tag?: string | null
          image_urls?: string[] | null
          featured?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          category?: string
          subcategory?: string
          short_description?: string | null
          description?: string | null
          specs?: string[] | null
          material?: string | null
          work_type?: string | null
          tag?: string | null
          image_urls?: string[] | null
          featured?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
