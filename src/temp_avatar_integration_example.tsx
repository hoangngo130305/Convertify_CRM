// Example of how to integrate avatar into the table row
// This needs to be applied to both CustomerTable.tsx and LeadTableInlineEdit.tsx

// In the tbody section, replace:
{customer.name}

// With:
<div className="flex items-center gap-2">
  <CustomerAvatar name={customer.name} size="md" />
  <span>{customer.name}</span>
</div>

// This creates a horizontal layout with the avatar on the left and name on the right