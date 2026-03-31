import { test, expect, describe } from 'vitest';
import {
  ProviderName,
  ProviderRegistry,
} from './constants';

describe('ProviderName constants', () => {
  test('contains expected provider keys', () => {
    expect(ProviderName.Custom).toBe('custom');
    expect(ProviderName.LobsteraiServer).toBe('lobsterai-server');
  });
});

describe('ProviderRegistry', () => {
  test('providerIds returns 0 providers (all built-ins removed)', () => {
    const ids = ProviderRegistry.providerIds;
    expect(ids.length).toBe(0);
    expect(ids).not.toContain(ProviderName.Custom);
    expect(ids).not.toContain(ProviderName.LobsteraiServer);
  });

  test('get returns undefined for all former built-in providers', () => {
    expect(ProviderRegistry.get(ProviderName.OpenAI)).toBeUndefined();
    expect(ProviderRegistry.get(ProviderName.DeepSeek)).toBeUndefined();
    expect(ProviderRegistry.get(ProviderName.Custom)).toBeUndefined();
  });

  test('get returns undefined for unknown provider', () => {
    expect(ProviderRegistry.get('nonexistent')).toBeUndefined();
    expect(ProviderRegistry.get(ProviderName.Custom)).toBeUndefined();
  });

  test('supportsCodingPlan is false for all providers (none registered)', () => {
    expect(ProviderRegistry.supportsCodingPlan(ProviderName.OpenAI)).toBe(false);
    expect(ProviderRegistry.supportsCodingPlan(ProviderName.DeepSeek)).toBe(false);
    expect(ProviderRegistry.supportsCodingPlan('unknown')).toBe(false);
  });

  test('idsByRegion china returns 0 providers', () => {
    const china = ProviderRegistry.idsByRegion('china');
    expect(china.length).toBe(0);
  });

  test('idsByRegion global returns 0 providers', () => {
    const global = ProviderRegistry.idsByRegion('global');
    expect(global.length).toBe(0);
  });

  test('idsForEnLocale returns empty array', () => {
    const en = ProviderRegistry.idsForEnLocale();
    expect(en.length).toBe(0);
    expect(en).not.toContain(ProviderName.Custom);
  });

  test('idsForEnLocale has no duplicates', () => {
    const en = ProviderRegistry.idsForEnLocale();
    expect(new Set(en).size).toBe(en.length);
  });

  describe('getCodingPlanUrl', () => {
    test('returns undefined for all providers (none registered)', () => {
      expect(ProviderRegistry.getCodingPlanUrl(ProviderName.OpenAI, 'openai')).toBeUndefined();
      expect(ProviderRegistry.getCodingPlanUrl(ProviderName.DeepSeek, 'anthropic')).toBeUndefined();
      expect(ProviderRegistry.getCodingPlanUrl('unknown', 'anthropic')).toBeUndefined();
    });
  });

  describe('getSwitchableBaseUrl', () => {
    test('returns undefined for all providers (none registered)', () => {
      expect(ProviderRegistry.getSwitchableBaseUrl(ProviderName.OpenAI, 'openai')).toBeUndefined();
      expect(ProviderRegistry.getSwitchableBaseUrl(ProviderName.DeepSeek, 'anthropic')).toBeUndefined();
      expect(ProviderRegistry.getSwitchableBaseUrl('unknown', 'anthropic')).toBeUndefined();
    });
  });
});
