// WhatsApp Business API Integration
// You'll need to register with Meta for WhatsApp Business API

import axios from 'axios';

class WhatsAppBusinessAPI {
  constructor() {
    this.accessToken = import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN;
    this.phoneNumberId = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID;
    this.baseURL = 'https://graph.facebook.com/v18.0';
  }

  // Send a text message
  async sendTextMessage(to, message) {
    try {
      const response = await axios.post(
        `${this.baseURL}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: to,
          type: 'text',
          text: {
            body: message
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }

  // Send a template message
  async sendTemplateMessage(to, templateName, languageCode = 'en_US', parameters = []) {
    try {
      const response = await axios.post(
        `${this.baseURL}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: to,
          type: 'template',
          template: {
            name: templateName,
            language: {
              code: languageCode
            },
            components: parameters.length > 0 ? [
              {
                type: 'body',
                parameters: parameters.map(param => ({
                  type: 'text',
                  text: param
                }))
              }
            ] : []
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending WhatsApp template:', error);
      throw error;
    }
  }

  // Send message with calculator results
  async sendCalculatorResults(to, calculatorType, results) {
    const message = this.formatCalculatorMessage(calculatorType, results);
    return await this.sendTextMessage(to, message);
  }

  // Format calculator results for WhatsApp
  formatCalculatorMessage(calculatorType, results) {
    switch (calculatorType) {
      case 'emi':
        return `🏦 *EMI Calculator Results*\n\n` +
               `💰 Loan Amount: ₹${results.loanAmount?.toLocaleString('en-IN')}\n` +
               `📊 Interest Rate: ${results.interestRate}%\n` +
               `⏰ Tenure: ${results.tenure} years\n` +
               `💳 Monthly EMI: ₹${results.monthlyEMI?.toLocaleString('en-IN')}\n` +
               `💸 Total Interest: ₹${results.totalInterest?.toLocaleString('en-IN')}\n` +
               `💯 Total Amount: ₹${results.totalAmount?.toLocaleString('en-IN')}\n\n` +
               `📱 Calculated via WorkSocial Calculator`;
               
      case 'sip':
        return `📈 *SIP Calculator Results*\n\n` +
               `💰 Monthly Investment: ₹${results.monthlyInvestment?.toLocaleString('en-IN')}\n` +
               `📊 Expected Return: ${results.expectedReturn}%\n` +
               `⏰ Investment Period: ${results.years} years\n` +
               `💰 Total Invested: ₹${results.totalInvested?.toLocaleString('en-IN')}\n` +
               `🎯 Expected Amount: ₹${results.futureValue?.toLocaleString('en-IN')}\n` +
               `💹 Wealth Gained: ₹${results.wealthGained?.toLocaleString('en-IN')}\n\n` +
               `📱 Calculated via WorkSocial Calculator`;
               
      default:
        return `📊 *Calculator Results*\n\nYour calculation has been completed successfully!\n\n📱 Powered by WorkSocial`;
    }
  }

  // Webhook to receive messages
  async handleWebhook(req, res) {
    try {
      const { entry } = req.body;
      
      if (entry && entry[0].changes) {
        const changes = entry[0].changes[0];
        
        if (changes.field === 'messages') {
          const { messages, contacts } = changes.value;
          
          if (messages && messages[0]) {
            const message = messages[0];
            const contact = contacts[0];
            
            // Handle incoming message
            await this.handleIncomingMessage(message, contact);
          }
        }
      }
      
      res.status(200).send('OK');
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).send('Error');
    }
  }

  // Handle incoming messages
  async handleIncomingMessage(message, contact) {
    const phoneNumber = contact.wa_id;
    const messageText = message.text?.body?.toLowerCase();

    // Auto-reply based on message content
    if (messageText?.includes('calculator') || messageText?.includes('emi')) {
      await this.sendTextMessage(
        phoneNumber,
        '🧮 Hi! I see you\'re interested in our calculators. Visit our website to use:\n\n' +
        '💳 EMI Calculator\n' +
        '📈 SIP Calculator\n' +
        '🏠 Home Loan Calculator\n' +
        '🚗 Car Loan Calculator\n\n' +
        '🌐 https://www.worksocial.in/calculators'
      );
    } else if (messageText?.includes('hello') || messageText?.includes('hi')) {
      await this.sendTextMessage(
        phoneNumber,
        '👋 Hello! Welcome to WorkSocial!\n\n' +
        'How can I help you today?\n' +
        '• Financial Planning\n' +
        '• Loan Calculators\n' +
        '• Investment Advice\n' +
        '• Insurance Services\n\n' +
        'Just let me know what you need! 😊'
      );
    } else {
      await this.sendTextMessage(
        phoneNumber,
        '🙏 Thank you for your message! Our team will get back to you shortly.\n\n' +
        'In the meantime, feel free to explore our calculators and services on our website.\n\n' +
        '🌐 www.worksocial.in'
      );
    }
  }
}

export default WhatsAppBusinessAPI;