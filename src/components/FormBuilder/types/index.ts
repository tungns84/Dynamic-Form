// src/components/FormBuilder/types/index.ts

// Thêm enum để định nghĩa các bước wizard
export enum FormBuilderStep {
  CONFIGURE = 'configure',
  DESIGN = 'design'
}

// Cập nhật các interface hiện có
export interface FormBuilderSchema {
  display?: string;
  components: any[];
  [key: string]: any;
}

export interface SavedForm {
  id?: number;
  name: string;
  description?: string;
  schema: string | FormBuilderSchema;
  createdAt?: string;
  updatedAt?: string;
}

// Props cho các components
export interface WizardNavigationProps {
  currentStep: FormBuilderStep;
  onStepChange: (step: FormBuilderStep) => void;
  isFormNameValid: boolean;
  componentCount: number;
}

export interface FormBuilderHeaderProps {
  title: string;
  description?: string;
  //onSaveClick: () => void;
}

export interface FormBuilderCanvasProps {
  schema: FormBuilderSchema;
  onChange: (schema: FormBuilderSchema) => void;
  onBackClick: () => void;
  onSaveForm: () => void; // Thêm prop này
  isSaving: boolean;      // Thêm prop này nữa
}

export interface FormBuilderSettingsProps {
  formName: string;
  formDescription: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onNextClick: () => void;
  isFormNameValid: boolean;
}

export interface SaveFormModalProps {
  isOpen: boolean;
  formName: string;
  formDescription: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  error?: string;
}