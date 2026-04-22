import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';

export default function AdminSettings() {
  const { settings, editSettings } = useData();
  const [siteForm, setSiteForm] = useState<Record<string, any>>(() => ({
    ...(settings ?? {}),
  }));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwError, setPwError] = useState('');

  const handleSiteSave = () => {
    editSettings({ ...siteForm });
    toast.success('Site settings saved');
  };

  const handlePasswordChange = () => {
    setPwError('');
    if (!newPassword) { setPwError('Enter a new password'); return; }
    if (newPassword.length < 6) { setPwError('Password must be at least 6 characters'); return; }
    if (newPassword !== confirmPassword) { setPwError('Passwords do not match'); return; }
    // In a real app, this would update the stored password hash
    // For this demo, we just show success
    toast.success('Password updated (demo: use admin/stonebridge2026 to login)');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6 max-w-[800px]">
      {/* Account Settings */}
      <div className="bg-white border border-[#E5E5EA] p-6">
        <h3 className="font-display text-sm font-medium uppercase tracking-[0.06em] text-[#1C1C1E] mb-6">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">Current Username</label>
            <input value="admin" disabled className="w-full border border-[#E5E5EA] bg-[#FAFAFA] px-4 py-2.5 font-body text-sm text-[#8E8E93]" />
          </div>
          <div>
            <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
          {pwError && <p className="font-body text-xs text-[#FF3B30]">{pwError}</p>}
          <button
            onClick={handlePasswordChange}
            className="font-body text-[13px] bg-[#D4AF37] text-[#1C1C1E] px-6 py-2.5 hover:bg-[#E8C547] transition-colors"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Site Settings */}
      <div className="bg-white border border-[#E5E5EA] p-6">
        <h3 className="font-display text-sm font-medium uppercase tracking-[0.06em] text-[#1C1C1E] mb-6">Site Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">Company Name</label>
            <input
              value={siteForm.companyName}
              onChange={(e) => setSiteForm((p) => ({ ...p, companyName: e.target.value }))}
              className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">Contact Email</label>
            <input
              value={siteForm.contactEmail}
              onChange={(e) => setSiteForm((p) => ({ ...p, contactEmail: e.target.value }))}
              className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">Contact Phone</label>
            <input
              value={siteForm.contactPhone}
              onChange={(e) => setSiteForm((p) => ({ ...p, contactPhone: e.target.value }))}
              className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">WhatsApp Number</label>
            <input
              value={siteForm.whatsappNumber}
              onChange={(e) => setSiteForm((p) => ({ ...p, whatsappNumber: e.target.value }))}
              className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium uppercase tracking-[0.05em] text-[#8E8E93] mb-2 block">Business Address</label>
            <textarea
              value={siteForm.businessAddress}
              onChange={(e) => setSiteForm((p) => ({ ...p, businessAddress: e.target.value }))}
              rows={3}
              className="w-full border border-[#E5E5EA] px-4 py-2.5 font-body text-sm focus:border-[#D4AF37] focus:outline-none resize-none"
            />
          </div>
          <button
            onClick={handleSiteSave}
            className="font-body text-[13px] bg-[#D4AF37] text-[#1C1C1E] px-6 py-2.5 hover:bg-[#E8C547] transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
