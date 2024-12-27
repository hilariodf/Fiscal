import React from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

const defaultProducts: Product[] = [
  {
    id: "1",
    code: "P001",
    name: "Laptop Dell XPS 13",
    price: 6999.99,
    stock: 15,
    category: "Eletrônicos",
  },
  {
    id: "2",
    code: "P002",
    name: 'Monitor LG 27"',
    price: 1299.99,
    stock: 23,
    category: "Periféricos",
  },
  {
    id: "3",
    code: "P003",
    name: "Mouse Logitech MX",
    price: 399.99,
    stock: 45,
    category: "Periféricos",
  },
];

const ProductList = () => {
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <Button className="hover:scale-105 transition-transform">
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 bg-white hover:shadow-lg transition-all duration-200">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {defaultProducts.map((product) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onMouseEnter={() => setHoveredRow(product.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`${hoveredRow === product.id ? "bg-gray-50" : ""} transition-colors duration-200`}
                    >
                      <TableCell className="font-medium">
                        {product.code}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        {product.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:scale-110 transition-transform"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductList;
