
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

type Product = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  price: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (error) throw error;
        if (data) setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            category:category_id (
              id,
              name,
              slug
            )
          `)
          .order('name');
        
        if (error) throw error;
        if (data) setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    // Filter by category
    const categoryFilter = activeCategory === 'all' || product.category?.slug === activeCategory;
    
    // Filter by search query
    const searchFilter = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryFilter && searchFilter;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const placeholderImage = "https://via.placeholder.com/300x300?text=Product+Image";

  return (
    <div className="min-h-screen bg-sekkot-dark text-white">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Products</h1>
            <div className="w-20 h-1 bg-sekkot-purple mx-auto"></div>
            <p className="text-gray-300 mt-6 max-w-3xl mx-auto">
              Browse our comprehensive range of precision-engineered products designed to meet the highest industry standards.
            </p>
          </div>
          
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8 bg-sekkot-darker border-sekkot-purple text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="hidden md:flex">
              <Button variant="outline" className="border-sekkot-purple text-white">
                <Filter className="mr-2 h-4 w-4" /> Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Tabs 
            defaultValue="all" 
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <div className="overflow-x-auto pb-4">
              <TabsList className="bg-sekkot-darker h-auto p-1 inline-flex whitespace-nowrap min-w-full justify-start">
                <TabsTrigger 
                  value="all"
                  className="px-4 py-2 h-auto data-[state=active]:bg-sekkot-purple data-[state=active]:text-white"
                >
                  All Products
                </TabsTrigger>
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.slug}
                    className="px-4 py-2 h-auto data-[state=active]:bg-sekkot-purple data-[state=active]:text-white"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value="all" className="p-0">
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-sekkot-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-300">Loading products...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <Card 
                      key={product.id} 
                      className="glass-card overflow-hidden hover-scale cursor-pointer border-0"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="aspect-square overflow-hidden bg-sekkot-darker">
                        <img 
                          src={product.image || placeholderImage} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                        {product.category && (
                          <p className="text-sm text-sekkot-purple">{product.category.name}</p>
                        )}
                        {product.description && (
                          <p className="text-gray-300 text-sm mt-2 line-clamp-2">{product.description}</p>
                        )}
                        {product.price && (
                          <p className="text-white font-semibold mt-3">{product.price}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-sekkot-darker rounded-lg">
                  <p className="text-gray-300 mb-4">No products found matching your criteria.</p>
                  <Button 
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="bg-sekkot-purple hover:bg-sekkot-purple-dark"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {categories.map(category => (
              <TabsContent key={category.id} value={category.slug} className="p-0">
                {/* Content is handled by the filtered products in the "all" tab */}
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">Need a Custom Solution?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? We specialize in custom manufacturing solutions tailored to your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact">
                <Button className="bg-sekkot-purple hover:bg-sekkot-purple-dark w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
              <Link to="/request-form">
                <Button variant="outline" className="border-sekkot-purple text-sekkot-purple hover:bg-sekkot-purple hover:text-white w-full sm:w-auto">
                  Request Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-sekkot-darker rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-sekkot-purple"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="bg-sekkot-dark rounded-lg overflow-hidden">
                <img 
                  src={selectedProduct.image || placeholderImage} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                {selectedProduct.category && (
                  <p className="text-sekkot-purple mb-4">{selectedProduct.category.name}</p>
                )}
                
                {selectedProduct.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-300">{selectedProduct.description}</p>
                  </div>
                )}
                
                {selectedProduct.price && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Price</h3>
                    <p className="text-xl font-bold text-white">{selectedProduct.price}</p>
                  </div>
                )}
                
                <div className="space-y-4 mt-8">
                  <Link to="/request-form">
                    <Button className="w-full bg-sekkot-purple hover:bg-sekkot-purple-dark">
                      Request Quote
                    </Button>
                  </Link>
                  
                  <Link to="/contact">
                    <Button variant="outline" className="w-full border-sekkot-purple text-sekkot-purple hover:bg-sekkot-purple hover:text-white">
                      Ask a Question
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
