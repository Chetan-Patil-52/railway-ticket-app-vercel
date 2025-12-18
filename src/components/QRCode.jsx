/**
 * Real QR Code component using a public QR image service.
 * Renders a scannable QR that encodes the given value.
 * No external npm dependency required.
 */
export default function QRCode({ value, size = 240, alt = 'QR code' }) {
  if (!value) return null;
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    value
  )}`;
  return (
    <img
      src={url}
      width={size}
      height={size}
      alt={alt}
      style={{
        display: 'block',
        background: '#ffffff',
        padding: 12,
        borderRadius: 16,
        boxShadow: '0 16px 40px rgba(30, 58, 138, 0.25)',
      }}
    />
  );
}

