// ─── User Roles ───────────────────────────────────────────────────────────────
export type Role =
  | "admin_global"
  | "admin_metier"
  | "admin_externe"
  | "user_interne"
  | "user_externe";

// ─── User ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  clerk_id: string;
  nom: string;
  prenom: string;
  email: string;
  role: Role;
  is_active: boolean;
  free_access: boolean;       // boolean toggle for intern users, managed by admin_global
  organisation?: string;      // only for external users/admins
  created_at: string;
}

// ─── Dataset ──────────────────────────────────────────────────────────────────
export interface Dataset {
  id: string;
  nom: string;
  date_import: string;
  importe_par: string;
  taille: number;
  format: string;
  famille: string;
  status: "pending" | "validated" | "rejected";
}

export interface Famille {
  id: string;
  nom: string;
  description: string;
}

// ─── Request ──────────────────────────────────────────────────────────────────
export interface AccessRequest {
  id: string;
  email: string;
  company_name: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  reviewed_by?: string;
  reviewed_at?: string;
}

// ─── Group ────────────────────────────────────────────────────────────────────
export interface Group {
  id: string;
  nom: string;
  data_creation: string;
  membres: User[];
  abonnement?: Subscription;
}

// ─── Subscription ─────────────────────────────────────────────────────────────
export interface Subscription {
  id: string;
  group_id: string;
  date_debut: string;
  date_fin: string;
  statut: "active" | "inactive" | "expired";
  stripe_subscription_id: string;
}

// ─── Log ──────────────────────────────────────────────────────────────────────
export interface Log {
  id: string;
  user_id: string;
  user_email: string;
  action: string;
  created_at: string;
}

// ─── API Response ─────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiError {
  detail: string;
  code?: string;
}