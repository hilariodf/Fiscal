import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Download, FileText, Printer, ArrowLeft, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";

interface InvoiceDetailProps {
  invoiceNumber?: string;
  date?: string;
  status?: "pending" | "paid" | "overdue";
  client?: {
    name: string;
    document: string;
    address: string;
  };
  items?: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  total?: number;
  history?: Array<{
    date: string;
    status: string;
    description: string;
  }>;
}

const defaultHistory = [
  {
    date: "2024-01-20 14:30",
    status: "created",
    description: "Nota fiscal criada",
  },
  {
    date: "2024-01-20 14:35",
    status: "processing",
    description: "Processando na SEFAZ",
  },
  {
    date: "2024-01-20 14:40",
    status: "approved",
    description: "Aprovada pela SEFAZ",
  },
];

const InvoiceDetail = ({
  invoiceNumber = "NF-e 123456789",
  date = "2024-01-20",
  status = "pending",
  client = {
    name: "Empresa Exemplo Ltda",
    document: "12.345.678/0001-90",
    address: "Rua Exemplo, 123 - São Paulo, SP",
  },
  items = [
    {
      description: "Produto A",
      quantity: 2,
      unitPrice: 100.0,
      total: 200.0,
    },
    {
      description: "Serviço B",
      quantity: 1,
      unitPrice: 500.0,
      total: 500.0,
    },
  ],
  total = 700.0,
  history = defaultHistory,
}: InvoiceDetailProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="hover:scale-105 transition-transform"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold">Detalhes da Nota Fiscal</h1>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="hover:scale-105 transition-transform"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hover:scale-105 transition-transform"
            >
              <Download className="w-4 h-4 mr-2" />
              XML
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hover:scale-105 transition-transform"
            >
              <FileText className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Invoice Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-2"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Informações da Nota</CardTitle>
                <Badge className={getStatusColor(status)}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Número da Nota</p>
                  <p className="font-medium">{invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data de Emissão</p>
                  <p className="font-medium">{date}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {history.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative pl-4 pb-4"
                    >
                      {index !== history.length - 1 && (
                        <div className="absolute left-1.5 top-2 bottom-0 w-px bg-gray-200" />
                      )}
                      <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-blue-500" />
                      <p className="text-sm font-medium">{event.description}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Client Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Dados do Cliente</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nome/Razão Social</p>
                <p className="font-medium">{client.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">CNPJ/CPF</p>
                <p className="font-medium">{client.document}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Endereço</p>
                <p className="font-medium">{client.address}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Items Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Itens da Nota</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead className="text-right">Valor Unitário</TableHead>
                    <TableHead className="text-right">Valor Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.unitPrice.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.total.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                    </motion.tr>
                  ))}
                  <TableRow className="bg-gray-50 font-bold">
                    <TableCell colSpan={3} className="text-right">
                      Total
                    </TableCell>
                    <TableCell className="text-right">
                      {total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InvoiceDetail;
