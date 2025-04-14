
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Package, MessageSquare, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface RequestData {
  id: string;
  title: string;
  description: string;
  quantity: number;
  deadline: string | null;
  status: string;
  created_at: string;
  document_url: string | null;
  admin_response: string | null;
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
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messageText, setMessageText] = useState('');
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Transform the data to match our RequestData interface
      const transformedData = data.map((request) => ({
        ...request,
        messages: [], // We'll add message support in a future implementation
      }));
      
      setRequests(transformedData);
    } catch (error: any) {
      toast({
        title: "Error fetching requests",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleRequestExpansion = (requestId: string) => {
    if (expandedRequest === requestId) {
      setExpandedRequest(null);
    } else {
      setExpandedRequest(requestId);
    }
  };

  const handleSendMessage = async (requestId: string) => {
    if (!messageText.trim()) return;
    
    try {
      // In a real application, we would send this message to Supabase
      // For now, we'll just add it to the UI
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
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'responded': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending': return 'New';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'responded': return 'Responded';
      default: return 'Unknown';
    }
  };

  const filteredRequests = (status: string | 'All') => {
    if (status === 'All') return requests;
    return requests.filter(request => {
      if (status === 'New') return request.status === 'pending';
      if (status === 'In Progress') return request.status === 'in_progress';
      if (status === 'Completed') return request.status === 'completed';
      if (status === 'Responded') return request.status === 'responded';
      return false;
    });
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
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
          
          {loading ? (
            <div className="glass-card p-12 flex justify-center">
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin text-sekkot-purple mb-2" />
                <p className="text-gray-400">Loading your requests...</p>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="All" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="New">New</TabsTrigger>
                <TabsTrigger value="In Progress">In Progress</TabsTrigger>
                <TabsTrigger value="Completed">Completed</TabsTrigger>
                <TabsTrigger value="Responded">Responded</TabsTrigger>
              </TabsList>
              
              {(['All', 'New', 'In Progress', 'Completed', 'Responded'] as const).map(tabValue => (
                <TabsContent key={tabValue} value={tabValue} className="mt-0">
                  {filteredRequests(tabValue).length === 0 ? (
                    <div className="glass-card p-8 text-center">
                      <p className="text-gray-400">No requests found</p>
                      {tabValue === 'All' && (
                        <Button 
                          className="mt-4 bg-sekkot-purple hover:bg-sekkot-purple-dark"
                          onClick={() => navigate('/request-form')}
                        >
                          Create Your First Request
                        </Button>
                      )}
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
                                <p className="text-sm text-gray-400">
                                  Submitted on {new Date(request.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Badge className={`${getStatusColor(request.status)} text-white`}>
                                  {getStatusDisplay(request.status)}
                                </Badge>
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
                                {request.deadline && (
                                  <div className="flex items-center">
                                    <Calendar className="h-5 w-5 text-sekkot-purple mr-2" />
                                    <div>
                                      <p className="text-xs text-gray-400">Required By</p>
                                      <p className="text-sm">{new Date(request.deadline).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                )}
                                <div className="flex items-center">
                                  <FileText className="h-5 w-5 text-sekkot-purple mr-2" />
                                  <div>
                                    <p className="text-xs text-gray-400">Request ID</p>
                                    <p className="text-sm">#{request.id.substring(0, 8)}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-300 mb-2">Description</h4>
                                <p className="text-sm text-gray-400">{request.description}</p>
                              </div>
                              
                              {request.document_url && (
                                <div className="mb-6">
                                  <h4 className="text-sm font-medium text-gray-300 mb-2">Attached Document</h4>
                                  <a 
                                    href={request.document_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sekkot-purple hover:underline flex items-center"
                                  >
                                    <FileText className="h-4 w-4 mr-2" />
                                    View Document
                                  </a>
                                </div>
                              )}
                              
                              {request.admin_response && (
                                <div className="mb-6">
                                  <h4 className="text-sm font-medium text-gray-300 mb-2">Response from Sekkot</h4>
                                  <div className="bg-sekkot-dark p-4 rounded-lg text-white">
                                    {request.admin_response}
                                  </div>
                                </div>
                              )}
                              
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
                                              : 'bg-black text-white rounded-tl-none'
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
                                  className="bg-black border-sekkot-gray/30 focus:border-sekkot-purple"
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
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
