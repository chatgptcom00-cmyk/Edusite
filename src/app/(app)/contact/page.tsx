
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageCircle, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supportChat } from '@/ai/flows/support-flow';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

export default function ContactPage() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await supportChat({ message: input });
      const botMessage: Message = { sender: 'bot', text: result.reply };
      setMessages(prev => [...prev, botMessage]);

      if (result.businessInquiryDetected) {
        toast({
          title: 'Business Inquiry Forwarded',
          description:
            'Our team has been notified and will get back to you shortly.',
        });
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        sender: 'bot',
        text: "I'm sorry, but I'm having trouble connecting right now. Please try again later.",
      };
      setMessages(prev => [...prev, errorMessage]);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not connect to the support chatbot.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          We're here to help! Choose one of the options below to reach us.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Chatbot Section */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="font-headline text-2xl">
                  AI Support Chat
                </CardTitle>
                <CardDescription>
                  Ask our chatbot for instant help.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <div className="flex-1 rounded-lg border bg-muted/50 p-4 h-80 overflow-y-auto flex flex-col gap-4">
              {messages.length === 0 ? (
                 <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
                    <p>Ask a question to get started, e.g., "What courses do you offer?"</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-2 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs rounded-lg px-4 py-2 md:max-w-md ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))
              )}
               {isLoading && (
                <div className="flex justify-start gap-2">
                  <div className="rounded-lg bg-background px-4 py-2">
                     <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} disabled={isLoading}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Email Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Mail className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="font-headline text-2xl">
                  Email Us
                </CardTitle>
                <CardDescription>
                  For direct inquiries, reach out to our team.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                You can send us an email directly at the address below. We'll
                do our best to get back to you within 24 hours.
              </p>
              <a
                href="mailto:pixopnhelp@gmail.com"
                className="inline-block font-medium text-primary hover:underline"
              >
                pixopnhelp@gmail.com
              </a>
            </div>
             <Button asChild className="w-full font-semibold" size="lg">
              <a href="mailto:pixopnhelp@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Send an Email
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
