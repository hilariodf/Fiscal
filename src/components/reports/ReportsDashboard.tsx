import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  BarChart,
  PieChart,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const reports = [
  {
    title: "Relatório de Vendas",
    description: "Análise detalhada das vendas por período",
    icon: <BarChart className="w-6 h-6" />,
    color: "bg-blue-500",
  },
  {
    title: "Relatório de Clientes",
    description: "Distribuição e análise de clientes",
    icon: <PieChart className="w-6 h-6" />,
    color: "bg-green-500",
  },
  {
    title: "Relatório de Produtos",
    description: "Desempenho e estoque de produtos",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "bg-purple-500",
  },
  {
    title: "Relatório Fiscal",
    description: "Resumo de notas fiscais e impostos",
    icon: <FileText className="w-6 h-6" />,
    color: "bg-orange-500",
  },
];

const ReportsDashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reports.map((report, index) => (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div
                      className={`${report.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}
                    >
                      {report.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        {report.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:scale-105 transition-transform"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;
