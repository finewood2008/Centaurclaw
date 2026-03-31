import { test, expect, describe } from 'vitest';
import { resolveCodingPlanBaseUrl } from './codingPlan';
import { ProviderName } from './constants';

describe('resolveCodingPlanBaseUrl', () => {
  test('returns currentBaseUrl unchanged when codingPlanEnabled is false', () => {
    const result = resolveCodingPlanBaseUrl('custom_0', false, 'anthropic', 'https://custom.url');
    expect(result.baseUrl).toBe('https://custom.url');
    expect(result.effectiveFormat).toBe('anthropic');
  });

  test('returns currentBaseUrl unchanged for provider not in registry', () => {
    const result = resolveCodingPlanBaseUrl(ProviderName.OpenAI, true, 'openai', 'https://api.openai.com/v1');
    expect(result.baseUrl).toBe('https://api.openai.com/v1');
    expect(result.effectiveFormat).toBe('openai');
  });

  test('returns currentBaseUrl unchanged for custom provider with codingPlanEnabled', () => {
    const result = resolveCodingPlanBaseUrl('custom_0', true, 'anthropic', 'https://custom.example.com');
    expect(result.baseUrl).toBe('https://custom.example.com');
    expect(result.effectiveFormat).toBe('anthropic');
  });

  test('returns currentBaseUrl unchanged for any provider not in registry', () => {
    const result = resolveCodingPlanBaseUrl('unknown_provider', true, 'openai', 'https://some.url/v1');
    expect(result.baseUrl).toBe('https://some.url/v1');
    expect(result.effectiveFormat).toBe('openai');
  });
});
