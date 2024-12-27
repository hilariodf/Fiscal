import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DatePickerWithRange from "../ui/date-picker-with-range";
import { Button } from "../ui/button";
import { Search, X, Filter, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Badge } from "../ui/badge";

interface InvoiceSearchProps {
  onSearch?: (filters: SearchFilters) => void;
  onReset?: () => void;
  loading?: boolean;
}

interface SearchFilters {
  dateRange: { from: Date | undefined; to: Date | undefined };
  status: string;
  client: string;
  minAmount: string;
  maxAmount: string;
}

const defaultFilters: SearchFilters = {
  dateRange: { from: undefined, to: undefined },
  status: "",
  client: "",
  minAmount: "",
  maxAmount: "",
};

export default function InvoiceSearch({
  onSearch = () => {},
  onReset = () => {},
  loading = false,
}: InvoiceSearchProps) {
  const [filters, setFilters] = React.useState<SearchFilters>(defaultFilters);
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false);

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value && (typeof value === "string" ? value.length > 0 : true),
  ).length;

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    onReset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full p-6 bg-white hover:shadow-lg transition-all duration-200">
        <div className="space-y-6">
          {/* Basic Search */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
            <div className="flex-1 w-full space-y-2">
              <Label>Quick Search</Label>
              <div className="relative">
                <Input
                  placeholder="Search by invoice number, client, or amount..."
                  value={filters.client}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, client: e.target.value }))
                  }
                  className="pl-10"
                />
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="flex-1 md:flex-none"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-blue-100 text-blue-700"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
                <ChevronDown
                  className={`w-4 h-4 ml-2 transition-transform duration-200 ${isAdvancedOpen ? "rotate-180" : ""}`}
                />
              </Button>
              <Button
                onClick={handleSearch}
                className="flex-1 md:flex-none"
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Search className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="pt-4 border-t"
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <DatePickerWithRange
                      date={filters.dateRange}
                      onDateChange={(newDate) =>
                        setFilters((prev) => ({ ...prev, dateRange: newDate }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={filters.status}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Amount Range</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.minAmount}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            minAmount: e.target.value,
                          }))
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.maxAmount}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            maxAmount: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button variant="ghost" onClick={handleReset}>
                    <X className="w-4 h-4 mr-2" />
                    Reset Filters
                  </Button>
                </div>
              </motion.div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Card>
    </motion.div>
  );
}
