import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { AlertCircle, Save, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  clientName: z
    .string()
    .min(3, "Nome do cliente deve ter no mínimo 3 caracteres"),
  cnpj: z
    .string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, "CNPJ inválido"),
  invoiceNumber: z.string().min(1, "Número da nota é obrigatório"),
  invoiceType: z.string(),
  amount: z.string().min(1, "Valor é obrigatório"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  issueDate: z.string().min(1, "Data de emissão é obrigatória"),
  dueDate: z.string().min(1, "Data de vencimento é obrigatória"),
});

type FormData = z.infer<typeof formSchema>;

interface InvoiceFormProps {
  onSubmit?: (data: FormData) => void;
  initialData?: Partial<FormData>;
  isLoading?: boolean;
  error?: string;
}

const steps = [
  { title: "Dados do Cliente", fields: ["clientName", "cnpj"] },
  {
    title: "Dados da Nota",
    fields: ["invoiceNumber", "invoiceType", "amount"],
  },
  { title: "Detalhes", fields: ["description", "issueDate", "dueDate"] },
];

const InvoiceForm = ({
  onSubmit = () => {},
  initialData = {},
  isLoading = false,
  error = "",
}: InvoiceFormProps) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const progress = ((currentStep + 1) / steps.length) * 100;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const currentFields = steps[currentStep].fields;
  const hasErrors = currentFields.some(
    (field) => form.formState.errors[field as keyof FormData],
  );

  const handleNext = async () => {
    const isValid = await form.trigger(currentFields as (keyof FormData)[]);
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Card className="w-full max-w-2xl p-6 mx-auto bg-white">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {steps[currentStep].title}
          </h2>
          <Progress value={progress} className="h-2" />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Nome do Cliente</Label>
                    <Input
                      {...form.register("clientName")}
                      placeholder="Digite o nome do cliente"
                      className={
                        form.formState.errors.clientName ? "border-red-500" : ""
                      }
                    />
                    {form.formState.errors.clientName && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.clientName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      {...form.register("cnpj")}
                      placeholder="00.000.000/0000-00"
                      className={
                        form.formState.errors.cnpj ? "border-red-500" : ""
                      }
                    />
                    {form.formState.errors.cnpj && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.cnpj.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoiceNumber">Número da NF</Label>
                      <Input
                        {...form.register("invoiceNumber")}
                        placeholder="000000"
                        className={
                          form.formState.errors.invoiceNumber
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {form.formState.errors.invoiceNumber && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.invoiceNumber.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="invoiceType">Tipo de Nota</Label>
                      <Select
                        onValueChange={(value) =>
                          form.setValue("invoiceType", value)
                        }
                        defaultValue={form.getValues("invoiceType")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nfe">NF-e</SelectItem>
                          <SelectItem value="nfse">NFS-e</SelectItem>
                          <SelectItem value="nfce">NFC-e</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Valor Total</Label>
                      <Input
                        {...form.register("amount")}
                        type="number"
                        placeholder="0,00"
                        className={
                          form.formState.errors.amount ? "border-red-500" : ""
                        }
                      />
                      {form.formState.errors.amount && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.amount.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      {...form.register("description")}
                      placeholder="Descreva os itens ou serviços"
                      rows={4}
                      className={
                        form.formState.errors.description
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {form.formState.errors.description && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="issueDate">Data de Emissão</Label>
                      <Input
                        {...form.register("issueDate")}
                        type="date"
                        className={
                          form.formState.errors.issueDate
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {form.formState.errors.issueDate && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.issueDate.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Data de Vencimento</Label>
                      <Input
                        {...form.register("dueDate")}
                        type="date"
                        className={
                          form.formState.errors.dueDate ? "border-red-500" : ""
                        }
                      />
                      {form.formState.errors.dueDate && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.dueDate.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button type="submit" disabled={isLoading || hasErrors}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Salvando..." : "Salvar Nota Fiscal"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                disabled={hasErrors}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </Card>
  );
};

export default InvoiceForm;
