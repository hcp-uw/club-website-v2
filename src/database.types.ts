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
      Events: {
        Row: {
          created_at: string
          description: string
          end_time: string
          id: number
          image: string
          location: string
          name: string
          start_time: string
        }
        Insert: {
          created_at?: string
          description: string
          end_time: string
          id?: number
          image: string
          location: string
          name: string
          start_time: string
        }
        Update: {
          created_at?: string
          description?: string
          end_time?: string
          id?: number
          image?: string
          location?: string
          name?: string
          start_time?: string
        }
        Relationships: []
      }
      Members: {
        Row: {
          created_at: string
          discord: string
          email: string
          firstName: string
          github: string
          lastName: string
          lead: boolean
          linkedin: string | null
          memberId: number
          profilePicture: string
          teamleads: string | null
        }
        Insert: {
          created_at?: string
          discord: string
          email: string
          firstName: string
          github: string
          lastName: string
          lead?: boolean
          linkedin?: string | null
          memberId?: number
          profilePicture: string
          teamleads?: string | null
        }
        Update: {
          created_at?: string
          discord?: string
          email?: string
          firstName?: string
          github?: string
          lastName?: string
          lead?: boolean
          linkedin?: string | null
          memberId?: number
          profilePicture?: string
          teamleads?: string | null
        }
        Relationships: []
      }
      ProjectRequestRelation: {
        Row: {
          created_at: string
          id: number
          requestId: number
        }
        Insert: {
          created_at?: string
          id?: number
          requestId: number
        }
        Update: {
          created_at?: string
          id?: number
          requestId?: number
        }
        Relationships: []
      }
      ProjectRequests: {
        Row: {
          created_at: string
          id: number
          repoId: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          repoId?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          repoId?: number | null
        }
        Relationships: []
      }
      Sponsors: {
        Row: {
          createdDate: string | null
          description: string | null
          logo: string | null
          name: string
          sponsorId: number
          website: string | null
        }
        Insert: {
          createdDate?: string | null
          description?: string | null
          logo?: string | null
          name: string
          sponsorId?: number
          website?: string | null
        }
        Update: {
          createdDate?: string | null
          description?: string | null
          logo?: string | null
          name?: string
          sponsorId?: number
          website?: string | null
        }
        Relationships: []
      }
      TeamMemberRelation: {
        Row: {
          created_at: string
          id: number
          memberId: number
          teamId: number
        }
        Insert: {
          created_at?: string
          id?: number
          memberId: number
          teamId: number
        }
        Update: {
          created_at?: string
          id?: number
          memberId?: number
          teamId?: number
        }
        Relationships: [
          {
            foreignKeyName: "TeamMemberRelation_teamId_fkey"
            columns: ["teamId"]
            isOneToOne: false
            referencedRelation: "Teams"
            referencedColumns: ["teamId"]
          },
        ]
      }
      Teams: {
        Row: {
          created_at: string
          deployLink: string | null
          githubRepo: string | null
          lead: boolean
          logo: string
          name: string
          teamId: number
        }
        Insert: {
          created_at?: string
          deployLink?: string | null
          githubRepo?: string | null
          lead?: boolean
          logo: string
          name: string
          teamId?: number
        }
        Update: {
          created_at?: string
          deployLink?: string | null
          githubRepo?: string | null
          lead?: boolean
          logo?: string
          name?: string
          teamId?: number
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
