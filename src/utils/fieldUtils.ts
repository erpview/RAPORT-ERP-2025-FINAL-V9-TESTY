import { SystemField } from '../hooks/useSystemFields';

// List of field keys that should always be treated as multiselect
const MULTISELECT_FIELD_KEYS = [
  'size',
  'supported_databases',
  'pricing_model',
  'target_industries',
  'languages',
  'support_options',
  'training_options',
  'integration_options',
  'security_features',
  'compliance_standards',
  'backup_options',
  'reporting_features',
  'deployment_type'
];

/**
 * Normalize a multiselect value into an array of strings
 */
export const normalizeMultiselectValue = (value: unknown): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .filter((v): v is string => typeof v === 'string')
      .flatMap(v => v.split(',').map(s => s.trim()))
      .filter(Boolean);
  }
  if (typeof value === 'string') {
    return value.split(',').map(v => v.trim()).filter(Boolean);
  }
  return [];
};

/**
 * Check if a field should be treated as a multiselect field
 */
export const isMultiselectField = (field: SystemField | { field_type?: string, field_key?: string }): boolean => {
  return Boolean(
    field.field_type === 'multiselect' || 
    (field.field_key && MULTISELECT_FIELD_KEYS.includes(field.field_key))
  );
};
