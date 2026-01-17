import { CRMDashboard } from './CRMDashboard';
import { useState } from 'react';

export function CRMPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [reminders, setReminders] = useState<any[]>([]);

  return (
    <CRMDashboard
      onOpenPopup={() => {}}
      onOpenRestoreData={() => {}}
      onOpenDuplicateData={() => {}}
      onOpenPermissions={() => {}}
      onOpenAutomation={() => {}}
      onOpenCustomerDetails={() => {}}
      onOpenReminder={() => {}}
      onOpenAccountSettings={() => {}}
      onOpenBilling={() => {}}
      onOpenInviteTeam={() => {}}
      onLogout={() => {}}
      onCreateCustomer={(customer) => {
        setCustomers([...customers, customer]);
      }}
      onCustomerUpdate={(id, updates) => {
        setCustomers(customers.map(c => c.id === id ? { ...c, ...updates } : c));
      }}
      onDeleteCustomer={(id) => {
        setCustomers(customers.filter(c => c.id !== id));
      }}
      customers={customers}
      reminders={reminders}
    />
  );
}
