
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Package, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RequestData {
  id: string;
  title: string;
  description: string;
  quantity: number;
  deadline: string;
  status: 'New' | 'In Progress' | 'Completed' | 'Closed';
  date: string;
  messages: Message[];
}

interface Message {
  id: string;
  sender: 'user' | 'admin';
  text: string;
  timestamp: string;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [messageText, setMessageText] = useState('');
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);
  
  // Mock data - in a real app, this would come from an API
  const [requests, setRequests] = useState<RequestData[]>([
    {
      id: '1',
      title: 'Custom Steel Shaft for Industrial Mixer',
      description: 'Need a custom steel shaft for our industrial mixer. Requires specific dimensions and heat treatment.',
      quantity: 5,
      deadline: '2023-08-15',
      status: 'In Progress',
      date: '2023-06-20',
      messages: [
        { id: 'm1', sender: 'user', text: 'When can I expect a quote for this order?', timestamp: '2023-06-21 10:30' },
        { id: 'm2', sender: 'admin', text: 'We\'re working on your quote and will have it ready by tomorrow. Would you have any specific surface treatment requirements?', timestamp: '2023-06-21 11:45' },
        { id: 'm3', sender: 'user', text: 'Great, thank you! Yes, we need a black oxide finish for corrosion resistance.', timestamp: '2023-06-21 13:20' },
      ],
    },
    {
      id: '2',
      title: 'Thread Rolling for Bolts',
      description: 'Looking for precision thread rolling services for a batch of M12 bolts. Need consistent thread quality.',
      quantity: 1000,
      deadline: '2023-07-30',
      status: 'New',
      date: '2023-06-25',
      messages: [],
    },
    {
      id: '3',
      title: 'CNC Machined Coupling',
      description: 'Custom machined coupling with specific tolerances for a high-speed application.',
      quantity: 20,
      deadline: '2023-09-10',
      status: 'Completed',
      date: '2023-05-15',
      messages: [
        { id: 'm4', sender: 'admin', text: 'Your order has been completed and is ready for shipping. Please confirm the shipping address.', timestamp: '2023-06-10 09:15' },
        { id: 'm5', sender: 'user', text: 'Perfect! Please ship to our main warehouse: 123 Industrial Blvd, Mumbai.', timestamp: '2023-06-10 14:30' },
      ],
    },
  ]);

  const toggleRequestExpansion = (requestId: string) => {
    if (expandedRequest === requestId) {
      setExpandedRequest(null);
    } else {
      setExpandedRequest(requestId);
    }
  };

  const handleSendMessage = (requestId: string) => {
    if (!messageText.trim()) return;
    
    // In a real app, this would send the message to the server
    const newMessage: Message = {
      id: `m${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleString(),
    };
    
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, messages: [...request.messages, newMessage] } 
        : request
    ));
    
    setMessageText('');
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
  };

  const getStatusColor = (status: RequestData['status']) => {
    switch (status) {
      case 'New': return 'bg-blue-500';
      case 'In Progress': return 'bg-yellow-500';
      case 'Completed': return 'bg-green-500';
      case 'Closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredRequests = (status: RequestData['status'] | 'All') => {
    if (status === 'All') return requests;
    return requests.filter(request => request.status === status);
  };

  return (
    <div className="min-h-screen bg-sekkot-dark text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Customer Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage your requests and communicate with our team</p>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Requests</h2>
            <Button className="bg-sekkot-purple hover:bg-sekkot-purple-dark">
              <a href="/request-form">New Request</a>
            </Button>
          </div>
          
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="New">New</TabsTrigger>
              <TabsTrigger value="In Progress">In Progress</TabsTrigger>
              <TabsTrigger value="Completed">Completed</TabsTrigger>
              <TabsTrigger value="Closed">Closed</TabsTrigger>
            </TabsList>
            
            {(['All', 'New', 'In Progress', 'Completed', 'Closed'] as const).map(tabValue => (
              <TabsContent key={tabValue} value={tabValue} className="mt-0">
                {filteredRequests(tabValue).length === 0 ? (
                  <div className="glass-card p-8 text-center">
                    <p className="text-gray-400">No requests found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredRequests(tabValue).map(request => (
                      <div key={request.id} className="glass-card overflow-hidden">
                        <div 
                          className="p-6 cursor-pointer"
                          onClick={() => toggleRequestExpansion(request.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold mb-1">{request.title}</h3>
                              <p className="text-sm text-gray-400">Submitted on {request.date}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge className={`${getStatusColor(request.status)} text-white`}>{request.status}</Badge>
                              {expandedRequest === request.id ? <ChevronUp /> : <ChevronDown />}
                            </div>
                          </div>
                        </div>
                        
                        {expandedRequest === request.id && (
                          <div className="border-t border-sekkot-gray/20 p-6 animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                              <div className="flex items-center">
                                <Package className="h-5 w-5 text-sekkot-purple mr-2" />
                                <div>
                                  <p className="text-xs text-gray-400">Quantity</p>
                                  <p className="text-sm">{request.quantity}</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-sekkot-purple mr-2" />
                                <div>
                                  <p className="text-xs text-gray-400">Required By</p>
                                  <p className="text-sm">{request.deadline}</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-sekkot-purple mr-2" />
                                <div>
                                  <p className="text-xs text-gray-400">Request ID</p>
                                  <p className="text-sm">#{request.id}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <h4 className="text-sm font-medium text-gray-300 mb-2">Description</h4>
                              <p className="text-sm text-gray-400">{request.description}</p>
                            </div>
                            
                            <div className="mb-6">
                              <h4 className="flex items-center text-sm font-medium text-gray-300 mb-4">
                                <MessageSquare className="h-4 w-4 mr-2" /> Messages
                              </h4>
                              
                              <div className="space-y-4 max-h-80 overflow-y-auto p-2">
                                {request.messages.length === 0 ? (
                                  <p className="text-sm text-gray-500 text-center py-4">No messages yet</p>
                                ) : (
                                  request.messages.map(message => (
                                    <div 
                                      key={message.id}
                                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                      <div 
                                        className={`max-w-xs md:max-w-sm rounded-lg p-4 ${
                                          message.sender === 'user' 
                                            ? 'bg-sekkot-purple/20 text-white rounded-tr-none' 
                                            : 'bg-sekkot-dark text-white rounded-tl-none'
                                        }`}
                                      >
                                        <p className="text-sm">{message.text}</p>
                                        <p className="text-xs text-gray-400 mt-1 text-right">{message.timestamp}</p>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Textarea
                                placeholder="Type your message here..."
                                className="bg-sekkot-dark border-sekkot-gray/30 focus:border-sekkot-purple"
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                              />
                              <Button 
                                className="bg-sekkot-purple hover:bg-sekkot-purple-dark shrink-0"
                                onClick={() => handleSendMessage(request.id)}
                              >
                                Send
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
