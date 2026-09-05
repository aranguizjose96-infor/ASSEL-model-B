import { siteContent, type EditableSiteContent } from './content';

const IMMUTABLE_KEYS = new Set(['version', 'id']);
const MAX_TEXT_LENGTH = 5000;

function validateNode(candidate: unknown, template: unknown, path: string, errors: string[]) {
  if (typeof template === 'string') {
    if (typeof candidate !== 'string') {
      errors.push(`${path}: debe ser texto.`);
      return;
    }
    if (!candidate.trim()) errors.push(`${path}: no puede quedar vacío.`);
    if (candidate.length > MAX_TEXT_LENGTH) errors.push(`${path}: supera ${MAX_TEXT_LENGTH} caracteres.`);
    return;
  }

  if (typeof template === 'number') {
    if (candidate !== template) errors.push(`${path}: este valor no se puede modificar.`);
    return;
  }

  if (Array.isArray(template)) {
    if (!Array.isArray(candidate) || candidate.length !== template.length) {
      errors.push(`${path}: no se pueden agregar ni eliminar elementos.`);
      return;
    }
    template.forEach((item, index) => validateNode(candidate[index], item, `${path}[${index}]`, errors));
    return;
  }

  if (template && typeof template === 'object') {
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
      errors.push(`${path}: estructura inválida.`);
      return;
    }
    const templateRecord = template as Record<string, unknown>;
    const candidateRecord = candidate as Record<string, unknown>;
    const templateKeys = Object.keys(templateRecord);
    const candidateKeys = Object.keys(candidateRecord);
    if (templateKeys.length !== candidateKeys.length || templateKeys.some((key) => !candidateKeys.includes(key))) {
      errors.push(`${path}: la estructura de la página no se puede modificar.`);
      return;
    }
    for (const key of templateKeys) {
      if (IMMUTABLE_KEYS.has(key) && candidateRecord[key] !== templateRecord[key]) {
        errors.push(`${path}.${key}: este identificador no se puede modificar.`);
        continue;
      }
      validateNode(candidateRecord[key], templateRecord[key], `${path}.${key}`, errors);
    }
  }
}

export function validateSiteContent(candidate: unknown): { valid: true; content: EditableSiteContent } | { valid: false; errors: string[] } {
  const errors: string[] = [];
  validateNode(candidate, siteContent, 'contenido', errors);
  if (errors.length) return { valid: false, errors };
  return { valid: true, content: candidate as EditableSiteContent };
}
