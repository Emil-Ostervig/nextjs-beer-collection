export interface BeerFilterFormProps {
  onSubmit: (values: {[id: string]: string}) => void;
  layout: 'vertical' | 'horizontal' | null;
  submitText?: string;
  children?: any,
}
