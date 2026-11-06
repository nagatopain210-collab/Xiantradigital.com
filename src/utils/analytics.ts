export type ConversionEventType =
  | 'whatsapp_click'
  | 'quote_request'
  | 'form_submit'
  | 'service_click'
  | 'demo_open';

export interface ConversionEventPayload {
  event: ConversionEventType;
  label: string;
  section?: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  viewportWidth: number;
  timestamp: string;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    __xiantraConversions?: ConversionEventPayload[];
  }
}

export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

export function trackConversionEvent(
  event: ConversionEventType,
  labelOrMeta: string | Record<string, unknown>,
  section?: string
): void {
  if (typeof window === 'undefined') return;

  const label =
    typeof labelOrMeta === 'string'
      ? labelOrMeta
      : String(labelOrMeta.service || labelOrMeta.source || labelOrMeta.label || event);

  const resolvedSection =
    section ||
    (typeof labelOrMeta === 'object' && labelOrMeta !== null && typeof labelOrMeta.source === 'string'
      ? labelOrMeta.source
      : undefined);

  const payload: ConversionEventPayload = {
    event,
    label,
    section: resolvedSection,
    deviceType: getDeviceType(),
    viewportWidth: window.innerWidth,
    timestamp: new Date().toISOString(),
  };

  // Push to standard GTM / GA4 dataLayer if configured
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: `xiantra_${event}`,
      event_label: label,
      event_section: resolvedSection || 'general',
      device_type: payload.deviceType,
      viewport_width: payload.viewportWidth,
      ...(typeof labelOrMeta === 'object' && labelOrMeta !== null ? labelOrMeta : {}),
    });
  }

  // Record in session conversion store for diagnostics & verification
  if (!window.__xiantraConversions) {
    window.__xiantraConversions = [];
  }
  window.__xiantraConversions.push(payload);
}

