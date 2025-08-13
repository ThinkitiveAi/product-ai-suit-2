# Healthcare Provider Availability Management Interface

## Overview

A clean, professional healthcare provider availability management interface built with React, TypeScript, and Mantine UI components. The interface features a two-panel layout for managing weekly schedules and slot configuration settings.

## Features

### Left Panel - Day Wise Availability

- **Provider Selection**: Dropdown to select healthcare providers
- **Weekly Schedule Grid**: Seven rows for each day of the week
- **Time Management**: "From" and "Till" time pickers with clock icons
- **Dynamic Rows**: Add/remove availability rows as needed
- **Default Times**: Pre-filled with 9:00 AM to 6:00 PM schedule

### Right Panel - Slot Creation Setting

- **Time Zone Configuration**: Comprehensive timezone selection
- **Block Days Management**: Configure specific blocked dates and times
- **Dynamic Blocking**: Add multiple blocked time periods
- **Date and Time Pickers**: Calendar and clock inputs for precise scheduling

### Interactive Elements

- **Form Validation**: Required field validation with error messages
- **Success/Error Notifications**: Toast notifications for user feedback
- **Loading States**: Visual feedback during form submission
- **Responsive Design**: Mobile-friendly grid layout

## Technical Implementation

### Dependencies

- React 19.1.0
- TypeScript 5.8.3
- Mantine UI 8.2.1
- React Router DOM 7.7.1
- Tabler Icons 3.34.1

### Key Components

- `ProviderAvailabilityForm`: Main form component
- `TimeInput`: Mantine time picker component
- `Select`: Dropdown selection component
- `Grid`: Responsive layout system
- `Paper`: Card-like containers with shadows

### Form Management

- Uses Mantine's `useForm` hook for state management
- Dynamic list management with `insertListItem` and `removeListItem`
- Form validation and error handling
- Async form submission with loading states

## Usage

### Accessing the Interface

1. Navigate to `/provider-availability` in your browser
2. Or click the "Manage Availability" card on the Dashboard

### Setting Up Weekly Availability

1. Select a provider from the dropdown
2. Configure time slots for each day of the week
3. Use the time pickers to set "From" and "Till" times
4. Remove unwanted days using the trash icon

### Managing Blocked Days

1. Select a timezone for your schedule
2. Add specific dates to block
3. Set blocked time ranges for each date
4. Use the "+ Add Block Days" button for additional blocks

### Saving Configuration

1. Review all settings
2. Click "Save" to submit the form
3. Wait for confirmation notification
4. Use "Close" to exit without saving

## File Structure

```
src/
├── components/
│   └── ProviderAvailabilityForm.tsx    # Main form component
├── pages/
│   └── ProviderAvailabilityPage.tsx    # Demo page wrapper
└── App.tsx                             # Routing configuration
```

## Customization

### Theme Integration

The component automatically uses your app's Mantine theme:

- Primary color: Blue (#0ea5e9)
- Border radius: Medium (md)
- Shadows: Medium (md)
- Consistent spacing and typography

### Adding New Providers

Modify the `PROVIDERS` array in `ProviderAvailabilityForm.tsx`:

```typescript
const PROVIDERS = [
  "John Doe",
  "Jane Smith",
  "Dr. Michael Johnson",
  // Add your providers here
];
```

### Timezone Options

Update the `TIME_ZONES` array to include your preferred timezones:

```typescript
const TIME_ZONES = [
  "UTC-08:00 Pacific Time (US & Canada)",
  "UTC-07:00 Mountain Time (US & Canada)",
  // Add your timezones here
];
```

## Accessibility Features

- High contrast color ratios
- Proper form labeling and descriptions
- Keyboard navigation support
- Touch-friendly button sizes
- Clear visual hierarchy

## Browser Support

- Modern browsers with ES6+ support
- Responsive design for mobile and desktop
- Progressive enhancement for older browsers

## Future Enhancements

- Drag and drop for reordering days
- Bulk time slot operations
- Calendar view integration
- Export/import functionality
- Advanced recurrence patterns
- Integration with external calendar systems
