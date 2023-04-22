import FormData from "form-data";
export interface NewEvent {
  data: FormData;
  isPosting?: boolean;
  error?: string;
}

export interface NewEventData {
  name?: string;
  long?: number;
  lat?: number;
  acceptedFiles?: File[];
  description?: string;
  date?: string;
  time?: string;
}

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export interface MyKnownError {
  message: string;
}
