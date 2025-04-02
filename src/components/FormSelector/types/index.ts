// src/components/FormSelector/types/index.ts
import { FormData, FormSchema, Submission } from '../../../types';

// Enum for tab management
export enum TabType {
  INPUT = 'input',
  DRAFTS = 'drafts',
  SUBMISSIONS = 'submissions'
}

// Form component interface
export interface FormComponent {
  type: string;
  key?: string;
  components?: FormComponent[];
  columns?: { components?: FormComponent[] }[];
  [key: string]: any;
}

// Notification properties
export interface NotificationProps {
  id: number;
  type: 'success' | 'error' | 'warning';
  message: string;
}

// Props interfaces for components
export interface FormSelectHeaderProps {
  forms: FormData[];
  selectedForm: FormData | null;
  isLoading: boolean;
  onFormSelect: (formId: string) => void;
}

export interface FormTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  draftsCount: number;
  submissionsCount: number;
  isLoading: boolean;
}

export interface InputTabProps {
  selectedForm: FormData;
  formData: any;
  progressPercent: number;
  isFormValid: boolean;
  formErrors: string[];
  isEditing: boolean;
  currentSubmission: Submission | null;
  isLoading: boolean;
  onFormChange: (changed: any) => void;
  onSubmit: (submission: { data: any }) => void;
  onSaveFormData: () => void;
  onSaveDraft: () => void;
  onCancelEdit: () => void;
}

export interface DraftsTabProps {
  selectedForm: FormData;
  drafts: Submission[];
  isLoading: boolean;
  onEditDraft: (draft: Submission) => void;
  onDeleteDraft: (draftId: number | undefined) => void;
}

export interface SubmissionsTabProps {
  selectedForm: FormData;
  submissions: Submission[];
  isLoading: boolean;
  onViewSubmission: (submission: Submission) => void;
  onEditSubmission: (submission: Submission) => void;
  onViewSdmxData: (submissionId: number | undefined) => void;
  onExportToPdf: (submission: Submission) => void;
}

export interface ViewDetailsModalProps {
  isOpen: boolean;
  selectedForm: FormData;
  submission: Submission | null;
  isLoading: boolean;
  onClose: () => void;
  onExportToPdf: (submission: Submission) => void;
}

export interface NotificationsProps {
  notifications: NotificationProps[];
}

export type { FormData, FormSchema, Submission } from '../../../types';