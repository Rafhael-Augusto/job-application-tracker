"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createJobApplication } from "@/lib/actions/jobApplications";

import { FormData, formSchema } from "./schema";

import { PlusIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

type Props = {
  createJobData: {
    columnId: string;
    boardId: string;
  };
};

export function CreateJobDialog({ createJobData }: Props) {
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setError("");

    try {
      const result = await createJobApplication({
        ...data,
        columnId: createJobData.columnId,
        boardId: createJobData.boardId,
        tags: data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });

      if (result.error) {
        setError(result.error);
      } else {
        handleDialogClose();
      }
    } catch (err: any) {
      setError(err);
    } finally {
      handleDialogClose();
    }
  }

  const handleDialogClose = () => {
    setIsLoading(false);
    setOpen(!open);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button className="bg-primary/45 mt-8">
          <PlusIcon />
          Adicionar Vaga
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-primary  pb-0 text-secondary border-0">
        <DialogHeader>
          <DialogTitle>Adicionar Candidatura</DialogTitle>
          <DialogDescription>
            Registrar uma nova candidatura de emprego
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="overflow-y-scroll p-4 h-140">
            <FieldGroup className="grid grid-cols-2">
              <Field>
                <FieldLabel htmlFor="company">Empresa *</FieldLabel>
                <Input
                  {...register("company")}
                  id="company"
                  placeholder="Empresa"
                />

                {errors.company && (
                  <FieldError>{errors.company.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="position">Cargo *</FieldLabel>
                <Input
                  {...register("position")}
                  id="position"
                  placeholder="Cargo"
                />

                {errors.position && (
                  <FieldError>{errors.position.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-2">
              <Field>
                <FieldLabel htmlFor="location">Localização</FieldLabel>
                <Input
                  {...register("location")}
                  id="location"
                  placeholder="Localização"
                />

                {errors.location && (
                  <FieldError>{errors.location.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="salary">Salário</FieldLabel>
                <Input
                  {...register("salary")}
                  id="salary"
                  placeholder="Salário"
                />

                {errors.salary && (
                  <FieldError>{errors.salary.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="job-url">Link da Vaga</FieldLabel>
                <Input
                  {...register("jobUrl")}
                  id="job-url"
                  placeholder="https://..."
                />

                {errors.jobUrl && (
                  <FieldError>{errors.jobUrl.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="tags">
                  Tags (separadas por vírgula)
                </FieldLabel>
                <Input
                  {...register("tags")}
                  id="tags"
                  placeholder="React, Tailwind, Prisma"
                />

                {errors.tags && <FieldError>{errors.tags.message}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Descrição</FieldLabel>
                <Textarea
                  {...register("description")}
                  id="description"
                  placeholder="Descrição breve do cargo"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="notes">Notas</FieldLabel>
                <Textarea {...register("notes")} id="notes" />
              </Field>
            </FieldGroup>

            <Field>
              <Button type="submit" variant={"secondary"} disabled={isLoading}>
                {isLoading ? <Spinner /> : "Adicionar Candidatura"}
              </Button>
              <Button
                type="button"
                variant={"default"}
                className="bg-secondary/5"
                onClick={() => handleDialogClose()}
              >
                Cancelar
              </Button>
            </Field>

            {error && <FieldError>{error}</FieldError>}
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
