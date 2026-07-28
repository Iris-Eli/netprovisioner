# Iris P&C Provisioner

Point-and-click network provisioning portal. A single-file web UI (GitHub Pages)
over a SharePoint backend, with deploys handled server-side via CloudVision (CVaaS).
First module: **Arista VPWS**. Built to grow tabs (VLAN, VRF/L3VPN, …) into one portal.

> **Public repo = UI only.** No secrets, no tenant/site IDs, no device or customer
> data live here. Runtime settings load from `config.js` (git-ignored); network data
> lives in SharePoint. Open the app with no `config.js` and it runs in **demo mode**
> with fake sample data.

## What it does
- **Circuit-centric, point-and-click:** add/edit a VPWS circuit once (both endpoints),
  with cascading **device → interface** pickers (interfaces shown by description).
- **Guardrails at entry:** required fields, and a **duplicate alarm** if a
  device+interface+sub-interface is already used by another circuit.
- **Status at a glance:** deploy state per circuit (Pending / Deployed / Failed).

## Architecture (high level)
```
Browser (this app)  --Graph/user auth-->  SharePoint (Devices, Interfaces, Circuits)
                                                  |
                                     server-side connector (private)
                                                  |
                                          CloudVision Studios
                                        (compile + change control)
```
- The **browser only talks to SharePoint** (delegated Graph, signed-in user).
- **CVaaS is never called from the browser.** A separate, private server-side
  connector reads SharePoint and drives CVaaS (workspace → build → change control),
  and syncs live device/interface inventory back into SharePoint.

## Run locally / demo
Just open `index.html` — it starts in demo mode (sample data, nothing persisted).

## Go live
1. Register an Entra app for delegated Microsoft Graph (SharePoint) access.
2. Copy `config.example.js` → `config.js` and fill in your IDs + site + list names.
3. Wire the `Data` layer functions in `index.html` (marked `TODO`) to SharePoint
   via Graph, following the standard Iris single-file-app auth pattern.
4. Stand up the SharePoint lists and the server-side connector (private repo).

## Theming
Colors are CSS variables at the top of `index.html` (`--brand`, `--accent`, …).
Swap them for the standard Iris palette.

## Repos
- **This (public):** the UI only.
- **Private:** studio code, the SharePoint→CVaaS connector, transforms, data models,
  and operational docs/runbook.
