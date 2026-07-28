/*
  Iris P&C Provisioner — runtime config.
  Copy this file to `config.js` (which is git-ignored) and fill in your values.
  DO NOT commit config.js or any real tenant/site/client IDs to this public repo.

  Load order: index.html reads window.IRIS_CONFIG. If absent, the app runs in DEMO mode.
*/
window.IRIS_CONFIG = {
  // Microsoft Graph / MSAL (delegated, signed-in user) — SharePoint access only.
  graphClientId: "YOUR_ENTRA_APP_CLIENT_ID",
  tenantId:      "YOUR_TENANT_ID",

  // SharePoint backend
  sharePointSiteUrl: "https://YOURTENANT.sharepoint.com/sites/EngineeringPriorities",
  lists: {
    circuits:   "Arista VPWS Builder",
    devices:    "Arista Devices",
    interfaces: "Arista Interfaces"
  }

  // NOTE: No CVaaS credentials here. The browser never talks to CVaaS.
  // Deploys are handled server-side by the connector (separate, private).
};
