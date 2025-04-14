import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Filter, PackagePlus, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category_id: string;
  categories?: Category;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('products')
        .select('*, categories(name)');

      if (activeCategory) {
        query = query.eq('category_id', activeCategory);
      }

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      setProducts(data || []);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*');

    if (error) {
      console.error('Error fetching categories:', error);
      return;
    }

    setCategories(data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink to="/">Home</BreadcrumbLink>
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
              Explore our wide range of high-quality products designed to meet your engineering needs.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center glass-card px-4 py-2 rounded-full mb-4 md:mb-0">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <Input
                type="search"
                placeholder="Search products..."
                className="bg-transparent border-none focus:ring-0 text-sm text-gray-300 placeholder-gray-400"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <Button variant="outline" className="border-sekkot-purple text-sekkot-purple hover:bg-sekkot-purple hover:text-white">
              <Filter className="h-4 w-4 mr-2" />
              Filter Products
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 justify-center">
              <TabsTrigger value="all" onClick={() => handleCategoryChange(null)}>All Products</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} onClick={() => handleCategoryChange(category.id)}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="text-center col-span-full">
                  Loading products...
                </div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TabsContent key={product.id} value={activeCategory || 'all'} className="mt-0">
                    <div className="glass-card p-6 hover-scale">
                      <img src={product.image} alt={product.name} className="rounded-md mb-4 h-48 w-full object-cover" />
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-400 mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge className="bg-sekkot-purple text-white">{product.price}</Badge>
                        </div>
                        <Link to={`/product/${product.id}`}>
                          <Button size="sm" className="bg-sekkot-purple hover:bg-sekkot-purple-dark">
                            View Details <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </TabsContent>
                ))
              ) : (
                <div className="text-center col-span-full">
                  No products found in this category.
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
