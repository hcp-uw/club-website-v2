export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// TODO: define and add a sponsorship table and CRUD operations 
export type Database = {
  public: {
    Tables: {
      Events: {
        Row: {
          created_at: string
          description: string
          image: string
          id: number
          location: string
          name: string
          start_time: string
          end_time: string
        }
        Insert: {
          created_at?: string
          description: string
          image: string
          id?: number
          location: string
          name: string
          start_time: string
          end_time: string
        }
        Update: {
          created_at?: string
          description?: string
          image?: string
          id?: number
          location?: string
          name?: string
          start_time?: string
          end_time?: string
        }
        Relationships: []
      }
      ghmembers: {
        Row: {
          avatar_url: string
          events_url: string
          followers_url: string
          following_url: string
          gists_url: string
          gravatar_id: string
          html_url: string
          id: number
          login: string
          organizations_url: string
          received_events_url: string
          repos_url: string
          site_admin: boolean
          starred_url: string
          type: string
          url: string
        }
        Insert: {
          avatar_url: string
          events_url: string
          followers_url: string
          following_url: string
          gists_url: string
          gravatar_id: string
          html_url: string
          id: number
          login: string
          organizations_url: string
          received_events_url: string
          repos_url: string
          site_admin: boolean
          starred_url: string
          type: string
          url: string
        }
        Update: {
          avatar_url?: string
          events_url?: string
          followers_url?: string
          following_url?: string
          gists_url?: string
          gravatar_id?: string
          html_url?: string
          id?: number
          login?: string
          organizations_url?: string
          received_events_url?: string
          repos_url?: string
          site_admin?: boolean
          starred_url?: string
          type?: string
          url?: string
        }
        Relationships: []
      }
      ghteammembers: {
        Row: {
          member_id: number
          team_id: number
        }
        Insert: {
          member_id: number
          team_id?: number
        }
        Update: {
          member_id?: number
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_ghteammembers_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "ghmembers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_ghteammembers_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "ghteams"
            referencedColumns: ["id"]
          },
        ]
      }
      ghteams: {
        Row: {
          description: string
          html_url: string
          id: number
          members_url: string
          name: string
          notification_setting: string
          parent_id: number | null
          permission: string
          privacy: string
          repositories_url: string
          slug: string
          url: string
        }
        Insert: {
          description?: string
          html_url: string
          id?: number
          members_url: string
          name: string
          notification_setting: string
          parent_id?: number | null
          permission: string
          privacy: string
          repositories_url: string
          slug: string
          url: string
        }
        Update: {
          description?: string
          html_url?: string
          id?: number
          members_url?: string
          name?: string
          notification_setting?: string
          parent_id?: number | null
          permission?: string
          privacy?: string
          repositories_url?: string
          slug?: string
          url?: string
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
          linkedin: string | null
          memberId: number
          profilePicture: string
        }
        Insert: {
          created_at?: string
          discord: string
          email: string
          firstName: string
          github: string
          lastName: string
          linkedin?: string | null
          memberId?: number
          profilePicture: string
        }
        Update: {
          created_at?: string
          discord?: string
          email?: string
          firstName?: string
          github?: string
          lastName?: string
          linkedin?: string | null
          memberId?: number
          profilePicture?: string
        }
        Relationships: []
      }
      Sponsors: {
        Row: {
          id: number;
          name: string;
          description: string;
          logo: string;
          website: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          description: string;
          logo: string;
          website: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string;
          logo?: string;
          website?: string;
          created_at?: string;
        };
        Relationships: [];
      };
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
          teamId: number
        }
        Insert: {
          created_at?: string
          id?: number
          repoId?: number | null
          teamId: number
        }
        Update: {
          created_at?: string
          id?: number
          repoId?: number | null
          teamId?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_ProjectRequests_teamId_fkey"
            columns: ["teamId"]
            isOneToOne: false
            referencedRelation: "ghteams"
            referencedColumns: ["id"]
          },
        ]
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
          githubRepo: string
          logo: string
          name: string
          teamId: number
        }
        Insert: {
          created_at?: string
          deployLink?: string | null
          githubRepo: string
          logo: string
          name: string
          teamId?: number
        }
        Update: {
          created_at?: string
          deployLink?: string | null
          githubRepo?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
