# TrueTone AI - Text Humanization Platform

A modern Flask web application that transforms AI-generated text into natural, human-like writing. Perfect for students, professionals, and content creators who need to make their AI-generated content sound more authentic and pass AI detection tools.

## Features

### Core Functionality
- **Text Humanization**: Advanced AI-powered text transformation
- **Multiple Export Formats**: Download as TXT or DOCX
- **Copy to Clipboard**: One-click copying with visual feedback
- **Word Counter**: Real-time word counting with plan-based limits
- **User Authentication**: Secure login/register system

### Subscription Plans
- **Free Plan**: 100 words per input, 3 essays per day
- **Pro Plan ($4.99/month)**: Unlimited words and essays, citation builder
- **Enterprise ($12.99/month)**: Everything in Pro plus plagiarism checker, API access

### Technical Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional, academic-themed design
- **Smooth Animations**: Fade-in effects, hover animations, card tilts
- **PayPal Integration**: Secure subscription management
- **SQLite Database**: User management and usage tracking

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TrueToneAI
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Access the application**
   Open your browser and go to `http://localhost:5000`

## Configuration

### API Keys
The application uses the following API keys (already configured):

- **ChatAnywhere API**: For text humanization
- **PayPal**: For subscription payments

### Database
The application uses SQLite by default. The database file (`truetone.db`) will be created automatically on first run.

## Usage

### For Users
1. **Register/Login**: Create an account or sign in
2. **Choose Plan**: Start with Free or upgrade to Pro/Enterprise
3. **Humanize Text**: Paste your AI-generated text and click "Humanize"
4. **Export Results**: Copy to clipboard or download as TXT/DOCX

### For Developers
- **Flask**: Web framework
- **SQLAlchemy**: Database ORM
- **Flask-Login**: User authentication
- **Requests**: API communication
- **python-docx**: Document generation

## File Structure

```
TrueToneAI/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── templates/            # HTML templates
│   ├── base.html         # Base template
│   ├── home.html         # Home page
│   ├── login.html        # Login page
│   ├── register.html     # Registration page
│   ├── humanize.html     # Text humanizer
│   └── pricing.html      # Pricing page
├── static/               # Static assets
│   ├── css/
│   │   └── style.css     # Main stylesheet
│   ├── js/
│   │   └── main.js       # JavaScript functionality
│   └── images/           # Image assets
└── truetone.db          # SQLite database (created automatically)
```

## API Endpoints

- `GET /` - Home page
- `GET /login` - Login page
- `POST /login` - Process login
- `GET /register` - Registration page
- `POST /register` - Process registration
- `GET /humanize` - Text humanizer (requires login)
- `GET /pricing` - Pricing page
- `POST /api/humanize` - Humanize text API
- `POST /api/download/<format>` - Download text API
- `POST /api/upgrade-plan` - Upgrade subscription API

## Security Features

- **Password Hashing**: Secure password storage using Werkzeug
- **Session Management**: Flask-Login for user sessions
- **Input Validation**: Form validation and sanitization
- **Rate Limiting**: Built-in usage limits for free users
- **Secure Payments**: PayPal integration for subscriptions

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact [support@truetoneai.com](mailto:support@truetoneai.com)

## Changelog

### Version 1.0.0
- Initial release
- Text humanization functionality
- User authentication system
- Subscription management
- Responsive design
- PayPal integration
