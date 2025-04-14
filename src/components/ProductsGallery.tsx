
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, X, ZoomIn } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category_id: string;
  image: string;
  description: string;
  price?: string;
  category?: {
    slug: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

const ProductsGallery = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const fetchProductsAndCategories = async () => {
    try {
      setLoading(true);
      
      // Fetch categories first
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*');
      
      if (categoriesError) throw categoriesError;
      
      // Then fetch products with their categories
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          category:category_id(name, slug)
        `);
      
      if (productsError) throw productsError;
      
      setCategories(categoriesData || []);
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error loading products",
        description: "Failed to load product data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  // If no products are available in the database, use these fallbacks
  const fallbackProducts: Product[] = products.length > 0 ? [] : [
    {
      id: "1",
      name: "High Tensile Bolts",
      category_id: "bolts",
      image: "/placeholder.svg",
      description: "Precision engineered high tensile bolts with superior thread quality and durability."
    },
    {
      id: "2",
      name: "Carbon Steel Shafts",
      category_id: "shafts",
      image: "/placeholder.svg",
      description: "Custom made carbon steel shafts with precise dimensions and smooth finish."
    },
    {
      id: "3",
      name: "CNC Machined Parts",
      category_id: "machined",
      image: "/placeholder.svg",
      description: "Complex components machined with CNC precision for tight tolerances."
    },
    {
      id: "4",
      name: "Forged Steel Components",
      category_id: "forged",
      image: "/placeholder.svg",
      description: "Advanced coal forged components with superior strength and integrity."
    },
    {
      id: "5",
      name: "Threaded Fasteners",
      category_id: "bolts",
      image: "/placeholder.svg",
      description: "Custom thread rolled fasteners for industrial applications."
    },
    {
      id: "6",
      name: "Machined Couplings",
      category_id: "machined",
      image: "/placeholder.svg",
      description: "Precision machined couplings with perfect fit and finish."
    },
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  // Get all available category slugs from products
  const availableCategorySlugs = Array.from(
    new Set(displayProducts.map(product => 
      product.category?.slug || product.category_id
    ))
  );

  return (
    <section className="py-20 bg-sekkot-darker">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Products</h2>
          <div className="w-20 h-1 bg-sekkot-purple mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            Browse through our extensive range of precision engineered products built for quality and performance.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-10 w-10 text-sekkot-purple animate-spin" />
            <span className="ml-3 text-gray-300">Loading products...</span>
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-sekkot-dark">
                <TabsTrigger value="all">All Products</TabsTrigger>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.slug}>
                      {category.name}
                    </TabsTrigger>
                  ))
                ) : (
                  <>
                    <TabsTrigger value="bolts">Bolts</TabsTrigger>
                    <TabsTrigger value="shafts">Shafts</TabsTrigger>
                    <TabsTrigger value="forged">Forged Parts</TabsTrigger>
                    <TabsTrigger value="machined">Machined Components</TabsTrigger>
                  </>
                )}
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {displayProducts.map((product, index) => (
                    <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                      <ProductCard 
                        product={product}
                        onClick={() => handleProductClick(product)}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:flex justify-end gap-2 mt-4">
                  <CarouselPrevious className="static transform-none m-0 bg-sekkot-dark border-sekkot-purple text-sekkot-purple-light hover:bg-sekkot-purple hover:text-white" />
                  <CarouselNext className="static transform-none m-0 bg-sekkot-dark border-sekkot-purple text-sekkot-purple-light hover:bg-sekkot-purple hover:text-white" />
                </div>
              </Carousel>
            </TabsContent>

            {/* Category tabs */}
            {availableCategorySlugs.map((categorySlug) => (
              <TabsContent key={categorySlug} value={categorySlug} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayProducts
                    .filter((product) => 
                      (product.category?.slug || product.category_id) === categorySlug
                    )
                    .map((product) => (
                      <ProductCard 
                        key={product.id}
                        product={product}
                        onClick={() => handleProductClick(product)}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="glass-card w-full max-w-3xl p-0 overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img 
                src={selectedProduct.image || "/placeholder.svg"} 
                alt={selectedProduct.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(selectedProduct.image || "/placeholder.svg", "_blank");
                  }}
                  className="bg-sekkot-dark/80 p-2 rounded-full text-white hover:bg-sekkot-purple transition-colors"
                  title="View full image"
                >
                  <ZoomIn size={18} />
                </button>
                <button 
                  onClick={closeModal}
                  className="bg-sekkot-dark/80 p-2 rounded-full text-white hover:bg-sekkot-purple transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedProduct.name}</h3>
              <p className="text-gray-300 mb-6">{selectedProduct.description}</p>
              {selectedProduct.price && (
                <p className="text-sekkot-purple-light mb-4">Price: {selectedProduct.price}</p>
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm bg-sekkot-purple/20 text-sekkot-purple-light px-3 py-1 rounded-full">
                  Category: {selectedProduct.category?.name || 
                    (selectedProduct.category_id.charAt(0).toUpperCase() + selectedProduct.category_id.slice(1))}
                </span>
                <Button 
                  className="bg-sekkot-purple hover:bg-sekkot-purple-dark"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = "/request-form";
                  }}
                >
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden bg-sekkot-dark border-sekkot-gray/20 hover-scale h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image || "/placeholder.svg"} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        <Button 
          variant="outline" 
          className="w-full border-sekkot-purple text-sekkot-purple hover:bg-sekkot-purple hover:text-white mt-auto"
          onClick={onClick}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductsGallery;
