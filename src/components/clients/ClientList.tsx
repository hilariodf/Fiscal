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
import { Plus, MoreVertical, Edit, Trash, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Client {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
}

const defaultClients: Client[] = [
  {
    id: "1",
    name: "Empresa ABC Ltda",
    document: "12.345.678/0001-90",
    email: "contato@empresaabc.com",
    phone: "(11) 3456-7890",
    status: "active",
  },
  {
    id: "2",
    name: "Tech Solutions SA",
    document: "98.765.432/0001-10",
    email: "contato@techsolutions.com",
    phone: "(11) 2345-6789",
    status: "active",
  },
  {
    id: "3",
    name: "Inovação Digital ME",
    document: "45.678.901/0001-23",
    email: "contato@inovacaodigital.com",
    phone: "(11) 4567-8901",
    status: "inactive",
  },
];

const ClientList = () => {
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <Button className="hover:scale-105 transition-transform">
            <Plus className="w-4 h-4 mr-2" />
            Novo Cliente
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
                    <TableHead>Nome</TableHead>
                    <TableHead>CNPJ/CPF</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {defaultClients.map((client) => (
                    <motion.tr
                      key={client.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onMouseEnter={() => setHoveredRow(client.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`${hoveredRow === client.id ? "bg-gray-50" : ""} transition-colors duration-200`}
                    >
                      <TableCell className="font-medium">
                        {client.name}
                      </TableCell>
                      <TableCell>{client.document}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            client.status === "active" ? "default" : "secondary"
                          }
                          className={
                            client.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {client.status === "active" ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
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
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
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

export default ClientList;
