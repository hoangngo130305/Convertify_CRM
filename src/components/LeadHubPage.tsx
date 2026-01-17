import { LeadHubDashboard } from './LeadHubDashboard';
import { useState } from 'react';

export function LeadHubPage() {
  const [leads, setLeads] = useState<any[]>([]);

  return (
    <LeadHubDashboard
      onOpenPopup={() => {}}
      onOpenRestoreData={() => {}}
      onOpenDuplicateData={() => {}}
      onOpenPermissions={() => {}}
      onOpenAutomation={() => {}}
      onOpenBadDataManager={() => {}}
      onOpenCustomerDetails={() => {}}
      onOpenReminder={() => {}}
      onOpenAccountSettings={() => {}}
      onOpenBilling={() => {}}
      onOpenInviteTeam={() => {}}
      onLogout={() => {}}
      onCreateCustomer={(lead) => {
        setLeads([...leads, lead]);
      }}
      onCustomerUpdate={(id, field, value) => {
        setLeads(leads.map(l => l.id === id ? { ...l, [field]: value } : l));
      }}
      onDeleteCustomer={(id) => {
        setLeads(leads.filter(l => l.id !== id));
      }}
      onMoveToBadData={() => {}}
      onMoveToCustomer={() => {}}
      customers={leads}
      reminders={[]}
      badDataCount={0}
    />
  );
}
