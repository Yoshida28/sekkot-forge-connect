
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
}

const ProductsGallery = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: "1",
      name: "High Tensile Bolts",
      category: "bolts",
      image: "/placeholder.svg",
      description: "Precision engineered high tensile bolts with superior thread quality and durability."
    },
    {
      id: "2",
      name: "Carbon Steel Shafts",
      category: "shafts",
      image: "/placeholder.svg",
      description: "Custom made carbon steel shafts with precise dimensions and smooth finish."
    },
    {
      id: "3",
      name: "CNC Machined Parts",
      category: "machined",
      image: "/placeholder.svg",
      description: "Complex components machined with CNC precision for tight tolerances."
    },
    {
      id: "4",
      name: "Forged Steel Components",
      category: "forged",
      image: "/placeholder.svg",
      description: "Advanced coal forged components with superior strength and integrity."
    },
    {
      id: "5",
      name: "Threaded Fasteners",
      category: "bolts",
      image: "/placeholder.svg",
      description: "Custom thread rolled fasteners for industrial applications."
    },
    {
      id: "6",
      name: "Machined Couplings",
      category: "machined",
      image: "/placeholder.svg",
      description: "Precision machined couplings with perfect fit and finish."
    },
  ];

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

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

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-sekkot-dark">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="bolts">Bolts</TabsTrigger>
              <TabsTrigger value="shafts">Shafts</TabsTrigger>
              <TabsTrigger value="forged">Forged Parts</TabsTrigger>
              <TabsTrigger value="machined">Machined Components</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </TabsContent>

          {["bolts", "shafts", "forged", "machined"].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((product) => product.category === category)
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
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="glass-card w-full max-w-3xl p-0 overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 bg-sekkot-dark/80 p-2 rounded-full text-white hover:bg-sekkot-purple transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedProduct.name}</h3>
              <p className="text-gray-300 mb-6">{selectedProduct.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm bg-sekkot-purple/20 text-sekkot-purple-light px-3 py-1 rounded-full">
                  Category: {selectedProduct.category.charAt(0).toUpperCase() + selectedProduct.category.slice(1)}
                </span>
                <Button className="bg-sekkot-purple hover:bg-sekkot-purple-dark">Request Quote</Button>
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
    <Card className="overflow-hidden bg-sekkot-dark border-sekkot-gray/20 hover-scale">
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
        <Button 
          variant="outline" 
          className="w-full border-sekkot-purple text-sekkot-purple hover:bg-sekkot-purple hover:text-white"
          onClick={onClick}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductsGallery;
