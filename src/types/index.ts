// src/types/index.ts
export interface FormSchema {
  components: any[];
  [key: string]: any;
}

export interface FormData {
  id?: number;
  name: string;
  schema: string | FormSchema;
}

export interface Submission {
  id?: number;
  formId: number;
  data: any;
  createdAt?: string;
  updatedAt?: string;
  isDraft?: boolean;
  progressPercent?: number;
}

export interface SubmissionDTO {
  formId: number;
  data: any;
  draftId?: number;
}

// SDMX Types
export interface SDMXDataMessage {
  header: SDMXHeader;
  dataSets: SDMXDataSet[];
}

export interface SDMXHeader {
  id: string;
  test: boolean;
  prepared: string;
  sender: SDMXSender;
}

export interface SDMXSender {
  id: string;
}

export interface SDMXDataSet {
  action: string;
  datasetId: string;
  observations: SDMXObservation[];
}

export interface SDMXObservation {
  dimensionValues: string[];
  observationValue: any;
}