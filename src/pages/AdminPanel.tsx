
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash, Plus, Check, X, Loader2 } from 'lucide-react';

const AdminPanel = () => {
  const { isAdmin, loading: authLoading, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [products, setProducts] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState({
    products: true,
    requests: true,
    categories: true
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category_id: '',
    price: '',
    image: ''
  });
  
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [adminResponse, setAdminResponse] = useState('');

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/dashboard');
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchRequests();
      fetchCategories();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    try {
      setLoading(prev => ({ ...prev, products: true }));
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)');
      
      if (error) throw error;
      
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error fetching products",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, products: false }));
    }
  };

  const fetchRequests = async () => {
    try {
      setLoading(prev => ({ ...prev, requests: true }));
      const { data, error } = await supabase
        .from('requests')
        .select('*, profiles(name, email)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setRequests(data || []);
    } catch (error: any) {
      console.error('Error fetching requests:', error);
      toast({
        title: "Error fetching requests",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, requests: false }));
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(prev => ({ ...prev, categories: true }));
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) throw error;
      
      setCategories(data || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error fetching categories",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, categories: false }));
    }
  };

  const handleCreateProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Product created",
        description: "The product has been created successfully"
      });

      setNewProduct({
        name: '',
        description: '',
        category_id: '',
        price: '',
        image: ''
      });

      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error creating product",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: editingProduct.name,
          description: editingProduct.description,
          category_id: editingProduct.category_id,
          price: editingProduct.price,
          image: editingProduct.image
        })
        .eq('id', editingProduct.id)
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Product updated",
        description: "The product has been updated successfully"
      });

      setEditingProduct(null);
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error updating product",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully"
      });

      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error deleting product",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleRespondToRequest = async () => {
    if (!selectedRequest) return;

    try {
      const { error } = await supabase
        .from('requests')
        .update({
          admin_response: adminResponse,
          status: 'responded'
        })
        .eq('id', selectedRequest.id);
      
      if (error) throw error;
      
      toast({
        title: "Response sent",
        description: "Your response has been sent to the client"
      });

      setSelectedRequest(null);
      setAdminResponse('');
      fetchRequests();
    } catch (error: any) {
      toast({
        title: "Error responding to request",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdateRequestStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('requests')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Status updated",
        description: `Request status has been updated to ${status}`
      });

      fetchRequests();
    } catch (error: any) {
      toast({
        title: "Error updating request",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-blue-500';
      case 'responded': return 'bg-purple-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending': return 'New';
      case 'responded': return 'Responded';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sekkot-purple"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // The useEffect will redirect
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-gray-400 mt-2">Manage products and customer requests</p>
          </div>
          
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="requests">Customer Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-1 block">Product Name</label>
                    <Input 
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="bg-black border-sekkot-gray/30 focus:border-sekkot-purple"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-1 block">Category</label>
                    <select 
                      value={newProduct.category_id}
                      onChange={(e) => setNewProduct({...newProduct, category_id: e.target.value})}
                      className="w-full rounded-md bg-black border-sekkot-gray/30 focus:border-sekkot-purple p-2 text-sm"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-1 block">Price</label>
                    <Input 
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="bg-black border-sekkot-gray/30 focus:border-sekkot-purple"
                      placeholder="e.g. $299 or Contact for pricing"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-1 block">Image URL</label>
                    <Input 
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                      className="bg-black border-sekkot-gray/30 focus:border-sekkot-purple"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-300 mb-1 block">Description</label>
                    <Textarea 
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      className="bg-black border-sekkot-gray/30 focus:border-sekkot-purple"
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button 
                      onClick={handleCreateProduct}
                      className="bg-sekkot-purple hover:bg-sekkot-purple-dark"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </div>
              </div>
              
              {loading.products ? (
                <div className="glass-card p-12 flex justify-center">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-sekkot-purple mb-2" />
                    <p className="text-gray-400">Loading products...</p>
                  </div>
                </div>
              ) : (
                <div className="glass-card">
                  <h2 className="text-xl font-semibold p-6 border-b border-sekkot-gray/20">Product List</h2>
                  {products.length === 0 ? (
                    <div className="p-8 text-center">
                      <p className="text-gray-400">No products found</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="text-left text-gray-400 text-sm">
                          <tr>
                            <th className="p-5">Name</th>
                            <th className="p-5">Category</th>
                            <th className="p-5">Price</th>
                            <th className="p-5">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-sekkot-gray/10">
                          {products.map((product) => (
                            <tr key={product.id} className="hover:bg-sekkot-gray/5">
                              <td className="p-5 whitespace-nowrap">{product.name}</td>
                              <td className="p-5 whitespace-nowrap">{product.categories?.name}</td>
                              <td className="p-5 whitespace-nowrap">{product.price}</td>
                              <td className="p-5 whitespace-nowrap">
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-sekkot-gray/30 text-sekkot-purple hover:bg-sekkot-purple/10"
                                    onClick={() => setEditingProduct(product)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-sekkot-gray/30 text-red-500 hover:bg-red-500/10"
                                    onClick={() => handleDeleteProduct(product.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="requests" className="space-y-6">
              {loading.requests ? (
                <div className="glass-card p-12 flex justify-center">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-sekkot-purple mb-2" />
                    <p className="text-gray-400">Loading requests...</p>
                  </div>
                </div>
              ) : (
                <div className="glass-card">
                  <h2 className="text-xl font-semibold p-6 border-b border-sekkot-gray/20">Customer Requests</h2>
                  {requests.length === 0 ? (
                    <div className="p-8 text-center">
                      <p className="text-gray-400">No customer requests found</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="text-left text-gray-400 text-sm">
                          <tr>
                            <th className="p-5">Title</th>
                            <th className="p-5">Customer</th>
                            <th className="p-5">Date</th>
                            <th className="p-5">Status</th>
                            <th className="p-5">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-sekkot-gray/10">
                          {requests.map((request) => (
                            <tr key={request.id} className="hover:bg-sekkot-gray/5">
                              <td className="p-5 whitespace-nowrap">{request.title}</td>
                              <td className="p-5 whitespace-nowrap">{request.profiles?.name || request.profiles?.email}</td>
                              <td className="p-5 whitespace-nowrap">{new Date(request.created_at).toLocaleDateString()}</td>
                              <td className="p-5 whitespace-nowrap">
                                <Badge className={`${getStatusColor(request.status)} text-white`}>
                                  {getStatusDisplay(request.status)}
                                </Badge>
                              </td>
                              <td className="p-5 whitespace-nowrap">
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-sekkot-gray/30 text-sekkot-purple hover:bg-sekkot-purple/10"
                                    onClick={() => setSelectedRequest(request)}
                                  >
                                    View / Respond
                                  </Button>
                                  <div className="flex space-x-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-sekkot-gray/30 text-yellow-500 hover:bg-yellow-500/10 px-2"
                                      title="Mark as In Progress"
                                      onClick={() => handleUpdateRequestStatus(request.id, 'in_progress')}
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-sekkot-gray/30 text-green-500 hover:bg-green-500/10 px-2"
                                      title="Mark as Completed"
                                      onClick={() => handleUpdateRequestStatus(request.id, 'completed')}
                                    >
                                      <Check className="h-4 w-4" /><Check className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Product Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="glass-card p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1 block">Product Name</label>
                <Input 
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="bg-black border-sekkot-gray/30 focus:border-sekkot-purple"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1 block">Category</label>
                <select 
                  value={editingProduct.category_id}
                  onChange={(e) => setEditingProduct({...editingProduct, category_id: e.target.value})}
                  className="w-full rounded-md bg-black border-sekkot-gray/30 focus:border-sekkot-purple p-2 text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1 block">Price</label>
                <Input 
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                  className="bg-black border-sekkot-gray/30 focus:border-sekkot-purple"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1 block">Image URL</label>
                <Input 
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                  className="bg-black border-sekkot-gray/30 focus:border-sekkot-purple"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-300 mb-1 block">Description</label>
                <Textarea 
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="bg-black border-sekkot-gray/30 focus:border-sekkot-purple"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2 flex justify-end space-x-3 mt-4">
                <Button 
                  variant="outline"
                  onClick={() => setEditingProduct(null)}
                  className="border-sekkot-gray/30 text-white"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdateProduct}
                  className="bg-sekkot-purple hover:bg-sekkot-purple-dark"
                >
                  Update Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request View/Response Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="glass-card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">{selectedRequest.title}</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Customer</h3>
                <p className="text-white">{selectedRequest.profiles?.name || selectedRequest.profiles?.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Date Submitted</h3>
                <p className="text-white">{new Date(selectedRequest.created_at).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Status</h3>
                <Badge className={`${getStatusColor(selectedRequest.status)} text-white mt-1`}>
                  {getStatusDisplay(selectedRequest.status)}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Description</h3>
                <p className="text-white mt-1">{selectedRequest.description}</p>
              </div>
              
              {selectedRequest.document_url && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Attached Document</h3>
                  <a 
                    href={selectedRequest.document_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sekkot-purple hover:underline flex items-center mt-1"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Document
                  </a>
                </div>
              )}
              
              {selectedRequest.admin_response && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Your Response</h3>
                  <div className="bg-black p-3 rounded-md mt-1 text-white">
                    {selectedRequest.admin_response}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-400">Respond to Request</h3>
                <Textarea 
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  className="bg-black border-sekkot-gray/30 focus:border-sekkot-purple mt-1"
                  rows={5}
                  placeholder="Write your response here..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedRequest(null);
                  setAdminResponse('');
                }}
                className="border-sekkot-gray/30 text-white"
              >
                Close
              </Button>
              <Button 
                onClick={handleRespondToRequest}
                className="bg-sekkot-purple hover:bg-sekkot-purple-dark"
                disabled={!adminResponse.trim()}
              >
                Send Response
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
