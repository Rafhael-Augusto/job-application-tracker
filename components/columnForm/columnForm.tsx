"use client";

import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formSchema, FormData } from "./schema";

import { iconsList, iconsMap } from "@/lib/mapping/icons";
import { cn } from "@/lib/utils";

import { PlusIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
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
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { colorsList, colorsMap } from "@/lib/mapping/colors";

export function BoardForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleDialogClose = () => {
    setIsLoading(false);
    setIsOpen(!isOpen);
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      icon: "Agenda",
      color: "Ciano",
    },
  });

  async function onSubmit() {
    setError("");
  }

  const iconNameInput = watch("icon");
  const colorNameInput = watch("color");

  const getIcons = useMemo(() => {
    const icons = !iconNameInput
      ? iconsList
      : iconsList.filter((icon) =>
          icon.name.toLowerCase().includes(iconNameInput.toLowerCase()),
        );

    return icons;
  }, [iconNameInput]);

  const getColors = useMemo(() => {
    const colors = !colorNameInput
      ? colorsList
      : colorsList.filter((color) =>
          color.name.toLowerCase().includes(colorNameInput.toLowerCase()),
        );

    return colors;
  }, [colorNameInput]);

  console.log(getColors);

  const GetCurrentIcon = iconsMap[iconNameInput];
  const getCurrentColor = colorsMap[colorNameInput];

  return (
    <div>
      <div className="bg-secondary rounded-lg">
        <Button className="bg-primary/95" onClick={() => setIsOpen(true)}>
          <PlusIcon />
          Nova Coluna
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={handleDialogClose} modal={false}>
        <div
          className={cn(
            "backdrop-blur-xs bg-black/50 h-screen w-screen top-0 left-0 z-0",
            isOpen ? "fixed" : "hidden",
          )}
        />

        <DialogContent className="bg-primary text-secondary border-0">
          <DialogHeader>
            <DialogTitle>Criar Coluna</DialogTitle>
            <DialogDescription>Criar uma nova Coluna</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="label">Nome *</FieldLabel>
                  <Input {...register("label")} id="label" placeholder="Nome" />

                  {errors.label && (
                    <FieldError>{errors.label.message}</FieldError>
                  )}
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="icon">Icone</FieldLabel>
                  <Combobox items={getIcons.map((item) => item.name)}>
                    <div className="flex gap-2 items-center bg-secondary/5 px-2 rounded-xl">
                      <div className="flex items-center gap-2">
                        {GetCurrentIcon && <GetCurrentIcon />}
                      </div>

                      <ComboboxInput
                        {...register("icon")}
                        value={iconNameInput}
                        id="icon"
                        placeholder="Icone"
                        className="border-0 w-full"
                      />
                    </div>
                    {errors.icon && (
                      <FieldError>{errors.icon.message}</FieldError>
                    )}

                    <ComboboxContent className="bg-primary text-secondary">
                      <ComboboxEmpty>Icone nao encontrado</ComboboxEmpty>
                      <ComboboxList className="flex flex-wrap gap-4">
                        {getIcons.map((item) => (
                          <div
                            key={item.name}
                            onClick={() =>
                              setValue("icon", item.name as FormData["icon"])
                            }
                            className="w-full flex-1 flex justify-center"
                          >
                            <Tooltip>
                              <TooltipTrigger>
                                <ComboboxItem
                                  key={item.name}
                                  value={item.name}
                                  className="p-3"
                                >
                                  <item.component />
                                </ComboboxItem>
                              </TooltipTrigger>
                              <TooltipContent>{item.name}</TooltipContent>
                            </Tooltip>
                          </div>
                        ))}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>

                <Field>
                  <FieldLabel htmlFor="color">Cor</FieldLabel>
                  <Combobox items={getColors.map((item) => item.name)}>
                    <div className="flex gap-2 items-center bg-secondary/5 px-2 rounded-xl">
                      <div className="flex items-center gap-2">
                        {getCurrentColor && (
                          <div
                            className={cn(
                              "h-6 w-6 rounded-sm",
                              getCurrentColor,
                            )}
                          />
                        )}
                      </div>

                      <ComboboxInput
                        {...register("color")}
                        value={colorNameInput}
                        id="color"
                        placeholder="Cor"
                        className="border-0 w-full"
                      />
                    </div>
                    {errors.color && (
                      <FieldError>{errors.color.message}</FieldError>
                    )}

                    <ComboboxContent className="bg-primary text-secondary">
                      <ComboboxEmpty>Cor nao encontrada</ComboboxEmpty>
                      <ComboboxList className="flex flex-wrap gap-4">
                        {getColors.map((item) => (
                          <div
                            key={item.name}
                            onClick={() =>
                              setValue("color", item.name as FormData["color"])
                            }
                            className="w-full flex-1 flex justify-center"
                          >
                            <Tooltip>
                              <TooltipTrigger>
                                <ComboboxItem
                                  key={item.name}
                                  value={item.name}
                                  className="p-3"
                                >
                                  <div
                                    className={cn(
                                      "h-4 w-4 rounded-xs",
                                      item.color,
                                    )}
                                  />
                                </ComboboxItem>
                              </TooltipTrigger>
                              <TooltipContent>{item.name}</TooltipContent>
                            </Tooltip>
                          </div>
                        ))}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>
              </FieldGroup>

              <Field>
                <Button
                  type="submit"
                  variant={"secondary"}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : "Criar Coluna"}
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
    </div>
  );
}
