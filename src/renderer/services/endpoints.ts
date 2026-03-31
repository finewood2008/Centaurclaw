/**
 * 集中管理所有业务 API 端点。
 * 后续新增的业务接口也应在此文件中配置。
 */

import { configService } from './config';

const isTestMode = () => {
  return configService.getConfig().app?.testMode === true;
};

// 自动更新
export const getUpdateCheckUrl = () => isTestMode()
  ? 'https://centaurai-api.example.com/update/test'
  : 'https://centaurai-api.example.com/update/prod';

// 手动检查更新
export const getManualUpdateCheckUrl = () => isTestMode()
  ? 'https://centaurai-api.example.com/update-manual/test'
  : 'https://centaurai-api.example.com/update-manual/prod';

export const getFallbackDownloadUrl = () => isTestMode()
  ? 'https://github.com/finewood2008/Centaurclaw/releases'
  : 'https://github.com/finewood2008/Centaurclaw/releases';

// Skill 商店
export const getSkillStoreUrl = () => isTestMode()
  ? 'https://centaurai-api.example.com/skill-store/test'
  : 'https://centaurai-api.example.com/skill-store/prod';

// 登录地址
export const getLoginOvermindUrl = () => isTestMode()
  ? 'https://centaurai-api.example.com/login-url/test'
  : 'https://centaurai-api.example.com/login-url/prod';

// Portal 页面
const PORTAL_BASE_TEST = 'https://centaurai-api.example.com/portal/test#';
const PORTAL_BASE_PROD = 'https://centaurai-api.example.com/portal/prod#';

const getPortalBase = () => isTestMode() ? PORTAL_BASE_TEST : PORTAL_BASE_PROD;

export const getPortalPricingUrl = () => `${getPortalBase()}/pricing`;
export const getPortalProfileUrl = () => `${getPortalBase()}/profile`;
