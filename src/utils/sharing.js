/**
 * Resume Sharing Utilities
 * Handles public sharing, portfolio links, and sharing analytics
 */

/**
 * Generate shareable link
 */
export const generateShareLink = (shareId, isPublic = false) => {
  const baseUrl = window.location.origin;
  if (isPublic) {
    return `${baseUrl}/share/${shareId}`;
  }
  return `${baseUrl}/resume/${shareId}`;
};

/**
 * Copy link to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

/**
 * Share via social media
 */
export const shareToSocial = (platform, shareId, resumeTitle) => {
  const shareLink = generateShareLink(shareId, true);
  const text = encodeURIComponent(`Check out my resume: ${resumeTitle}`);
  const url = encodeURIComponent(shareLink);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    email: `mailto:?subject=${encodeURIComponent(resumeTitle)}&body=${text}%20${url}`
  };

  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }
};

/**
 * Generate QR code data URL (requires qrcode library)
 */
export const generateQRCode = async (shareLink) => {
  // This would require installing 'qrcode' package
  // For now, return a placeholder
  try {
    // If qrcode is installed:
    // const QRCode = require('qrcode');
    // return await QRCode.toDataURL(shareLink);
    return null;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};

/**
 * Track share analytics
 */
export const trackShare = async (resumeId, shareType, userId) => {
  // This would typically call your backend API
  // For now, we'll use Firestore if available
  try {
    // Example Firestore update
    // await updateDoc(doc(db, 'resumes', resumeId), {
    //   'analytics.shares': increment(1),
    //   'analytics.lastShared': serverTimestamp()
    // });
    console.log('Share tracked:', { resumeId, shareType, userId });
  } catch (error) {
    console.error('Error tracking share:', error);
  }
};

/**
 * Validate share link
 */
export const validateShareLink = (shareId) => {
  // UUID v4 format validation
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(shareId);
};

