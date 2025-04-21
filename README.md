# Dynamic Form Application

A powerful and flexible form management system built with React that allows users to create, manage, and submit dynamic forms with SDMX data integration.

## Features

### Form Management
- Create and manage dynamic forms
- Form builder interface with drag-and-drop functionality
- Support for various form components and field types
- Form validation and error handling

### Data Entry
- User-friendly form filling interface
- Progress tracking for form completion
- Draft saving functionality
- Data validation before submission

### Data Management
- View and manage form submissions
- Edit existing submissions
- Draft system for saving incomplete forms
- Export data to PDF format

### SDMX Integration
- View form data in SDMX format
- Interactive JSON viewer with collapse/expand functionality
- Syntax highlighting for better readability
- Minimap for easy navigation in large datasets

## Technology Stack

- **Frontend Framework**: React 18
- **UI Components**: Bootstrap 5
- **Form Builder**: Form.io
- **Code Editor**: Monaco Editor
- **Styling**: CSS3 with Bootstrap classes

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tungns84/Dynamic-Form.git
cd Dynamic-Form
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### Creating a Form
1. Navigate to "Tạo Form" section
2. Use the form builder interface to add and configure fields
3. Save the form with a name and description

### Entering Data
1. Select a form from the dropdown menu
2. Fill in the required fields
3. Save as draft or submit the completed form

### Viewing Submissions
1. Navigate to the "Submissions" tab
2. View list of all submissions
3. Click on actions to:
   - View details
   - Edit submission
   - View SDMX data
   - Export to PDF

### Managing Drafts
1. Access saved drafts in the "Drafts" tab
2. Continue editing or delete drafts
3. Convert drafts to final submissions

## Project Structure

```
src/
├── components/
│   ├── FormBuilder/       # Form creation components
│   ├── FormSelector/      # Form selection and management
│   └── common/           # Shared components
├── utils/                # Utility functions
├── types/                # TypeScript type definitions
├── hooks/               # Custom React hooks
└── App.tsx              # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the Apache License - see the LICENSE file for details.

## Contact

Your Name - tungns250284@gmail.com

Project Link: [https://github.com/tungns84/Dynamic-Form](https://github.com/tungns84/Dynamic-Form)
