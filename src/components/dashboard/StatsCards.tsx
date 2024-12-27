import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  FileTextIcon,
  DollarSignIcon,
} from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  stats: {
    totalIssued: number;
    totalReceived: number;
    monthlyRevenue: number;
    pendingInvoices: number;
  };
}

const StatsCards = ({
  stats = {
    totalIssued: 145,
    totalReceived: 89,
    monthlyRevenue: 45678.9,
    pendingInvoices: 12,
  },
}: StatsCardProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0 }}
      >
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issued</CardTitle>
            <motion.div whileHover={{ scale: 1.1 }}>
              <FileTextIcon className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold"
            >
              {stats.totalIssued}
            </motion.div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Received
            </CardTitle>
            <motion.div whileHover={{ scale: 1.1 }}>
              <FileTextIcon className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold"
            >
              {stats.totalReceived}
            </motion.div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <motion.div whileHover={{ scale: 1.1 }}>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold"
            >
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(stats.monthlyRevenue)}
            </motion.div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
              -4% from last month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Invoices
            </CardTitle>
            <motion.div whileHover={{ scale: 1.1 }}>
              <FileTextIcon className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold"
            >
              {stats.pendingInvoices}
            </motion.div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownIcon className="h-4 w-4 text-green-500 mr-1" />
              -2 from last week
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StatsCards;
