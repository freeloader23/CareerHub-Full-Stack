import React from 'react';
import { Badge } from './ui/badge';

const statusFlow = ['Applied', 'Shortlisted', 'Technical Interview', 'HR Interview', 'Selected', 'Rejected'];

const statusIconMap = {
  'Applied': '✓',
  'Shortlisted': '✓',
  'Technical Interview': '●',
  'HR Interview': '●',
  'Selected': '✓',
  'Rejected': '×'
};

const ApplicationTimeline = ({ application }) => {
  const history = application?.statusHistory || [];
  const currentStatus = application?.status;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-lg">Application Tracking</h3>
        <Badge className="rounded-full px-3 py-1" variant="outline">
          {currentStatus || 'Applied'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        {statusFlow.map((status, index) => {
          const matchingHistory = history.find((item) => item.status === status);
          const isPast = statusFlow.indexOf(currentStatus) > index || status === currentStatus || matchingHistory;
          const isActive = status === currentStatus;
          const isRejected = currentStatus === 'Rejected' && status === 'Rejected';

          return (
            <div key={status} className="rounded-xl border bg-slate-50 p-3 min-h-[96px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{status}</span>
                <span className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive ? 'bg-slate-900 text-white' :
                    isPast || isRejected ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>{statusIconMap[status] || '○'}</span>
              </div>
              <div className="mt-4 text-xs text-slate-500">
                {matchingHistory?.changedAt ? new Date(matchingHistory.changedAt).toLocaleDateString() : (isActive ? 'In progress' : 'Awaiting')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationTimeline;
