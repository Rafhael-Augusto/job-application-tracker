"use client";

import { useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  createJobApplication,
  getJobApplication,
  updateJobApplication,
} from "@/lib/actions/jobApplications";

import { FormData, formSchema } from "./schema";

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
  jobApplicationId?: string;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

export function JobDialogForm({
  createJobData,
  jobApplicationId,
  isOpen,
  setIsOpen,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setError("");

    try {
      let result = null;

      if (jobApplicationId) {
        result = await updateJobApplication(jobApplicationId, {
          ...data,
          tags: data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0),
        });

        reset({
          ...data,
        });
      } else {
        result = await createJobApplication({
          ...data,
          columnId: createJobData.columnId,
          boardId: createJobData.boardId,
          tags: data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0),
        });
      }

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
    setIsOpen(!isOpen);
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    async function loadData() {
      if (!jobApplicationId) return;

      const result = await getJobApplication(jobApplicationId);

      if ("error" in result) {
        setError(result.error);
        return;
      }

      if (result) {
        reset({
          company: result.company,
          position: result.position,
          location: result.location ?? undefined,
          salary: result.salary ?? undefined,
          jobUrl: result.jobUrl ?? undefined,
          tags: result.tags.join(",") ?? undefined,
          description: result.description ?? undefined,
          notes: result.notes ?? undefined,
        });
      }
    }

    loadData();
  }, [jobApplicationId, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="bg-primary  pb-0 text-secondary border-0">
        <DialogHeader>
          <DialogTitle>
            {jobApplicationId ? "Editar Candidatura" : "Adicionar Candidatura"}
          </DialogTitle>
          <DialogDescription>
            {jobApplicationId
              ? "Editar candidatura de emprego existente"
              : "Registrar uma nova candidatura de emprego"}
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
                {isLoading ? (
                  <Spinner />
                ) : jobApplicationId ? (
                  "Editar Candidatura"
                ) : (
                  "Adicionar Candidatura"
                )}
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
