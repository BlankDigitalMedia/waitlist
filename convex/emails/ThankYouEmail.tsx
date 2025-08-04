// Email template disabled to avoid dependency conflicts
// This file is kept as a placeholder for future email functionality

import * as React from "react";

interface ThankYouEmailProps {
  name?: string;
  position?: number;
}

export default function ThankYouEmail({ name, position }: ThankYouEmailProps) {
  // Return a simple placeholder - not used while email functionality is disabled
  return React.createElement('div', null, 'Email template placeholder');
}
