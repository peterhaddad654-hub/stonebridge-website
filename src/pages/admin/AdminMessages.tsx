import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Eye, Trash2, X, MailOpen } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminMessages() {
  const { messages, readMessage, readAllMessages, removeMessage } = useData();
  const [viewMsg, setViewMsg] = useState<typeof messages[0] | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleView = (msg: typeof messages[0]) => {
    setViewMsg(msg);
    if (msg.status === 'new') readMessage(msg.id);
  };

  const handleDelete = () => {
    if (deleteId) {
      removeMessage(deleteId);
      toast.success('Message deleted');
      setDeleteId(null);
    }
  };

  const handleMarkAllRead = () => {
    readAllMessages();
    toast.success('All messages marked as read');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[#1C1C1E] text-lg font-medium uppercase tracking-[0.06em]">Messages</h2>
        <button
          onClick={handleMarkAllRead}
          className="font-body text-[13px] border border-[#1C1C1E] text-[#1C1C1E] px-4 py-2 hover:bg-[#1C1C1E] hover:text-white transition-colors flex items-center gap-2"
        >
          <MailOpen className="w-4 h-4" />
          Mark All as Read
        </button>
      </div>

      <div className="bg-white border border-[#E5E5EA] overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-[#FAFAFA]">
              <th className="text-left font-body text-xs font-medium uppercase text-[#8E8E93] tracking-[0.05em] px-5 py-3.5">Status</th>
              <th className="text-left font-body text-xs font-medium uppercase text-[#8E8E93] tracking-[0.05em] px-5 py-3.5">Name</th>
              <th className="text-left font-body text-xs font-medium uppercase text-[#8E8E93] tracking-[0.05em] px-5 py-3.5">Email</th>
              <th className="text-left font-body text-xs font-medium uppercase text-[#8E8E93] tracking-[0.05em] px-5 py-3.5">Subject</th>
              <th className="text-left font-body text-xs font-medium uppercase text-[#8E8E93] tracking-[0.05em] px-5 py-3.5">Message</th>
              <th className="text-left font-body text-xs font-medium uppercase text-[#8E8E93] tracking-[0.05em] px-5 py-3.5">Date</th>
              <th className="text-right font-body text-xs font-medium uppercase text-[#8E8E93] tracking-[0.05em] px-5 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5EA]">
            {messages.map((msg) => (
              <tr key={msg.id} className={`hover:bg-[#FAFAFA] transition-colors ${msg.status === 'new' ? 'bg-white' : ''}`}>
                <td className="px-5 py-4">
                  <span className={`w-2 h-2 rounded-full inline-block ${msg.status === 'new' ? 'bg-[#FF3B30]' : 'bg-transparent border border-[#8E8E93]'}`} />
                </td>
                <td className={`px-5 py-4 font-body text-sm ${msg.status === 'new' ? 'font-medium text-[#1C1C1E]' : 'text-[#1C1C1E]'}`}>
                  {msg.name}
                </td>
                <td className="px-5 py-4 font-body text-[13px] text-[#8E8E93]">{msg.email}</td>
                <td className="px-5 py-4 font-body text-sm text-[#1C1C1E]">{msg.subject}</td>
                <td className="px-5 py-4 font-body text-[13px] text-[#8E8E93] max-w-[200px] truncate">{msg.message}</td>
                <td className="px-5 py-4 font-body text-xs text-[#8E8E93] whitespace-nowrap">
                  {new Date(msg.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleView(msg)} className="p-1.5 text-[#8E8E93] hover:text-[#1C1C1E] transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteId(msg.id)} className="p-1.5 text-[#8E8E93] hover:text-[#FF3B30] transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {messages.length === 0 && (
          <div className="text-center py-12">
            <MailOpen className="w-12 h-12 text-[#E5E5EA] mx-auto" />
            <p className="font-display text-lg text-[#8E8E93] mt-4">No messages yet</p>
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewMsg && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[560px] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-[#E5E5EA]">
              <h3 className="font-display text-lg font-medium text-[#1C1C1E] truncate pr-4">{viewMsg.subject}</h3>
              <button onClick={() => setViewMsg(null)} className="text-[#8E8E93] hover:text-[#1C1C1E] flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-[#FAFAFA] p-4 space-y-2">
                <div className="flex gap-2"><span className="font-body text-xs text-[#8E8E93] w-20">Name:</span><span className="font-body text-sm text-[#1C1C1E]">{viewMsg.name}</span></div>
                <div className="flex gap-2"><span className="font-body text-xs text-[#8E8E93] w-20">Email:</span><span className="font-body text-sm text-[#1C1C1E]">{viewMsg.email}</span></div>
                {viewMsg.phone && <div className="flex gap-2"><span className="font-body text-xs text-[#8E8E93] w-20">Phone:</span><span className="font-body text-sm text-[#1C1C1E]">{viewMsg.phone}</span></div>}
                {viewMsg.company && <div className="flex gap-2"><span className="font-body text-xs text-[#8E8E93] w-20">Company:</span><span className="font-body text-sm text-[#1C1C1E]">{viewMsg.company}</span></div>}
              </div>
              <div className="py-6">
                <p className="font-body text-sm text-[#1C1C1E] leading-[1.7] whitespace-pre-wrap">{viewMsg.message}</p>
              </div>
              <p className="font-body text-xs text-[#8E8E93]">
                Received on {new Date(viewMsg.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="p-5 border-t border-[#E5E5EA] flex gap-3">
              <a
                href={`mailto:${viewMsg.email}?subject=Re: ${viewMsg.subject}`}
                className="font-body text-[13px] bg-[#D4AF37] text-[#1C1C1E] px-6 py-2.5 hover:bg-[#E8C547] transition-colors"
              >
                Reply via Email
              </a>
              <button onClick={() => setViewMsg(null)} className="font-body text-[13px] border border-[#E5E5EA] text-[#1C1C1E] px-6 py-2.5 hover:border-[#1C1C1E]">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[400px] p-8 text-center">
            <Trash2 className="w-8 h-8 text-[#FF9F0A] mx-auto" />
            <h3 className="font-display text-lg font-medium text-[#1C1C1E] mt-4">Delete Message?</h3>
            <p className="font-body text-sm text-[#8E8E93] mt-2">This action cannot be undone.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteId(null)} className="flex-1 font-body text-[13px] border border-[#E5E5EA] text-[#1C1C1E] py-2.5">Cancel</button>
              <button onClick={handleDelete} className="flex-1 font-body text-[13px] bg-[#FF3B30] text-white py-2.5 hover:bg-[#E02E24]">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
