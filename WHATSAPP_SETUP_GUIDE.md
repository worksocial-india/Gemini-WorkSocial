# WhatsApp Business API Setup Checklist

## 📋 Prerequisites
- [ ] Facebook Business Manager account
- [ ] Verified business profile
- [ ] Business phone number (not personal)
- [ ] Business website (worksocial.in)
- [ ] Business documentation (if required)

## 🚀 Setup Steps

### 1. Facebook Business Manager
- [ ] Go to https://business.facebook.com/
- [ ] Create/login to Business Manager
- [ ] Verify your business
- [ ] Add your business phone number

### 2. WhatsApp Business API Access
- [ ] Go to https://developers.facebook.com/
- [ ] Create new app (Business type)
- [ ] Add WhatsApp product
- [ ] Complete business verification
- [ ] Wait for approval (can take 1-7 days)

### 3. Get API Credentials
Once approved, you'll get:
- [ ] Access Token
- [ ] Phone Number ID  
- [ ] App ID
- [ ] Webhook Verify Token

### 4. Configure Your App
- [ ] Copy credentials to `.env` file
- [ ] Update VITE_WHATSAPP_ACCESS_TOKEN
- [ ] Update VITE_WHATSAPP_PHONE_NUMBER_ID
- [ ] Set VITE_WHATSAPP_API_MODE=true
- [ ] Test the integration

## 🔗 Important Links
- WhatsApp Business API Docs: https://developers.facebook.com/docs/whatsapp/
- Facebook Business Manager: https://business.facebook.com/
- Meta for Developers: https://developers.facebook.com/
- WhatsApp Business API Pricing: https://developers.facebook.com/docs/whatsapp/pricing/

## 💰 Pricing Overview
- First 1,000 conversations per month: FREE
- After that: ~$0.005-0.009 per conversation (varies by country)
- Very affordable for most businesses

## ⚡ Current Status
✅ Basic WhatsApp integration working (wa.me links)
✅ API integration set up and activated
✅ Enhanced widget fully implemented and working

## 🆘 Need Help?
If you need assistance with the setup process:
1. Check Facebook Business Support
2. Review WhatsApp Business API documentation
3. Contact Meta Business Support

## 📱 Alternative Options
If API approval takes time, you can also consider:
- WhatsApp Business App (for smaller scale)
- Third-party WhatsApp API providers
- Continue with current direct link method (already working!)