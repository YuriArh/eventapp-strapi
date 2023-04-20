import FormData from "form-data";
export interface NewEvent {
  data: NewEventData;
  isPosting?: boolean;
  error?: string;
}

export interface NewEventData {
  name?: string;
  long?: number;
  lat?: number;
  img?: string;
  desc?: string;
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
