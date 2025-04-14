
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Upload, Calendar, FileText, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const RequestForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    deadline: '',
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to submit a request.",
          variant: "destructive"
        });
        return;
      }

      // Upload files if any
      let documentUrl = null;
      if (files.length > 0) {
        // Only upload the first file for simplicity
        const file = files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('request-documents')
          .upload(filePath, file);
          
        if (uploadError) {
          throw new Error(uploadError.message);
        }
        
        const { data } = supabase.storage
          .from('request-documents')
          .getPublicUrl(filePath);
          
        documentUrl = data.publicUrl;
      }
      
      // Submit the request to Supabase
      const { error } = await supabase
        .from('requests')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          quantity: parseInt(formData.quantity) || 0,
          deadline: formData.deadline,
          document_url: documentUrl,
          status: 'pending'
        });
        
      if (error) throw error;
      
      toast({
        title: "Request Submitted",
        description: "Your request has been submitted successfully. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        quantity: '',
        deadline: '',
      });
      setFiles([]);
      
      // Navigate to dashboard
      navigate('/dashboard');
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Submit Your Custom Requirement</h1>
            <p className="text-gray-400 mt-2">Tell us what you need and we'll create a tailored solution</p>
          </div>
          
          <div className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-gray-200">Request Title</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Custom Shaft for Industrial Motor"
                    className="pl-10 bg-black border-sekkot-gray/30 focus:border-sekkot-purple"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-200">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your requirements in detail..."
                  className="min-h-32 bg-black border-sekkot-gray/30 focus:border-sekkot-purple"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-200">Quantity</label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      placeholder="Required quantity"
                      className="pl-10 bg-black border-sekkot-gray/30 focus:border-sekkot-purple"
                      min="1"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="deadline" className="text-sm font-medium text-gray-200">Required By</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      className="pl-10 bg-black border-sekkot-gray/30 focus:border-sekkot-purple"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Reference Images</label>
                <div className="border-2 border-dashed border-sekkot-gray/30 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400 mb-2">
                    Drag and drop files here or click to browse
                  </p>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="border-sekkot-purple text-sekkot-purple hover:bg-sekkot-purple hover:text-white"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Select Files
                  </Button>
                </div>
              </div>
              
              {files.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Selected Files</label>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div 
                        key={index}
                        className="bg-black border border-sekkot-gray/30 rounded-md p-3 flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-sekkot-purple mr-2" />
                          <span className="text-sm text-gray-300 truncate max-w-xs">{file.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                          onClick={() => removeFile(index)}
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-sekkot-purple hover:bg-sekkot-purple-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RequestForm;
