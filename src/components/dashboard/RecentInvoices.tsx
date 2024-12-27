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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, MoreVertical, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Invoice {
  id: string;
  number: string;
  client: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

interface RecentInvoicesProps {
  invoices?: Invoice[];
}

const defaultInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-001",
    client: "Acme Corp",
    date: "2024-01-15",
    amount: 1500.0,
    status: "paid",
  },
  {
    id: "2",
    number: "INV-002",
    client: "Globex Inc",
    date: "2024-01-14",
    amount: 2300.5,
    status: "pending",
  },
  {
    id: "3",
    number: "INV-003",
    client: "Tech Solutions",
    date: "2024-01-10",
    amount: 850.75,
    status: "overdue",
  },
];

const RecentInvoices = ({
  invoices = defaultInvoices,
}: RecentInvoicesProps) => {
  const navigate = useNavigate();
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-white hover:shadow-lg transition-all duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Invoices</h2>
          <Button
            onClick={() => navigate("/invoices/new")}
            className="hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {invoices.map((invoice) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onMouseEnter={() => setHoveredRow(invoice.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`${hoveredRow === invoice.id ? "bg-gray-50" : ""} transition-colors duration-200`}
                  >
                    <TableCell className="font-medium">
                      {invoice.number}
                    </TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell>
                      {new Date(invoice.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(invoice.amount)}
                    </TableCell>
                    <TableCell>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status.charAt(0).toUpperCase() +
                            invoice.status.slice(1)}
                        </Badge>
                      </motion.div>
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
                          <DropdownMenuItem
                            onClick={() => navigate(`/invoices/${invoice.id}`)}
                            className="cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </Card>
    </motion.div>
  );
};

export default RecentInvoices;
